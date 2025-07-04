# Generated by Django 5.1.7 on 2025-03-19 23:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('event_datetime', models.DateTimeField(blank=True, null=True)),
                ('location', models.CharField(max_length=255)),
                ('created_by', models.CharField(max_length=255)),
                ('deadline', models.DateTimeField(blank=True, null=True)),
                ('max_capacity', models.PositiveIntegerField()),
                ('joined_count', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
