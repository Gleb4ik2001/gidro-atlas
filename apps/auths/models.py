import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, login, password=None, role="guest"):
        if not login:
            raise ValueError("Login is required")
        user = self.model(login=login, role=role)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, login, password):
        user = self.create_user(login, password, role="expert")
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ("guest", "Guest"),
        ("expert", "Expert"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    login = models.CharField(max_length=150, unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="guest")

    is_active = True
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "login"

    objects = UserManager()

    def __str__(self):
        return self.login
    
    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'
        ordering = ('-id',)
