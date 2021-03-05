from django.urls.conf import include
from .views import RegisterAPI, showUsers, deleteModerator, switchModerator, deleteUser, oneEvent, deleteEvent, EventFilter, LoginAPI, UserAPI, oneStage, deleteStage, showEvents, createEvent, showStages, createStage, updateStage, updateEvent, showModerators, createModerator
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
    path('api/showUsers/', showUsers.as_view(), name='showUsers'),
    path('api/showModerators/', showModerators.as_view(), name='showModerators'),
    path('api/createModerator/', createModerator.as_view(), name='createModerator'),
    path('api/deleteModerator/<int:pk>', deleteModerator.as_view(), name='deleteModerator'),
    path('api/deleteUser/<int:pk>', deleteUser.as_view(), name='deleteUser'),
    path('api/switchModerator/<int:pk>', switchModerator.as_view(), name='switchModerator'),
    path('api/showEvents/', showEvents, name='showEvents'),
    path('api/createEvent/', createEvent.as_view(), name='createEvent'),
    path('api/showStages/', showStages, name='showStages'),
    path('api/createStage/', createStage.as_view(), name='createStage'),
    path('api/oneEvent/<int:pk>', oneEvent.as_view(), name='oneEvent'),
    path('api/oneStage/<int:pk>', oneStage.as_view(), name='oneStage'),
    path('api/updateStage/<int:pk>', updateStage.as_view(), name='updateStage'),
    path('api/updateEvent/<int:pk>', updateEvent.as_view(), name='updateEvent'),
    path('api/deleteEvent/<int:pk>', deleteEvent.as_view(), name='deleteEvent'),
    path('api/deleteStage/<int:pk>', deleteStage.as_view(), name='deleteStage'),
    path('api/eventFilter/', EventFilter.as_view(), name='eventFilter'),
]
