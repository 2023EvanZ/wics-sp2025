# Generated by Django 4.2.18 on 2025-02-22 16:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='videos/')),
            ],
        ),
        migrations.CreateModel(
            name='Business',
            fields=[
                ('name', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=200)),
                ('longitude', models.FloatField()),
                ('latitude', models.FloatField()),
                ('video', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='city_app.video')),
            ],
        ),
    ]
