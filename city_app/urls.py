from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, DisplayView, BusinessDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('display/', DisplayView.as_view(), name='business-list'),
    path('business/<int:business_id>/', BusinessDetailView.as_view(), name='business-detail'),
]