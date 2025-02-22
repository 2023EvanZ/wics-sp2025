from django.urls import path

from .views import user_login, user_logout

urlpatterns = [
    # path("", views.IndexView.as_view(), name="index"),
    path("login/", user_login, name="login"),
    path("logout/", user_logout, name="logout"),
]