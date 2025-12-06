from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate


@api_view(["POST"])
def login_view(request):
    login = request.data.get("login")
    password = request.data.get("password")

    user = authenticate(login=login, password=password)
    if not user:
        return Response({"detail": "Invalid credentials"}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "user": {
            "id": str(user.id),
            "login": user.login,
            "role": user.role,
        }
    })


@api_view(["POST"])
def logout_view(request):
    try:
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({"detail": "Logout successful"}, status=205)
    except Exception as e:
        return Response({"detail": "Invalid token"}, status=400)
