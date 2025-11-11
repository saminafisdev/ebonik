from rest_framework import serializers
from .models import Category, Product, ProductImage


class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.StringRelatedField(many=True, read_only=True)
    products_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "parent", "subcategories", "products_count"]


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image", "alt_text", "is_primary"]


class ProductImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "product", "image", "alt_text", "is_primary"]

    def validate_product(self, product):
        user = self.context["request"].user
        if product.store.owner != user:
            raise serializers.ValidationError(
                "You can only upload images for your own products."
            )
        return product


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    store_name = serializers.CharField(source="store.name", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "store",
            "store_name",
            "category",
            "category_name",
            "name",
            "slug",
            "description",
            "price",
            "stock",
            "is_active",
            "images",
            "created_at",
            "updated_at",
        ]

        read_only_fields = ["store"]
