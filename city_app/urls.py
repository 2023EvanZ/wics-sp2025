from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, DisplayView, DisplayTopView, BusinessDetailView, BusinessVoteView, AddView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('display/', DisplayView.as_view(), name='business-list'),
    path('top/',DisplayTopView.as_view(), name='top-list'),
    path('business/<int:business_id>/', BusinessDetailView.as_view(), name='business-detail'),
    path('business/<int:business_id>/vote/<str:vote_type>/<str:action>/', BusinessVoteView.as_view(), name='business-vote'),
    path('add/', AddView.as_view(), name='add'),
]