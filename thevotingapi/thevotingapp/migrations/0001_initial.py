# Generated by Django 2.2.1 on 2019-05-08 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Votacao',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=255)),
                ('descricao', models.CharField(max_length=255)),
                ('documento', models.CharField(max_length=20)),
                ('ativo', models.BooleanField()),
                ('dataInicio', models.DateField()),
                ('dataFim', models.DateField()),
                ('imagem', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'votacao',
            },
        ),
    ]
