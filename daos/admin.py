from django.contrib import admin
from .models import Transaction, TransactionSheet, DAO

# Register your models here.


class DAOAdmin(admin.ModelAdmin):
    list_display = ('name', 'trans_sheet')
    search_fields = ['name']
    ordering = ['id']


class TransactionSheetAdmin(admin.ModelAdmin):
    list_display = ('date', 'trans')
    search_fields = ['date']
    ordering = ['date']


class TransactionAdmin(admin.ModelAdmin):
    list_display = ('date_time', 'from_address', 'to_address', 'amount')
    search_fields = ['from_address', 'to_address']
    ordering = ['date']


admin.site.register(Transaction)
admin.site.register(TransactionSheet)
admin.site.register(DAO)
