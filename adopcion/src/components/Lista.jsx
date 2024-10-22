// Lista.jsx
import React from 'react';

const Lista = ({ pets, filteredPets, onPetSelect }) => {
  return (
    <div className="pet-list">
      {filteredPets.map((pet) => (
        <div
          key={pet.id}
          className="pet-card"
          onClick={() => onPetSelect(pet)}
          style={{ backgroundColor: pet.color }} 
        >
          <img src={pet.imagen} alt={pet.nombre} />
          <h3>{pet.nombre}</h3>
          <p><strong>Edad:</strong> {pet.edad}</p>
          <p><strong>Género:</strong> {pet.genero}</p>
        </div>
      ))}
    </div>
  );
};

export default Lista;
