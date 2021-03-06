from django.urls.conf import include
from .views import RegisterAPI, showUsers, deleteModerator, switchModerator, deleteUser, oneEvent, deleteEvent, EventFilter, LoginAPI, UserAPI, oneStage, deleteStage, showEvents, createEvent, showStages, createStage, updateStage, updateEvent, showModerators, createModerator
from django.urls import path
from knox import views as knox_views
from .views import LoginAPI

urlpatterns = [
    path('auth',include('knox.urls')),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('user/', UserAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('showUsers/', showUsers.as_view(), name='showUsers'),
    path('showModerators/', showModerators.as_view(), name='showModerators'),
    path('createModerator/', createModerator.as_view(), name='createModerator'),
    path('deleteModerator/<int:pk>', deleteModerator.as_view(), name='deleteModerator'),
    path('deleteUser/<int:pk>', deleteUser.as_view(), name='deleteUser'),
    path('switchModerator/<int:pk>', switchModerator.as_view(), name='switchModerator'),
    path('showEvents/', showEvents, name='showEvents'),
    path('createEvent/', createEvent.as_view(), name='createEvent'),
    path('showStages/', showStages, name='showStages'),
    path('createStage/', createStage.as_view(), name='createStage'),
    path('oneEvent/<int:pk>', oneEvent.as_view(), name='oneEvent'),
    path('oneStage/<int:pk>', oneStage.as_view(), name='oneStage'),
    path('updateStage/<int:pk>', updateStage.as_view(), name='updateStage'),
    path('updateEvent/<int:pk>', updateEvent.as_view(), name='updateEvent'),
    path('deleteEvent/<int:pk>', deleteEvent.as_view(), name='deleteEvent'),
    path('deleteStage/<int:pk>', deleteStage.as_view(), name='deleteStage'),
    path('eventFilter/', EventFilter.as_view(), name='eventFilter'),
]
