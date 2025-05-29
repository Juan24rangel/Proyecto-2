from django.db import models

class Cancion(models.Model):
    titulo = models.CharField(max_length=200)
    artista = models.CharField(max_length=200)
    album = models.CharField(max_length=200)
    genero = models.CharField(max_length=50)
    youtubeUrl = models.URLField()
    fecha_registro = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha_registro']

    def __str__(self):
        return f"{self.titulo} - {self.artista}"
