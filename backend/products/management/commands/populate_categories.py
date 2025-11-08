from django.core.management.base import BaseCommand
from products.models import Category  # Adjust this import!
from django.db import transaction

# Note: slugify is implicitly handled by the model's save method,
# but if you run into issues, you may need to ensure it's accessible globally
# or import it here if the shell approach is integrated.


class Command(BaseCommand):
    help = "Populates the database with initial dummy categories."

    def handle(self, *args, **options):
        # Use a transaction to ensure atomicity (all or nothing)
        with transaction.atomic():
            self.stdout.write("Deleting existing Category data...")
            Category.objects.all().delete()

            self.stdout.write("Creating new Categories...")

            # --- Top-Level Categories ---

            electronics, _ = Category.objects.get_or_create(name="Electronics")
            apparel, _ = Category.objects.get_or_create(name="Apparel & Clothing")
            home, _ = Category.objects.get_or_create(name="Home & Garden")
            books, _ = Category.objects.get_or_create(name="Books, Movies & Music")

            # --- Level 2 Categories ---

            # Electronics Subcategories
            smartphones, _ = Category.objects.get_or_create(
                name="Smartphones", parent=electronics
            )
            Category.objects.get_or_create(name="Laptops & Tablets", parent=electronics)

            # Apparel Subcategories
            mens_clothing, _ = Category.objects.get_or_create(
                name="Men's Clothing", parent=apparel
            )
            womens_shoes, _ = Category.objects.get_or_create(
                name="Women's Shoes", parent=apparel
            )

            # Home & Garden Subcategories
            Category.objects.get_or_create(name="Kitchenware", parent=home)
            Category.objects.get_or_create(name="Gardening Supplies", parent=home)

            # --- Level 3 (Nested) Categories ---

            Category.objects.get_or_create(name="Sneakers", parent=womens_shoes)
            Category.objects.get_or_create(name="Dress Shirts", parent=mens_clothing)

            self.stdout.write(self.style.SUCCESS("Successfully populated categories!"))
