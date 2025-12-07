from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


admin.site.site_header = "GidroAtlas — Панель управления"
admin.site.site_title = "GidroAtlas Admin"
admin.site.index_title = "Добро пожаловать в административную панель"

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/auth/", include("auths.urls")),
    path("api/main/", include("main.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)