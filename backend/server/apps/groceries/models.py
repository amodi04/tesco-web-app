from django.db import models
from django.contrib.auth import get_user_model
from apps.accounts.models import Group

User = get_user_model()



class Order(models.Model):
    order_number = models.CharField(max_length=50) 
    order_date = models.DateField()
    order_total = models.DecimalField(max_digits=10, decimal_places=2)
    order_status = models.CharField(max_length=50)
    order_group = models.ForeignKey(Group, on_delete=models.CASCADE)
    order_placer = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.order_number
    

class Item(models.Model):
    item_name = models.CharField(max_length=50)
    item_description = models.CharField(max_length=200)
    item_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.item_name
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    orderer = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return str(self.order) + " " + str(self.item)
    

class Payment(models.Model):
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_order = models.ForeignKey(Order, on_delete=models.CASCADE)
    payment_user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.payment_order) + " " + str(self.payment_user)