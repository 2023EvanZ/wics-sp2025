from rest_framework import serializers
from .models import Business

class VideoSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()  # To return full URL

    class Meta:
        model = Video
        fields = "__all__"

class BusinessSerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = Business
        fields = "__all__"
