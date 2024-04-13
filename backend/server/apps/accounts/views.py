from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserGroup, Group

from .serializers import GroupSerializer

# API endpoint that allows groups to be viewed and created.
class GroupView(APIView):
    def get(self, request):
        # Get groups that the user is a part of by filtering the UserGroup model
        user = request.user
        groups = UserGroup.objects.filter(user=user)
        # Get the group objects from the UserGroup objects
        group_objects = [group.group for group in groups]
        # Serialize the group objects
        serializer = GroupSerializer(group_objects, many=True)
        return Response(serializer.data)


    
    # POST request to create a new group and add the creator to the group
    def post(self, request):
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # User is added to the group
            user = request.user
            # Get the group object that was just created and handle if the name is not unique
            group = Group.objects.latest('id')
            UserGroup.objects.create(user=user, group=group)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)