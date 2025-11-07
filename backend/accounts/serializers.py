from djoser.serializers import (
    UserSerializer as BaseUserSerializer,
    UserCreateSerializer as BaseUserCreateSerializer,
)
from .models import User


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ["first_name", "last_name", "email", "password", "role"]


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ["id", "first_name", "last_name", "email", "role"]
