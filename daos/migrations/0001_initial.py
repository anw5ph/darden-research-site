# Generated by Django 4.0.2 on 2022-09-14 05:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_address', models.CharField(max_length=45)),
                ('to_address', models.CharField(max_length=45)),
                ('date_time', models.DateTimeField()),
                ('amount', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='TransactionSheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('trans', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='daos.transaction')),
            ],
        ),
        migrations.CreateModel(
            name='DAO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('trans_sheet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='daos.transactionsheet')),
            ],
        ),
    ]