from django.db.models import Count, Q

from rest_framework import exceptions, viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend

from .filters import ProductFilter


from .permissions import IsVendorOrOwnerOrReadOnly
from .models import Category, Product, ProductImage
from .serializers import (
    CategorySerializer,
    ProductImageCreateSerializer,
    ProductSerializer,
    ProductImageSerializer,
)
from store.permissions import IsVendor  # same permission you used in StoreViewSet


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(parent__isnull=True).annotate(
        products_count=Count("products", distinct=True)
        + Count("subcategories__products", distinct=True)
    )
    serializer_class = CategorySerializer
    lookup_field = "slug"

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.prefetch_related("images").select_related(
        "store", "category"
    )
    serializer_class = ProductSerializer
    permission_classes = [IsVendorOrOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter

    def perform_create(self, serializer):
        user = self.request.user
        store = serializer.validated_data["store"]

        # Only allow vendors to add products to their own stores
        if store.owner != user:
            raise exceptions.PermissionDenied(
                "You can only add products to your own store."
            )
        serializer.save()

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role == "vendor":
            # Vendors only see their own store's products
            return self.queryset.filter(store__owner=user)
        return self.queryset.filter(is_active=True)


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageCreateSerializer
    permission_classes = [IsVendorOrOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role == "vendor":
            # Vendors see only their own product images
            return self.queryset.filter(product__store__owner=user)
        return self.queryset.filter(product__is_active=True)
