from django.contrib import admin
from django.urls import path, include

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
