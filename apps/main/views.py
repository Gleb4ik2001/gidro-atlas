from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend

from .models import WaterObject
from .serializers import WaterObjectSerializer
from .filters import WaterObjectFilter
from .permissions import IsExpert, IsGuest


class WaterObjectViewSet(viewsets.ModelViewSet):
    queryset = WaterObject.objects.all()
    serializer_class = WaterObjectSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]

    search_fields = ["name"]
    ordering_fields = [
        "name", "region", "resource_type",
        "water_type", "fauna", "passport_date",
        "technical_condition", "priority"
    ]

    filterset_class = WaterObjectFilter

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsExpert()]
        return [IsGuest()]
