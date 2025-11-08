from rest_framework import permissions


class IsVendorOrOwnerOrReadOnly(permissions.BasePermission):
    """
    Allows read access for anyone.
    Allows create (POST) only if the user is a 'vendor'.
    Allows update/delete (PUT/PATCH/DELETE) only if the user is the store owner.
    """

    def has_permission(self, request, view):
        # 1. Allow all SAFE_METHODS (GET, HEAD, OPTIONS)
        # This handles list and detail views for anyone.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Ensure the user is authenticated for any non-safe method (POST, PUT, DELETE)
        if not request.user or not request.user.is_authenticated:
            return False

        # 2. Allow Create (POST) only if the user is a 'vendor'
        # Assumes the user model has a 'role' field.
        if request.method == "POST":
            # Check if the user has the required 'vendor' role
            return getattr(request.user, "role", None) == "vendor"

        # For PUT/PATCH/DELETE, we defer to has_object_permission
        # and return True here to allow the check to proceed.
        return True

    def has_object_permission(self, request, view, obj):
        # 1. Allow all SAFE_METHODS (GET, HEAD, OPTIONS)
        # This re-confirms read access for detail views, even if user isn't the owner.
        if request.method in permissions.SAFE_METHODS:
            return True

        # 2. Allow UNSAFE METHODS (PUT, PATCH, DELETE) only if the user is the store owner
        # Assumes:
        #   - The 'obj' is a Product instance.
        #   - The Product instance has a 'store' relationship.
        #   - The Store instance has an 'owner' field (which is the User).

        # Case 1: Product object
        if hasattr(obj, "store"):
            return obj.store.owner == request.user

        # Case 2: ProductImage object
        if hasattr(obj, "product"):
            return obj.product.store.owner == request.user

        return False
