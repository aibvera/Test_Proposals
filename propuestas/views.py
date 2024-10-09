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
    proposals = Propuesta.objects.all()
    proposal_list = []
    for prop in proposals:
        proposal = {}
        proposal['Id_Propuesta'] = prop.Id_Propuesta
        proposal['Area'] = prop.get_Area_display()
        proposal['Categoría'] = prop.get_Categoria_display()
        proposal['Proyecto'] = prop.Proyecto
        proposal['Encargado'] = prop.Encargado
        proposal['Correo'] = prop.Correo
        proposal['Descripción'] = prop.Descripcion
        proposal_list.append(proposal)
    if len(proposal_list) > 0:
        data = {'message': 'Success', 'propuestas': proposal_list}
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

        # Verificar que los valores no sean None
        if not area or not cate or not proy or not enca or not corr or not desc:
            return JsonResponse({'error': 'Campos faltantes o incorrectos'}, status=400)

        # Añadir registro:
        propuesta = Propuesta.objects.create(Area=area, Categoria=cate, Proyecto=proy, Encargado=enca, Correo=corr, Descripcion=desc)
        return JsonResponse({'status': 'Succes', 'Id_Propuesta':propuesta.Id_Propuesta})

    return JsonResponse({'status': 'Error'})

def update(request):
    if request.method == 'POST':

        # Leer el cuerpo de la solicitud como JSON:
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

        # Extraer valores del json:
        id = data.get('Id_Propuesta')
        area = data.get('Area')
        cate = data.get('Categoria')
        proy = data.get('Proyecto')
        enca = data.get('Encargado')
        corr = data.get('Correo')
        desc = data.get('Descripcion')

        # Verificar que los valores no sean None
        if not area or not cate or not proy or not enca or not corr or not desc:
            return JsonResponse({'error': 'Campos faltantes o incorrectos'}, status=400)
        
        # Editar registro:
        proposal = Propuesta.objects.get(Id_Propuesta=id)
        proposal.Area = area
        proposal.Categoria = cate
        proposal.Proyecto = proy
        proposal.Encargado = enca
        proposal.Correo = corr
        proposal.Descripcion = desc
        proposal.save()
        return JsonResponse({'status': 'Succes', 'Id_Propuesta':proposal.Id_Propuesta})

    return JsonResponse({'status': 'Error'})