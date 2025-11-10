from uuid import uuid4
from django.db import models
from customers.models import Customer
from products.models import Product


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, unique=True, default=uuid4)
    customer = models.OneToOneField(
        Customer, on_delete=models.CASCADE, related_name="cart"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.customer.user.email}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=1)

    class Meta:
        unique_together = ("cart", "product")

    def __str__(self):
        return f"{self.product.name} ({self.quantity})"
