from rest_framework import permissions


class IsVendor(permissions.BasePermission):
    """Allow only vendor users to manage their own stores."""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "vendor"

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
