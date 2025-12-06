from rest_framework import permissions
from django.http.request import HttpRequest

class IsExpert(permissions.BasePermission):
    def has_permission(self, request:HttpRequest, view):
        user = request.user
        return user.is_authenticated and user.role == 'expert'
    
    
class IsGuest(permissions.BasePermission):
    def has_permission(self, request:HttpRequest, view):
        user = request.user
        return user.is_authenticated and user.role == 'guest'