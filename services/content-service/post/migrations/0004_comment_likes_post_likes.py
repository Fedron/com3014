# Generated by Django 5.1.7 on 2025-04-01 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0003_comment_reply_to_alter_comment_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='likes',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='post',
            name='likes',
            field=models.IntegerField(default=0),
        ),
    ]
