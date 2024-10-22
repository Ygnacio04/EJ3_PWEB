import React, { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/formulario';
import Lista from './components/Lista';

const App = () => {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: '', gender: '' });
  const [selectedPet, setSelectedPet] = useState(null);
  const [adoptionRequest, setAdoptionRequest] = useState(null);

  useEffect(() => {
    fetch('https://huachitos.cl/api/animales')
      .then((response) => response.json())
      .then((data) => setPets(data.data))
      .catch((error) => console.error('Error fetching pets:', error));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
  };

  const handleAdoptionRequest = (formData) => {
    setAdoptionRequest(formData);
    setSelectedPet(null); 
  };

  const filteredPets = pets.filter((pet) => {
    const matchesType = !filters.type || pet.tipo.toLowerCase() === filters.type.toLowerCase();
    const matchesGender = !filters.gender || (pet.genero && pet.genero.toLowerCase() === filters.gender.toLowerCase());
    return matchesType && matchesGender;
  });

  return (
    <div className="app">
      <h1>¡Adopta un amigo peludo! 🐶</h1>

      {/* Filtros */}
      <div className="filter">
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
          <option value="conejo">Conejo</option>
        </select>
        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="macho">Macho</option>
          <option value="hembra">Hembra</option>
        </select>
      </div>

      {/* Mostrar detalles de la mascota seleccionada */}
      {selectedPet && (
        <div className="selected-pet-container">
          <div className="selected-pet-info">
            <h2>{selectedPet.nombre}</h2>
            <img src={selectedPet.imagen} alt={selectedPet.nombre} />
            <p><strong>Edad:</strong> {selectedPet.edad}</p>
            <p><strong>Género:</strong> {selectedPet.genero}</p>
            <p><strong>Descripción Física:</strong> {selectedPet.desc_fisica}</p>
            <p><strong>Descripción Personalidad:</strong> {selectedPet.desc_personalidad}</p>
            <p><strong>Descripción Adicional:</strong> {selectedPet.desc_adicional}</p>
            <p><strong>Estado:</strong> {selectedPet.estado}</p>
            <p><strong>Esterilizado:</strong> {selectedPet.esterilizado ? 'Sí' : 'No'}</p>
            <p><strong>Vacunas:</strong> {selectedPet.vacunas ? 'Sí' : 'No'}</p>
            <p><strong>Comuna:</strong> {selectedPet.comuna}</p>
            <p><strong>Región:</strong> {selectedPet.region}</p>
          </div>

          {/* Formulario de adopción */}
          <Formulario selectedPet={selectedPet} onSubmit={handleAdoptionRequest} />
        </div>
      )}

      {/* Lista de mascotas filtradas */}
      <Lista pets={pets} filteredPets={filteredPets} onPetSelect={handlePetSelect} />

      {/* Confirmación de solicitud de adopción */}
      {adoptionRequest && (
        <div className="request-confirmation">
          <p>Solicitud enviada para {adoptionRequest.petName}!</p>
        </div>
      )}
    </div>
  );
};

export default App;
