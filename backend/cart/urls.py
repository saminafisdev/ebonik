from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register("cart-items", views.CartItemViewSet, basename="cart-items"),


urlpatterns = [
    path("cart/", views.CartAPIView.as_view(), name="cart"),
] + router.urls
