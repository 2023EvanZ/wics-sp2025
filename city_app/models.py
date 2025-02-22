from django.db import models

class Video(models.Model):
    file = models.FileField(upload_to='videos/')

    def __str__(self):
        return self.file.url

class Business(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    longitude = models.FloatField()
    latitude = models.FloatField()
    video = models.OneToOneField(Video, on_delete=models.CASCADE, primary_key=True)

    def get_location(self):
        return self.latitude, self.longitude

    def __str__(self):
        return self.name