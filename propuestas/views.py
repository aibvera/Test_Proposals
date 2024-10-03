from django.shortcuts import render
from .models import Propuesta
from django.http import JsonResponse
import json
import random
from .models import Propuesta

# Create your views here.

def index(request):
    return render(request, 'index.html', {})
def new(request):
    return render(request, 'new.html', {})
def edit(request):
    return render(request, 'edit.html', {})

# Funciones de enviado de jsons al cliente #

def get_proposals(request):
    proposals = list(Propuesta.objects.values())
    if len(proposals) > 0:
        data = {'message': 'Success', 'propuestas': proposals}
    else:
        data = {'message': 'Not Found'}
    return JsonResponse(data)

def get_AreaChoices(request):
    choices = list(Propuesta.AreaChoises.choices)
    if len(choices) > 0:
        data = {'message': 'Success', 'opciones': choices}
    else:
        data = {'message': 'Not Found'}
    return JsonResponse(data)

def get_CategoriaChoices(request):
    choices = list(Propuesta.CategoriaChoices.choices)
    if len(choices) > 0:
        data = {'message': 'Success', 'opciones': choices}
    else:
        data = {'message': 'Not Found'}
    return JsonResponse(data)

# Funciones de recepción de jsons desde el cliente #

def submit(request):
    if request.method == 'POST':

        # Leer el cuerpo de la solicitud como JSON:
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

        # Extraer valores del json:
        area = data.get('Area')
        cate = data.get('Categoria')
        proy = data.get('Proyecto')
        enca = data.get('Encargado')
        corr = data.get('Correo')
        desc = data.get('Descripcion')

        # Crear Id:
        #id = area + '_' + cate + '_' + str(random.randint(1,999))

        # Verificar que los valores no sean None
        if not area or not cate or not proy or not enca or not corr or not desc:
            return JsonResponse({'error': 'Campos faltantes o incorrectos'}, status=400)

        # Añadir registro:
        propuesta = Propuesta.objects.create(Area=area, Categoria=cate, Proyecto=proy, Encargado=enca, Correo=corr, Descripcion=desc)
        return JsonResponse({'status': 'Succes', 'Id_Propuesta':propuesta.Id_Propuesta})

    return JsonResponse({'status': 'Error'})
