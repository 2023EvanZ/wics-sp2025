from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import BusinessSerializer
from .models import Business
from rest_framework import status
import math

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
    user_lat = 0
    user_long = 0
    def distance(self, business):
        lat, long = business.get_location()
        return math.sqrt(pow(self.user_lat - lat, 2) + pow(self.user_long - long, 2))

    def get(self, request):
        businesses = Business.objects.all()
        self.user_lat, self.user_long = 0, 0
        ordered_businesses = sorted(businesses, key=self.distance)[:10]
        print(businesses)
        print(ordered_businesses)
        serializer = BusinessSerializer(businesses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BusinessSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DisplayTopView(APIView):
    def get(self, request):
        businesses = Business.objects.all().order_by("-get_rating")[:10]
        print(businesses)
        serializer = BusinessSerializer(businesses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BusinessSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)