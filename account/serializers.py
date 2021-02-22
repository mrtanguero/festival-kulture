from django.contrib.auth import models
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Moderator

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

#Moderators
class ModeratorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Moderator
        fields=('id','username','first_name','last_name','email','password','is_active')