from django.contrib.auth.models import User
from django.http import request
from django.http.response import HttpResponse, JsonResponse
from rest_framework import generics, permissions, serializers
from rest_framework import views
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.views import APIView
from .serializers import UserSerializer, LoginSerializer, RegisterSerializer, ModeratorSerializer, StagesSerializer, EventsSerializer
from django.contrib.auth import login
from django.contrib.auth import get_user_model
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from .models import Moderator, Stage, Event
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required 
from django.utils.decorators import method_decorator 
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django.contrib import messages
from django.core.mail import send_mail
from login import settings

# Register API. Ovaj API nam ne treba nego mi olaksava posao kad testiram.
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


#Login API koji vraca token.
class LoginAPI(generics.GenericAPIView):
    serializer_class=LoginSerializer
   
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


#Da pokazemo logovani korisnik, treba da se salje token u header.
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


#API koji prikaze svi Users. Ovaj endpoint nam ne treba, nego mi olaksava posao kad testiram.
class showUsers(generics.GenericAPIView):
   
    def get(self,request):
        if request.method =='GET':
            user= User.objects.all()
            serializer= UserSerializer(user, many=True)
            return JsonResponse(serializer.data, safe=False)


#API koji nam prikaze svi Moderatori. Samo Superuser ima pristup.
class showModerators(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self,request):
        user=request.user
        if user.is_superuser ==True:
            moderator=Moderator.objects.all()
            serializar = ModeratorSerializer(moderator, many=True)
            return JsonResponse(serializar.data, safe=False)


#Api koji ce da kreira novi Moderator. Svi imaju pristup, ne mora biti logovan.
class createModerator(views.APIView):
    def post(self, request):
        data= JSONParser().parse(request)
        serializar=ModeratorSerializer(data=data)
        if serializar.is_valid():
            serializar.save() 
            subject = "Created Account"
            message = "Hello " + str(serializar['first_name'].value) + ". Cekajte dok Superuser vas pusti unutra!"
            from_email= settings.EMAIL_HOST_USER
            to_list = [str(serializar['email'].value)]
            send_mail(subject,message,from_email,to_list,fail_silently=True)
            return JsonResponse(serializar.data, status=201)
        return JsonResponse(serializar.errors, status=400)


#API koji brise Moderator. Samo superuser moze da pristupi ovaj API
class deleteModerator(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ] 
    def get(self,request,pk):
        user=request.user
        if user.is_superuser == True:
            moderator= Moderator.objects.get(id=pk)
            moderator.delete()
            return HttpResponse(status=200)


#API koji ce da brise User. Ovo nam treba kad neki korisnik hoce da brise svoj account.
#Mora biti logovan.
class deleteUser(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self,request,pk):
        user= User.objects.get(id=pk)
        subject = "Deleted Account"
        message = "Hello " +user.first_name +". Bas nam briga sto ides!"
        from_email= settings.EMAIL_HOST_USER
        to_list = [user.email]
        send_mail(subject,message,from_email,to_list,fail_silently=True)
        user.delete()
        return HttpResponse(status=200)


#Samo moderator ima pristup na ovaj API
#API koji ce od tabele Moderator prebacit korisnika u tabelu User.
class switchModerator(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    @csrf_exempt
    def get(self,request,pk):
        logovaniUser= request.user
        if logovaniUser.is_superuser == True: 
            moderator= Moderator.objects.get(id=pk)
            user = User.objects.create_user(moderator.username, moderator.email, moderator.password,first_name=moderator.first_name, last_name=moderator.last_name, is_staff=True)
            user.save()
            moderator.delete()
            subject = "Activation Email"
            message = "Hello " +user.first_name +". The owner has confirmed you as a Moderator."
            from_email= settings.EMAIL_HOST_USER
            to_list = [user.email]
            send_mail(subject,message,from_email,to_list,fail_silently=True)
            return HttpResponse(status=200)


#API koji ce da nam pokaze svi eventi.
def showEvents(request):
    if request.method =='GET':
        event=Event.objects.all()
        serializar = EventsSerializer(event, many=True)
        return JsonResponse(serializar.data, safe=False)


#API koji ce da kreira Event. Mora da bude logovan da kreira event.
class createEvent(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    @csrf_exempt
    def post(self,request):
        data= JSONParser().parse(request)
        serializar=EventsSerializer(data=data)
        if serializar.is_valid():
            serializar.save()
            return JsonResponse(serializar.data, status=201)
        return JsonResponse(serializar.errors, status=400)


#API koji ce da nam pokaze svi Stages.
def showStages(request):
    if request.method =='GET':
        stage=Stage.objects.all()
        serializar = StagesSerializer(stage, many=True)
        return JsonResponse(serializar.data, safe=False)


#API koji ce da kreira Stage. Samo superuser ima pristup.
class createStage(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    @csrf_exempt
    def post(self,request):
        user=request.user
        if user.is_superuser == True:
            data= JSONParser().parse(request)
            serializar=StagesSerializer(data=data)
            if serializar.is_valid():
                serializar.save()
                return JsonResponse(serializar.data, status=201)
            return JsonResponse(serializar.errors, status=400)


#API koji nama vrati jedan stage.
class oneStage(views.APIView):
    def get(self,request,pk):
        stage= Stage.objects.get(id=pk)
        serializer= StagesSerializer(stage)
        return JsonResponse(serializer.data, safe=False)


#API koji updatuje Stage. Samo Superuser ima pristup.
class updateStage(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def put(self,request,pk):
        user=request.user
        if user.is_superuser==True:
            stage= Stage.objects.get(id=pk)
            data=JSONParser().parse(request)
            serializar= StagesSerializer(stage,data=data)
            if serializar.is_valid():
                serializar.save()
                return JsonResponse(serializar.data, status=201)
            return JsonResponse(serializar.errors, status=400)


#API koji nama vrati jedan Event.
class oneEvent(views.APIView):
    def get(self,request,pk):
        event= Event.objects.get(id=pk)
        serializer= EventsSerializer(event)
        return JsonResponse(serializer.data, safe=False)


#API koji updatuje Event. Mora biti logovan za pristup.
class updateEvent(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def put(self,request,pk):
        event= Event.objects.get(id=pk)
        data=JSONParser().parse(request)
        serializar= EventsSerializer(event,data=data)
        if serializar.is_valid():
            serializar.save()
            return JsonResponse(serializar.data, status=201)
        return JsonResponse(serializar.errors, status=400)


#API koji ce da brise Event. Ako je superuser on moze svaku. Ako nije onda svako svoj event.
class deleteEvent(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self,request,pk):
        event= Event.objects.get(id=pk)
        user=request.user
            
        if user.id == event.host.id:
            event.delete()
            return HttpResponse(status=200)
        elif user.is_superuser == True:
            event.delete()
            return HttpResponse(status=200)
        
        
#API koji ce da brise Stages. Samo Superuser ima pristup na ovaj.
class deleteStage(views.APIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self,request,pk):
        stage= Stage.objects.get(id=pk)
        user=request.user
            
        if user.is_superuser == True:
            stage.delete()
            return HttpResponse(status=200)
        

#API koji ce da filtrira dogadjaje.
class EventFilter(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['category']
