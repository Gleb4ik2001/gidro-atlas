from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ("login", "role", "is_staff", "is_superuser")
    list_filter = ("role", "is_staff", "is_superuser")

    ordering = ("login",)

    fieldsets = (
        (None, {"fields": ("login", "password")}),
        ("Permissions", {"fields": ("role", "is_staff", "is_superuser")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("login", "password1", "password2", "role", "is_staff", "is_superuser"),
        }),
    )

    search_fields = ("login",)
