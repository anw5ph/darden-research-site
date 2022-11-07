from django.db import models

# Create your models here.


class Transaction(models.Model):
    address_from = models.CharField(max_length=45)
    address_to = models.CharField(max_length=45)
    date_time = models.DateTimeField()
    amount = models.FloatField()
    contract_address = models.CharField(max_length=45)

    def __str__(self):
        return f"{self.address_from}, {self.address_to}, {self.date_time}, {self.amount}, {self.contract_address}"


class DAO(models.Model):
    contract_address = models.CharField(max_length=45)
    name = models.CharField(max_length=255)
    token_symbol = models.CharField(max_length=45)

    def __str__(self):
        return f"{self.contract_address}, {self.name}, {self.token_symbol}"
