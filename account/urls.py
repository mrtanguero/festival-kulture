from django.urls.conf import include
from .views import RegisterAPI, showUsers, moderatorRead, deleteModerator, switchModerator, deleteUser, eventRead, stageRead, oneEvent, deleteEvent, EventFilter, LoginAPI, UserAPI, oneStage, deleteStage
from django.urls import path
from knox import views as knox_views
from .views import LoginAPI

urlpatterns = [
    path('api/auth',include('knox.urls')),
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/user/', UserAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/showUsers/', showUsers, name='showUsers'),
    path('api/showModerators/', moderatorRead, name='showUsers'),
    path('api/deleteModerator/<int:pk>', deleteModerator, name='deleteModerator'),
    path('api/deleteUser/<int:pk>', deleteUser, name='deleteUser'),
    path('api/switchModerator/<int:pk>', switchModerator, name='switchModerator'),
    path('api/showEvents/', eventRead, name='showEvents'),
    path('api/showStages/', stageRead, name='showStages'),
    path('api/oneEvent/<int:pk>', oneEvent, name='oneEvent'),
    path('api/oneStage/<int:pk>', oneStage, name='oneStage'),
    path('api/deleteEvent/<int:pk>', deleteEvent, name='deleteEvent'),
    path('api/deleteStage/<int:pk>', deleteStage, name='deleteStage'),
    path('api/eventFilter/', EventFilter.as_view(), name='eventFilter'),
]
