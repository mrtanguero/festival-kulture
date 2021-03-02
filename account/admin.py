from django.contrib import admin
from .models import Moderator, Stage, Event


# Register your models here.
admin.site.register(Moderator)
admin.site.register(Stage)
admin.site.register(Event)
