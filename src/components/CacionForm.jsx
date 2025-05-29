import { useState } from 'react';

const MascotaForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [mascota, setMascota] = useState({
    nombre: initialData.nombre || '',
    especie: initialData.especie || '',
    raza: initialData.raza || '',
    edad: initialData.edad || '',
    sexo: initialData.sexo || '',
    foto: initialData.foto || '',
  });

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(mascota); }} className="space-y-2 p-4">
      <input type="text" placeholder="Nombre" value={mascota.nombre} onChange={e => setMascota({ ...mascota, nombre: e.target.value })} className="w-full p-2 border rounded" required />
      <input type="text" placeholder="Especie" value={mascota.especie} onChange={e => setMascota({ ...mascota, especie: e.target.value })} className="w-full p-2 border rounded" required />
      <input type="text" placeholder="Raza" value={mascota.raza} onChange={e => setMascota({ ...mascota, raza: e.target.value })} className="w-full p-2 border rounded" required />
      <input type="number" placeholder="Edad" value={mascota.edad} onChange={e => setMascota({ ...mascota, edad: e.target.value })} className="w-full p-2 border rounded" required />
      <select value={mascota.sexo} onChange={e => setMascota({ ...mascota, sexo: e.target.value })} className="w-full p-2 border rounded" required>
        <option value="">Seleccionar Sexo</option>
        <option value="M">Macho</option>
        <option value="H">Hembra</option>
      </select>
      <input type="text" placeholder="URL Foto" value={mascota.foto} onChange={e => setMascota({ ...mascota, foto: e.target.value })} className="w-full p-2 border rounded" required />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Guardar Mascota</button>
        {onCancel && <button type="button" onClick={onCancel} className="bg-gray-400 text-white p-2 rounded">Cancelar</button>}
      </div>
    </form>
  );
};

export default MascotaForm;