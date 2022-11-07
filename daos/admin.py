from django.contrib import admin
from .models import Transaction, DAO

# Register your models here.


class DAOAdmin(admin.ModelAdmin):
    list_display = ('contract_address', 'name', 'token_symbol')
    search_fields = ['name', 'contract_address', 'token_symbol']
    ordering = ['id']


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('date_time', 'from_address', 'to_address',
                    'amount', 'contract_address')
    search_fields = ['from_address', 'to_address',
                     'contract_address', 'date_time']
    ordering = ['date']


admin.site.register(Transaction)
admin.site.register(DAO)
