import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Filtros from './Filtros';
import NuevaCancionForm from './NuevaCancionForm';
import CancionCard from './CancionCard';
import Paginacion from './Paginacion';
import Login from './Login'; // Añadir este import
import Register from './Register'; // Añadir este import
import '../App.css';

const BASE_URL = 'http://localhost:8000/api';

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [canciones, setCanciones] = useState([]);
  const [cancionesFiltradas, setCancionesFiltradas] = useState([]);
  const [filtros, setFiltros] = useState({
    genero: '',
    artista: '',
    añoMin: '',
    añoMax: '',
    album: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [cancionEditar, setCancionEditar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cancionesPorPagina, setCancionesPorPagina] = useState(6);

  // Obtener canciones
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
      fetchCanciones();
    }
  }, []);

  const fetchCanciones = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${BASE_URL}/canciones/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al obtener canciones');
      const data = await response.json();
      setCanciones(data);
      setCancionesFiltradas(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    setPaginaActual(1);
  }, [cancionesFiltradas]);

  const aplicarFiltrosYOrden = (cancionesOriginales) => {
    let resultado = [...cancionesOriginales];

    if (filtros.genero && filtros.genero.trim() !== '') {
      resultado = resultado.filter(c =>
        c.genero && c.genero.toLowerCase().includes(filtros.genero.trim().toLowerCase())
      );
    }

    return resultado;
  };

  const handleSort = (criterio) => {
    setCriterioOrden(criterio);
    let ordenadas = [...cancionesFiltradas];

    if (criterio === 'año') {
      ordenadas.sort((a, b) => b.año - a.año);
    } else if (criterio === 'popularidad') {
      ordenadas.sort((a, b) => b.reproducciones - a.reproducciones);
    }
    
    setCancionesFiltradas(ordenadas);
  };

  const handleFilter = (nuevosFiltros) => {
    if (!nuevosFiltros || Object.values(nuevosFiltros).every(val => val === '' || val === undefined)) {
      setCancionesFiltradas(canciones);
      setFiltros({
        genero: '',
        artista: '',
        album: ''
      });
      return;
    }

    setFiltros(nuevosFiltros);
    let resultado = [...canciones];

    if (nuevosFiltros.genero) {
      resultado = resultado.filter(c =>
        c.genero.toLowerCase() === nuevosFiltros.genero.toLowerCase()
      );
    }
    if (nuevosFiltros.artista) {
      resultado = resultado.filter(c =>
        c.artista.toLowerCase().includes(nuevosFiltros.artista.toLowerCase())
      );
    }
    if (nuevosFiltros.album) {
      resultado = resultado.filter(c =>
        c.album.toLowerCase().includes(nuevosFiltros.album.toLowerCase())
      );
    }

    setCancionesFiltradas(resultado);
  };

  // Agregar nueva canción
  const handleNuevaCancion = async (nuevaCancion) => {
    try {
      const response = await fetch(`${BASE_URL}/canciones/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaCancion)
      });

      if (!response.ok) throw new Error('Error al crear canción');
      
      const cancionCreada = await response.json();
      // Agregamos la nueva canción al principio del array
      setCanciones(prev => [cancionCreada, ...prev]);
      setCancionesFiltradas(prev => [cancionCreada, ...prev]);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear la canción');
    }
  };

  // Editar canción
  const handleEditarCancion = (cancion) => {
    setCancionEditar(cancion);
    setShowModal(true);
  };

  // Borrar canción
  const handleBorrarCancion = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/canciones/${id}/`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Error al eliminar canción');

      setCanciones(prev => prev.filter(c => c.id !== id));
      setCancionesFiltradas(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar la canción');
    }
  };

  const handleActualizarCancion = async (cancionActualizada) => {
    try {
      const response = await fetch(`${BASE_URL}/canciones/${cancionActualizada.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cancionActualizada)
      });

      if (!response.ok) throw new Error('Error al actualizar canción');

      const cancionRespuesta = await response.json();
      setCanciones(prev => 
        prev.map(c => c.id === cancionActualizada.id ? cancionRespuesta : c)
      );
      setCancionesFiltradas(prev => 
        prev.map(c => c.id === cancionActualizada.id ? cancionRespuesta : c)
      );
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar la canción');
    }
  };

  const totalPaginas = Math.ceil(cancionesFiltradas.length / cancionesPorPagina);
  const cancionesPagina = cancionesFiltradas.slice(
    (paginaActual - 1) * cancionesPorPagina,
    paginaActual * cancionesPorPagina
  );

  const handleCambioCancionesPorPagina = (cantidad) => {
    setCancionesPorPagina(parseInt(cantidad));
    setPaginaActual(1);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    fetchCanciones();
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setCanciones([]);
    setCancionesFiltradas([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-forms">
          <Login onLogin={handleLogin} />
          <Register onRegister={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar onLogout={handleLogout} /> {/* Pasar la función al Navbar */}
      <div className="main-content">
        {/* Agregamos la barra de filtros */}
        <div className="filtros-container">
          <Filtros 
            onFilter={handleFilter} 
            onChangeCancionesPorPagina={handleCambioCancionesPorPagina}
            cancionesPorPagina={cancionesPorPagina}
          />
        </div>
        
        {/* Contenedor de canciones */}
        <div className="canciones-container">
          <button className="btn-nueva-cancion" onClick={() => setShowModal(true)}>
            NUEVA CANCIÓN
          </button>
          <div className="canciones-grid">
            {cancionesPagina.map(cancion => (
              <CancionCard
                key={cancion.id}
                cancion={cancion}
                onEdit={handleEditarCancion}
                onDelete={handleBorrarCancion}
              />
            ))}
          </div>
          <Paginacion
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            setPaginaActual={setPaginaActual}
          />
        </div>
      </div>
      {showModal && (
        <NuevaCancionForm
          onClose={() => {
            setShowModal(false);
            setCancionEditar(null);
          }}
          onSubmit={cancionEditar ? handleActualizarCancion : handleNuevaCancion}
          cancionEditar={cancionEditar}
        />
      )}
    </div>
  );
};

export default Layout;