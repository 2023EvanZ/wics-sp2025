from django.contrib import admin
from .models import Business, Video

class BusinessAdmin(admin.ModelAdmin):
    fields = [field.name for field in Business._meta.get_fields()]

class VideoAdmin(admin.ModelAdmin):
    fields = ["file"]

admin.site.register(Business, BusinessAdmin)
admin.site.register(Video, VideoAdmin)