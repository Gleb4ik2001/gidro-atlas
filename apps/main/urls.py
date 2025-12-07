from rest_framework.routers import DefaultRouter
from .views import WaterObjectViewSet


router = DefaultRouter()
router.register("objects", WaterObjectViewSet)

urlpatterns = router.urls
