import django_filters
from .models import WaterObject


class WaterObjectFilter(django_filters.FilterSet):

    passport_date = django_filters.DateFromToRangeFilter()

    class Meta:
        model = WaterObject
        fields = [
            "region",
            "resource_type",
            "water_type",
            "fauna",
            "technical_condition",
            "passport_date",
        ]
