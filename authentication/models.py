from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models
class CustomUser(AbstractUser):
    fav_nfl = models.CharField(blank=True, max_length=120)
    fav_nba = models.CharField(blank=True, max_length=120)