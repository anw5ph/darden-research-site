from django.db import models

# Create your models here.


class Transaction(models.Model):
    from_address = models.CharField(max_length=45)
    to_address = models.CharField(max_length=45)
    date_time = models.DateTimeField()
    amount = models.FloatField()


class TransactionSheet(models.Model):
    trans = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    date = models.DateField()


class DAO(models.Model):
    name = models.CharField(max_length=200)
    trans_sheet = models.ForeignKey(TransactionSheet, on_delete=models.CASCADE)
