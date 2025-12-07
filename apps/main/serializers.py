from rest_framework import serializers
from .models import WaterObject


class WaterObjectGuestSerializer(serializers.ModelSerializer):
    coordinates = serializers.SerializerMethodField()

    class Meta:
        model = WaterObject
        fields = [
            "id",
            "name",
            "region",
            "resource_type",
            "water_type",
            "fauna",
            "coordinates",
        ]

    def get_coordinates(self, obj):
        return [obj.longitude, obj.latitude]


class WaterObjectExpertSerializer(serializers.ModelSerializer):
    coordinates = serializers.SerializerMethodField()

    class Meta:
        model = WaterObject
        fields = "__all__"

    def get_coordinates(self, obj):
        return [obj.longitude, obj.latitude]
