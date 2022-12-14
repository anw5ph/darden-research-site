from django.contrib import admin
from .models import Transaction, DAO

# Register your models here.


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('date_time', 'address_from', 'address_to',
                    'amount', 'contract_address')
    search_fields = ['address_from', 'address_to',
                     'contract_address', 'date_time']
    ordering = ['id']


class DAOAdmin(admin.ModelAdmin):
    list_display = ('contract_address', 'name', 'token_symbol')
    search_fields = ['name', 'contract_address', 'token_symbol']
    ordering = ['id']


admin.site.register(Transaction, TransactionAdmin)
admin.site.register(DAO, DAOAdmin)
