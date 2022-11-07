from django.db import models

# Create your models here.


class Transaction(models.Model):
    address_from = models.CharField(max_length=45)
    address_to = models.CharField(max_length=45)
    date_time = models.DateTimeField()
    amount = models.FloatField()
    contract_address = models.CharField(max_length=45)


class DAO(models.Model):
    contract_address = models.CharField(max_length=45)
    name = models.CharField(max_length=255)
    token_symbol = models.CharField(max_length=45)
