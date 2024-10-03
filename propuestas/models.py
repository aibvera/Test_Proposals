from django.db import models
from django.core.validators import EmailValidator

# Create your models here.

class Propuesta(models.Model):

    Id_Propuesta = models.AutoField(primary_key=True)
    class AreaChoises(models.TextChoices):
        GR = 'GR', 'Geología y Recursos Minerales'
        MI = 'MI', 'Minería'
    Area = models.CharField(max_length=2, choices=AreaChoises.choices)
    class CategoriaChoices(models.TextChoices):
        SRC = 'SCR', 'Script'
        AUT = 'AUT', 'Automatización'
        LIB = 'LIB', 'Librería'
        APP = 'APP', 'Aplicación interactiva'
        IAR = 'IAR', 'Inteligencia artificial'
        MET = 'MET', 'Metodología'
    Categoria = models.CharField(max_length=3, choices=CategoriaChoices.choices)
    Proyecto = models.CharField(max_length=100)
    Encargado = models.CharField(max_length=100)
    Correo = models.EmailField(max_length=20, default='-')
    Descripcion = models.CharField(max_length=300, default='-')

class Hora(models.Model):

    Id_Propuesta = models.ForeignKey(Propuesta, on_delete=models.PROTECT)
    Desarrollador = models.CharField(max_length=100)
    Horas_Presupuestadas = models.IntegerField()
