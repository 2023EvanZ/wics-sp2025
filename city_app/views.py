from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views import generic
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import BusinessSerializer
from .models import Business, Video
from rest_framework import status
import math, os, dotenv, requests
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.conf import settings

dotenv.load_dotenv()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)

        if user is None:
            raise AuthenticationFailed('Invalid credentials')

        tokens = get_tokens_for_user(user)
        return Response(tokens)

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'username': request.user.username})

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            print(refresh_token)

            if refresh_token:
                return Response({"message": "Logged out successfully"}, status=200)

            return Response({"message": "Logged out successfully"}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=400)
    
class RegisterView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)

class DisplayView(APIView):

    def distance(self, business):
        lat, long = business.get_location()
        user_lat = settings.LATITUDE
        user_long = settings.LONGITUDE
        return math.sqrt(pow(user_lat - lat, 2) + pow(user_long - long, 2))
    
    def get_latlng(self, address):
        address = address.replace(' ', '+')
        api_key = os.getenv("GOOGLE_EMBED_MAP_KEY")  # Store the API key
        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}"
        response = requests.get(url)
        #print(response.json())
        coords = response.json()['results'][0]['navigation_points'][0]['location']
        return coords['latitude'], coords['longitude']

    def get(self, request):
        businesses = Business.objects.all()
        ordered_businesses = sorted(businesses, key=self.distance)[:10]
        print("LAT:", settings.LATITUDE, "LONG:", settings.LONGITUDE)
        #print(businesses)
        #print(ordered_businesses)
        print([(i.latitude, i.longitude) for i in ordered_businesses])
        serializer = BusinessSerializer(ordered_businesses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        user_lat,user_long = self.get_latlng(request.data['location'])
        print("POST:",user_lat,user_long)

        settings.LATITUDE = user_lat
        settings.LONGITUDE = user_long
        # serializer = BusinessSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
        return Response(None, status=status.HTTP_201_CREATED)
        #return Response(None, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        try:
            business = Business.objects.all()[1]
            business.delete()
            return Response({"message": "Business deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Business.DoesNotExist:
            return Response({"error": "Business not found"}, status=status.HTTP_404_NOT_FOUND)
    
class DisplayTopView(APIView):
    def rating(self,business):
        user_likes,user_dislikes = business.likes,business.dislikes
        if not user_likes + user_dislikes:
            return 0
        return user_likes / (user_likes + user_dislikes)

    def get(self, request):
        businesses = Business.objects.all()
        ordered_businesses = sorted(businesses, key=self.rating)[:10][::-1]
        print(ordered_businesses)
        serializer = BusinessSerializer(ordered_businesses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BusinessSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BusinessDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, business_id):
        try:
            business = Business.objects.get(id=business_id)
            serializer = BusinessSerializer(business)

            data = serializer.data
            data["likes"] = business.likes
            data["dislikes"] = business.dislikes
            data["id"] = business.id
            return Response(data)
        except Business.DoesNotExist:
            return Response({"error": "Business not found"}, status=404)
        
# class BusinessVoteView(APIView):
#     permission_classes = [AllowAny]  # Allow requests without authentication

#     def post(self, request, business_id, vote_type):
#         try:
#             business = Business.objects.get(id=business_id)

#             # Update vote counts based on vote_type
#             if vote_type == 'like':
#                 business.likes += 1
#             elif vote_type == 'dislike':
#                 business.dislikes += 1
#             else:
#                 return Response({"error": "Invalid vote type"}, status=400)

#             business.save()
#             return Response({"likes": business.likes, "dislikes": business.dislikes}, status=200)
#         except Business.DoesNotExist:
#             return Response({"error": "Business not found"}, status=404)

class BusinessVoteView(APIView):
    permission_classes = [AllowAny]  # No authentication required

    def add_vote(self, business, vote_type, request):
        """ Adds a vote to the specified category and updates session. """
        if vote_type == "like":
            business.likes += 1
        elif vote_type == "dislike":
            business.dislikes += 1
        else:
            return Response({"error": "Invalid vote type"}, status=400)

        # Store vote in session
        # request.session[session_key] = vote_type
        # request.session.modified = True
        business.save()

    def subtract_vote(self, business, vote_type, request):
        """ Removes a previous vote if it exists and updates session. """
        # previous_vote = request.session.get(session_key)

        if vote_type == "like":
            print("Before:", business.likes)
            business.likes -= 1
            print("After:", business.likes)
        elif vote_type == "dislike":
            print("Before:", business.dislikes)
            business.dislikes -= 1
            print("After:", business.dislikes)
        else:
            return Response({"error": "No vote to remove"}, status=400)

        # Remove vote from session
        # if session_key in request.session:
        #     del request.session[session_key]
        #     request.session.modified = True

        business.save()

    def post(self, request, business_id, vote_type, action):
        """ Handles voting by calling add_vote or subtract_vote based on action. """
        try:
            print("POST CALLED", action)
            business = Business.objects.get(id=business_id)
            # session_key = f'business_{business_id}_vote'

            if action == "add":
                self.add_vote(business, vote_type, request)
            elif action == "subtract":
                print("SUBTRACT CALLED")
                self.subtract_vote(business, vote_type, request)
            else:
                return Response({"error": "Invalid action. Use 'add' or 'subtract'."}, status=400)

            return Response({"likes": business.likes, "dislikes": business.dislikes})

        except Business.DoesNotExist:
            return Response({"error": "Business not found"}, status=404)

class AddView(APIView):
    def post(self, request, *args, **kwargs):
        #print(request.data)
        lat, long = self.get_latlng(request.data['location'])
        video = Video.objects.create(file="videos/default.mp4")
        new_data = {
            'id':Business.objects.count() + 1,
            'name':request.data['name'],
            'likes': 0,
            'dislikes':0,
            'latitude':lat,
            'longitude':long,
            'description':request.data['description'],
            'contacts':request.data['contacts'],
            'location':request.data['location'],
            'hours':request.data['hours'],
            'video':video.id

        }
        print(new_data)
        serializer = BusinessSerializer(data=new_data)
        print(serializer.is_valid())
        if not serializer.is_valid():
            print(serializer.errors)
            video.delete()
        if serializer.is_valid():
            business = serializer.save()
            return Response({"message": "Business added successfully", "id": business.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_latlng(self, address):
        address = address.replace(' ', '+')
        api_key = os.getenv("GOOGLE_EMBED_MAP_KEY")  # Store the API key
        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}"
        response = requests.get(url)
        #print(response.json())
        coords = response.json()['results'][0]['navigation_points'][0]['location']
        return coords['latitude'], coords['longitude']