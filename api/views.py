from rest_framework import status
from rest_framework.response import Response # type: ignore
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets
from .models import Cancion
from .serializers import CancionSerializer

class CancionViewSet(viewsets.ModelViewSet):
    queryset = Cancion.objects.all()
    serializer_class = CancionSerializer
