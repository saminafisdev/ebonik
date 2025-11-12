from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import Store

User = get_user_model()


@receiver(post_save, sender=User)
def create_store_for_vendor(sender, instance, created, **kwargs):
    if created and instance.role == User.Role.VENDOR:
        Store.objects.create(owner=instance, name=f"{instance.first_name}'s Store")
