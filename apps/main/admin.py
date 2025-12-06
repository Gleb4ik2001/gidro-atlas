from django.contrib import admin

from .models import WaterObject


@admin.register(WaterObject)
class WaterObjectAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "region",
        "resource_type",
        "water_type",
        "technical_condition",
        "priority",
    )
    list_filter = (
        "region",
        "resource_type",
        "water_type",
        "fauna",
        "technical_condition",
    )
    search_fields = ("name", "region")
