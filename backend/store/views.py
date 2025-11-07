from rest_framework import viewsets
from rest_framework import permissions

from .permissions import IsVendor
from .models import Store
from .serializers import StoreSerializer


class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.filter(is_active=True)
    serializer_class = StoreSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsVendor()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role == "vendor":
            # vendors see their own stores
            return Store.objects.filter(owner=user)
        return Store.objects.filter(is_active=True)
