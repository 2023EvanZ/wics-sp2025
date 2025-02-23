from django.contrib import admin
from .models import Business, Video

class BusinessAdmin(admin.ModelAdmin):
    fields = "__all__"

class VideoAdmin(admin.ModelAdmin):
    fields = "__all__"

admin.site.register(Business, BusinessAdmin)
admin.site.register(Video, VideoAdmin)