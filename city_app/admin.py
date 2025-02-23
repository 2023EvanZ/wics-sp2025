from django.contrib import admin
from .models import Business

class BusinessAdmin(admin.ModelAdmin):
    fields = ["id", "name", "longitude", "latitude", "video", "description", "location", "hours", "contacts", "likes", "dislikes"]

admin.site.register(Business, BusinessAdmin)