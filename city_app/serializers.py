from rest_framework import serializers
from .models import Business,Video

class VideoSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()  # Custom field for full URL

    class Meta:
        model = Video
        fields = "__all__"  # No need to return 'file' since it's in static

    def get_file_url(self, obj):
        # Assuming video files are stored in "static/videos/"
        return static(f"videos/{obj.file.name}")

class BusinessSerializer(serializers.ModelSerializer):

    # create a meta class
    class Meta:
        model = Business
        fields = "__all__"
