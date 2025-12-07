from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import WaterObject
from .serializers import WaterObjectGuestSerializer, WaterObjectExpertSerializer
from .filters import WaterObjectFilter
from .permissions import IsExpert, ReadOnly


class WaterObjectViewSet(viewsets.ModelViewSet):
    queryset = WaterObject.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = WaterObjectFilter

    search_fields = ["name"]
    ordering_fields = [
        "name", "region", "resource_type", "water_type", "fauna",
        "passport_date", "technical_condition", "priority"
    ]

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsExpert()]

        return [ReadOnly()]

    def get_serializer_class(self):
        user = self.request.user
        
        if user.is_authenticated and user.role == "expert":
            return WaterObjectExpertSerializer

        return WaterObjectExpertSerializer
