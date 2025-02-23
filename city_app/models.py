from django.db import models

class Video(models.Model):
    file = models.FileField(upload_to='videos/')

    def __str__(self):
        return self.file.url

class Business(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=200)
    longitude = models.FloatField()
    latitude = models.FloatField()
    video = models.OneToOneField(Video, on_delete=models.CASCADE)
    description = models.CharField(max_length=2000)
    location = models.CharField(max_length=200)
    hours = models.CharField(max_length=200)
    contacts = models.CharField(max_length=200)
    likes = models.IntegerField()
    dislikes = models.IntegerField()

    def get_location(self):
        return self.latitude, self.longitude
    
    def get_rating(self):
        if not self.likes + self.dislikes:
            return 0
        return self.likes / (self.likes + self.dislikes)

    def __str__(self):
        return self.name