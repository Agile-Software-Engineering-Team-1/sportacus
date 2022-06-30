
from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    fav_nfl = models.CharField(max_length=120)
    fav_col = models.CharField(max_length=120)