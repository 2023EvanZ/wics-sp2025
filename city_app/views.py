from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

# Helper function to generate tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Register View
class RegisterView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)
        
        user = User.objects.create_user(username=username, password=password)
        return Response({'message': 'User created successfully'})

# Login View
class LoginView(APIView):
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)

        if user is None:
            raise AuthenticationFailed('Invalid credentials')

        tokens = get_tokens_for_user(user)
        return Response(tokens)

# Get Logged-in User View
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'username': request.user.username})

# Logout View
class LogoutView(APIView):
    def post(self, request):
        return Response({'message': 'Logged out successfully'})
    
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