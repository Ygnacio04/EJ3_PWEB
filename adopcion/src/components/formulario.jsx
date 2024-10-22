import React, { useState } from 'react';

const Formulario = ({ selectedPet, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    petName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, petName: selectedPet ? selectedPet.nombre : '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', address: '', petName: '' }); 
  };

  if (!selectedPet) return null; 

  return (
    <div className="selected-pet-container">
      <h3>Solicitud de {selectedPet.nombre}</h3>
      <form onSubmit={handleSubmit} className="adoption-form">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
