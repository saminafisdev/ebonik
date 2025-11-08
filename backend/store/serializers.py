from rest_framework import serializers
from .models import Store


class StoreSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.id")

    class Meta:
        model = Store
        fields = [
            "id",
            "owner",
            "name",
            "slug",
            "description",
            "logo",
            "banner",
            "address",
            "phone",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["slug", "is_active", "created_at", "updated_at"]

    def validate(self, attrs):
        user = self.context["request"].user
        if hasattr(user, "store"):
            raise serializers.ValidationError("You already have a store.")
        return attrs
