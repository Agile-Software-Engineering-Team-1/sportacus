# Generated by Django 4.0.4 on 2022-06-07 00:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='fav_team',
            new_name='fav_nba',
        ),
        migrations.AddField(
            model_name='customuser',
            name='fav_nfl',
            field=models.CharField(blank=True, max_length=120),
        ),
    ]