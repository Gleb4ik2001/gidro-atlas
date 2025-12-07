from rest_framework import serializers
from datetime import date
from .models import WaterObject
from ml.predictor import predict_attention_probability

class WaterObjectGuestSerializer(serializers.ModelSerializer):
    coordinates = serializers.SerializerMethodField()
    resource_type_display = serializers.CharField(source='get_resource_type_display', read_only=True)
    water_type_display = serializers.CharField(source='get_water_type_display', read_only=True)
    region_display = serializers.CharField(source='get_region_display', read_only=True)

    class Meta:
        model = WaterObject
        fields = [
            "id",
            "name",
            "region",
            "region_display",
            "resource_type",
            "resource_type_display",
            "water_type",
            "water_type_display",
            "fauna",
            "coordinates",
        ]

    def get_coordinates(self, obj):
        return [obj.longitude, obj.latitude]


class WaterObjectExpertSerializer(serializers.ModelSerializer):
    coordinates = serializers.SerializerMethodField()
    ml_attention_probability = serializers.SerializerMethodField()
    resource_type_display = serializers.CharField(source='get_resource_type_display', read_only=True)
    water_type_display = serializers.CharField(source='get_water_type_display', read_only=True)
    region_display = serializers.CharField(source='get_region_display', read_only=True)

    class Meta:
        model = WaterObject
        fields = "__all__"
        read_only_fields = ("priority",)

    def get_coordinates(self, obj):
        return [obj.longitude, obj.latitude]
    
    def get_ml_attention_probability(self, obj):
        if obj.passport_date:
            age_years = (date.today() - obj.passport_date).days // 365
        else:
            age_years = 0
        return predict_attention_probability(obj.technical_condition, age_years)
