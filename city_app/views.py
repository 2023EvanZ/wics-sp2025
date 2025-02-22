from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse

def user_login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({"message": "Login successful"})
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

def user_logout(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"})