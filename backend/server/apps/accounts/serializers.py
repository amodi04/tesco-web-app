from rest_framework import serializers
from .models import Group, UserGroup

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        read_only_fields = ('id',)
        fields = '__all__'


class UserGroup(serializers.ModelSerializer):
    class Meta:
        model = UserGroup
        read_only_fields = ('id',)
        fields = '__all__'