from django.db import models
from django.core.validators import EmailValidator

# Create your models here.

class Propuesta(models.Model):

    Id_Propuesta = models.CharField(max_length=10, primary_key=True)
    AREAS = {
        'GR': 'Geología y Recursos Minerales',
        'MI': 'Minería'
    }
    Area = models.CharField(max_length=2, choices=AREAS)
    CATEGS = {
        'SCR': 'Scipt',
        'AUT': 'Automatización',
        'LIB': 'Librería',
        'APP': 'Aplicación interactiva',
        'IAR': 'Inteligencia artificial',
        'MET': 'Metodología'
    }
    Categoria = models.CharField(max_length=3, choices=CATEGS)
    Proyecto = models.CharField(max_length=100)
    Encargado = models.CharField(max_length=100)
    Correo = models.EmailField(max_length=20, default='NaN', validators=[EmailValidator(allowlist=['srk.com'])])

class Hora(models.Model):

    Id_Propuesta = models.OneToOneField(Propuesta, on_delete=models.PROTECT)
    Desarrollador = models.CharField(max_length=100)
    Horas_Presupuestadas = models.IntegerField()
