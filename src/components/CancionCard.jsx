import React, { useState } from 'react';

const CancionCard = ({ cancion, onEdit, onDelete }) => {
  const [mostrarVideo, setMostrarVideo] = useState(false);

  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <>
      <div className="cancion-card">
        <div className="cancion-info">
          <h3 className="cancion-titulo">{cancion.titulo}</h3>
          <p className="cancion-artista">{cancion.artista}</p>
          <p className="cancion-album">{cancion.album}</p>
          <span className="cancion-genero">{cancion.genero}</span>
          
          <div className="cancion-youtube">
            <button 
              className="btn-video"
              onClick={() => setMostrarVideo(true)}
            >
              <span className="video-icon">▶</span>
              Ver Video
            </button>
          </div>
        </div>
        
        <div className="cancion-buttons">
          <button onClick={() => onEdit(cancion)} className="btn-card btn-editar">
            Editar
          </button>
          <button onClick={() => onDelete(cancion.id)} className="btn-card btn-borrar">
            Borrar
          </button>
        </div>
      </div>

      {mostrarVideo && (
        <div className="video-modal-overlay" onClick={() => setMostrarVideo(false)}>
          <div className="video-modal" onClick={e => e.stopPropagation()}>
            <button 
              className="close-video-button"
              onClick={() => setMostrarVideo(false)}
            >
              ×
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${getYoutubeVideoId(cancion.youtubeUrl)}`}
              title={cancion.titulo}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default CancionCard;