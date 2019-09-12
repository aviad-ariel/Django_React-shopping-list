from django.db import models
from django.contrib.auth.models import User

class ShoppingList(models.Model):
    name = models.CharField(max_length=30, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shopping_lists')
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=30)
    quantity = models.PositiveIntegerField(default=1)
    date_updated = models.DateTimeField(auto_now=True)
    shopping_list = models.ForeignKey(ShoppingList, on_delete=models.CASCADE, related_name='items')

    def __str__(self):
        return self.name
