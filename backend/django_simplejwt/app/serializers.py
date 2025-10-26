from django.contrib.auth.models import User
from rest_framework import serializers

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    full_name = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ("email", "password", "full_name")

    def create(self, validated_data):
        email = validated_data.get("email")
        password = validated_data.get("password")
        full_name = validated_data.get("full_name", "").strip()
        user = User(username=email, email=email)
        if full_name and " " in full_name:
            first, last = full_name.split(" ", 1)
            user.first_name = first
            user.last_name = last
        user.set_password(password)
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "email", "full_name")

    def get_full_name(self, obj):
        return obj.get_full_name() or obj.username
