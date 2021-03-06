# Generated by Django 3.2.8 on 2022-07-05 13:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Airline',
            fields=[
                ('airline_id', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('airline_name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Country',
            fields=[
                ('country_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('country_name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='CustomerProfile',
            fields=[
                ('customer_id', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=50)),
                ('phone_num', models.CharField(max_length=50, unique=True)),
                ('credit_card', models.CharField(max_length=50, unique=True)),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('flight_id', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('departure_time', models.DateTimeField(auto_now_add=True)),
                ('landing_time', models.DateTimeField(auto_now_add=True)),
                ('remaining_tickets', models.IntegerField()),
                ('airline_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.airline')),
                ('destination_country_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='arrival_country_id', to='base.country')),
                ('origin_country_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.country')),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('ticket_id', models.BigAutoField(editable=False, primary_key=True, serialize=False)),
                ('customer_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.customerprofile')),
                ('flight_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.flight')),
            ],
        ),
        migrations.RemoveField(
            model_name='pita',
            name='user',
        ),
        migrations.DeleteModel(
            name='Note',
        ),
        migrations.DeleteModel(
            name='Pita',
        ),
        migrations.AddField(
            model_name='airline',
            name='country_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.country'),
        ),
        migrations.AddField(
            model_name='airline',
            name='user_id',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddConstraint(
            model_name='ticket',
            constraint=models.UniqueConstraint(fields=('flight_id', 'customer_id'), name='unique_booking'),
        ),
    ]
