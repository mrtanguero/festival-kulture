from .views import RegisterAPI, oneUser, showUsers, moderatorRead, deleteModerator, switchModerator
from django.urls import path
from knox import views as knox_views
from .views import LoginAPI

urlpatterns = [
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/showUsers/', showUsers, name='showUsers'),
    path('api/showModerators/', moderatorRead, name='showUsers'),
    path('api/oneUser/', oneUser, name='oneUser'),
    path('api/deleteModerator/<int:pk>', deleteModerator, name='deleteModerator'),
    path('api/switchModerator/<int:pk>', switchModerator, name='switchModerator'),
]
