from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField, IntegerField
from django.db.models.fields.related import OneToOneField
from django.contrib.auth.models import User

class Moderator(models.Model):
    username = models.CharField(max_length=200)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=200)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.username


class Stage(models.Model):
    stage_name = models.CharField(max_length=100)
    stage_place = models.CharField(max_length=20)

    def __str__(self):
        return self.stage_name


class Event(models.Model):
    stage = models.ForeignKey(Stage, on_delete=models.CASCADE, null=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    event_name = models.CharField(max_length=30)
    MUZICKI = "muzika"
    FILMSKI = "film"
    LIKOVNI = "izložba"
    PLESNI = "ples"
    POEZIJA = "poezija"
    CATEGORY_CHOICES = [
        (MUZICKI, "muzika"),
        (FILMSKI, "film"),
        (LIKOVNI, "izložba"),
        (PLESNI, "ples"),
        (POEZIJA, "poezija"),
    ]
    category = models.CharField(max_length=10,
                                choices=CATEGORY_CHOICES,
                                default=MUZICKI,
                                )
    DAY_CHOICES = [
        ('1', 'Petak'),
        ('2', 'Subota'),
        ('3', 'Nedjelja'),
    ]
    day = models.CharField(max_length=1, choices=DAY_CHOICES, default='1')
    start_time = models.TimeField()
    end_time = models.TimeField()
    description = models.CharField(max_length=500)
    event_img = models.URLField(default="#")

    def __str__(self):
        return self.event_name
