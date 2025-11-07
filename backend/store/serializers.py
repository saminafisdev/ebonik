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
