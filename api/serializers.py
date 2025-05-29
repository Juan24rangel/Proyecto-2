from rest_framework import serializers
from .models import Cancion

class CancionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cancion
        fields = ['id', 'titulo', 'artista', 'album', 'genero', 'youtubeUrl', 'fecha_registro']
