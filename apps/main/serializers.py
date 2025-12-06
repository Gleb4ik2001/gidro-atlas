from rest_framework import serializers
from .models import WaterObject


class WaterObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterObject
        fields = "__all__"
        read_only_fields = ("priority",)
