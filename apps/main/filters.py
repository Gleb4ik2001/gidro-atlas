import django_filters
from .models import WaterObject


class WaterObjectFilter(django_filters.FilterSet):
    passport_date_after = django_filters.DateFilter(
        field_name="passport_date",
        lookup_expr="gte"
    )
    passport_date_before = django_filters.DateFilter(
        field_name="passport_date",
        lookup_expr="lte"
    )

    class Meta:
        model = WaterObject
        fields = {
            "region": ["exact"],
            "resource_type": ["exact"],
            "water_type": ["exact"],
            "fauna": ["exact"],
            "technical_condition": ["exact"],
        }
