import django_filters
from django_filters import rest_framework as filters
from django.db.models import Q
from .models import Product, Category


class ProductFilter(filters.FilterSet):
    # Range filters
    min_price = filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="price", lookup_expr="lte")

    # Category by slug (custom method to include descendants)
    category = filters.CharFilter(method="filter_category")

    # Search by name
    search = filters.CharFilter(method="filter_search")

    # Brand exact match
    brand = filters.CharFilter(field_name="brand", lookup_expr="iexact")

    # Rating greater or equal
    min_rating = filters.NumberFilter(field_name="rating", lookup_expr="gte")

    class Meta:
        model = Product
        fields = ["category", "brand", "min_price", "max_price", "min_rating"]

    def filter_search(self, queryset, name, value):
        return queryset.filter(name__icontains=value)

    def filter_category(self, queryset, name, value):
        try:
            category = Category.objects.get(slug=value)
        except Category.DoesNotExist:
            return queryset.none()

        # Collect all descendant categories recursively
        def get_descendant_ids(cat):
            ids = [cat.id]
            for child in cat.subcategories.all():
                ids.extend(get_descendant_ids(child))
            return ids

        category_ids = get_descendant_ids(category)
        return queryset.filter(category_id__in=category_ids)
