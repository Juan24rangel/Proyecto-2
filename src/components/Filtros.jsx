import { useState } from 'react';

const Filtros = ({ onFilter, onChangeCancionesPorPagina, cancionesPorPagina }) => {
  const [filtros, setFiltros] = useState({
    genero: '',
    artista: '',
    album: ''  // Eliminamos añoMin y añoMax
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const aplicarFiltros = () => {
    onFilter(filtros);
  };

  const limpiarFiltros = () => {
    setFiltros({
      genero: '',
      artista: '',
      album: ''
    });
    onFilter({});
  };

  return (
    <div className="filtros-barra">
      <div className="filtros-contenido">
        <div className="filtros-grupo">
          <select
            name="genero"
            value={filtros.genero}
            onChange={handleChange}
            className="filtro-input"
          >
            <option value="">Género</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop</option>
            <option value="vallenato">Vallenato</option>
            <option value="electronica">Electrónica</option>
            <option value="clasica">Clásica</option>
            <option value="reggaeton">Reggaeton</option>

          </select>

          <input
            type="text"
            name="artista"
            value={filtros.artista}
            onChange={handleChange}
            placeholder="Artista"
            className="filtro-input"
          />

          <input
            type="text"
            name="album"
            value={filtros.album}
            onChange={handleChange}
            placeholder="Álbum"
            className="filtro-input"
          />

          <input
            type="number"
            value={cancionesPorPagina}
            onChange={(e) => onChangeCancionesPorPagina(e.target.value)}
            placeholder="Items por página"
            min="1"
            className="filtro-input"
          />
        </div>

        <div className="filtro-botones">
          <button onClick={aplicarFiltros} className="btn-filtro aplicar">
            Aplicar
          </button>
          <button onClick={limpiarFiltros} className="btn-filtro limpiar">
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filtros;