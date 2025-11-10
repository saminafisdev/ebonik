from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from accounts.permission import IsCustomer

from .models import Cart, CartItem
from .serializers import (
    AddCartItemSerializer,
    CartItemSerializer,
    CartSerializer,
    UpdateCartItemSerializer,
)


class CartAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCustomer]

    def get(self, request):
        cart = get_object_or_404(
            Cart.objects.prefetch_related("items__product"), customer__user=request.user
        )
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class CartItemViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated, IsCustomer]
    http_method_names = ["get", "post", "patch", "delete"]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return AddCartItemSerializer
        elif self.request.method == "PATCH":
            return UpdateCartItemSerializer
        return CartItemSerializer

    def get_serializer_context(self):
        cart_id = self.request.user.customer.cart.id
        return {"cart_id": cart_id}

    def get_queryset(self):
        return CartItem.objects.filter(
            cart__customer=self.request.user.customer
        ).select_related("product")
