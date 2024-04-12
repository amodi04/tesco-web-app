from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Group(models.Model):
    group_name = models.CharField(max_length=50)
    group_description = models.CharField(max_length=200)

    def __str__(self):
        return self.group_name
    

class UserGroup(models.Model):
    # Composite key of user and group
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user) + " " + str(self.group)
