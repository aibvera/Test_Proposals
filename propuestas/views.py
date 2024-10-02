from django.shortcuts import render
from .models import Propuesta
from django.http import JsonResponse

# Create your views here.

def index(request):
    return render(request, 'index.html', {})
def new(request):
    return render(request, 'new.html', {})
def edit(request):
    return render(request, 'edit.html', {})

# Funciones de movimiento para json #

def get_proposals(request):
    proposals = list(Propuesta.objects.values())
    if len(proposals) > 0:
        data = {'message': 'Success', 'propuestas': proposals}
    else:
        data = {'message': 'Not Found'}
    return JsonResponse(data)
