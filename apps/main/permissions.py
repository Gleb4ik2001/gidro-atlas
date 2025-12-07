from rest_framework import permissions
from django.http.request import HttpRequest

class IsExpert(permissions.BasePermission):
    def has_permission(self, request:HttpRequest, view):
        user = request.user
        return user.is_authenticated and user.role == 'expert'
    
    
class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if request.method in permissions.SAFE_METHODS:
            return user.is_authenticated
        return False