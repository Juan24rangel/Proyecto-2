import React, { useState, useEffect } from 'react';
import '../App.css';

const NuevaCancionForm = ({ onClose, onSubmit, cancionEditar }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    artista: '',
    album: '',
    genero: '',
    youtubeUrl: ''
  });

  // Cargar datos de la canción si estamos editando
  useEffect(() => {
    if (cancionEditar) {
      setFormData({
        titulo: cancionEditar.titulo || '',
        artista: cancionEditar.artista || '',
        album: cancionEditar.album || '',
        genero: cancionEditar.genero || '',
        youtubeUrl: cancionEditar.youtubeUrl || ''
      });
    }
  }, [cancionEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cancionEditar ? { ...formData, id: cancionEditar.id } : formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-form">
        <div className="modal-header">
          <h2>{cancionEditar ? 'Editar Canción' : 'Agregar Nueva Canción'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Título de la Canción:</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ingrese el título de la canción"
              required
            />
          </div>

          <div className="form-field">
            <label>Artista/Banda:</label>
            <input
              type="text"
              name="artista"
              value={formData.artista}
              onChange={handleChange}
              placeholder="Nombre del artista o banda"
              required
            />
          </div>

          <div className="form-field">
            <label>Álbum:</label>
            <input
              type="text"
              name="album"
              value={formData.album}
              onChange={handleChange}
              placeholder="Nombre del álbum"
              required
            />
          </div>

          <div className="form-field">
            <label>Género:</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un género</option>
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="vallenato">Vallenato</option>
              <option value="electronica">Electrónica</option>
              <option value="clasica">Clásica</option>
              <option value="reggaeton">Reggaeton</option>
            </select>
          </div>

          <div className="form-field">
            <label>Link de YouTube:</label>
            <input
              type="url"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=..."
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-guardar">
              {cancionEditar ? 'Guardar Cambios' : 'Guardar'}
            </button>
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaCancionForm;