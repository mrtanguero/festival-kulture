from django.contrib.auth import authenticate, models
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Moderator, Stage, Event

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','first_name', 'last_name', 'email','is_superuser','is_staff')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'],first_name=validated_data['first_name'], last_name=validated_data['last_name'], is_staff=True)
        return user

#login serializer

class LoginSerializer(serializers.Serializer):
    username= serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials BK")

#Moderators
class ModeratorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Moderator
        fields=('id','username','first_name','last_name','email','password','is_active')



class StagesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Stage
        exclude = []

class EventsSerializer(serializers.ModelSerializer):
   # stage = StagesSerializer(many=True, read_only=True)
    class Meta:
        model= Event
        fields = ['id','event_name','category', 'day', 'start_time','end_time','description','event_img','host','stage']

