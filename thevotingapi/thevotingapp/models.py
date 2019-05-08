from django.db import models

# Create your models here.


class Votacao(models.Model):
    class Meta:
        db_table = "votacao"

    nome = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255, null=True)
    documento = models.CharField(max_length=20)
    ativo = models.BooleanField()
    dataInicio = models.DateField()
    dataFim = models.DateField()
    imagem = models.CharField(max_length=255, null=True)


    def __str__(self):
        return self.nome