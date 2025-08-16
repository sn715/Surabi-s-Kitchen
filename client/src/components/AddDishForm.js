import React, { useState, useEffect } from 'react';
import { vegetablesAPI, dishTypesAPI, dishesAPI } from '../services/api';

const AddDishForm = ({ onDishAdded }) => {
  const [formData, setFormData] = useState({
    Dish: '',
    Vegetable: '',
    'Dish Type': ''
  });
  const [vegetables, setVegetables] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadFormData();
  }, []);

  const loadFormData = async () => {
    try {
      const [vegetablesRes, dishTypesRes] = await Promise.all([
        vegetablesAPI.getAll(),
        dishTypesAPI.getAll()
      ]);
      setVegetables(vegetablesRes.data || []);
      setDishTypes(dishTypesRes.data || []);
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate form
      if (!formData.Dish.trim() || !formData.Vegetable.trim() || !formData['Dish Type'].trim()) {
        throw new Error('All fields are required');
      }

      await dishesAPI.add(formData);
      setSuccess('Dish added successfully!');
      setFormData({ Dish: '', Vegetable: '', 'Dish Type': '' });
      
      // Callback to refresh dishes list
      if (onDishAdded) {
        onDishAdded();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Add New Dish</h2>
      
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Dish">Dish Name *</label>
          <input
            type="text"
            id="Dish"
            name="Dish"
            className="form-control"
            value={formData.Dish}
            onChange={handleInputChange}
            placeholder="Enter dish name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Vegetable">Primary Vegetable *</label>
          <input
            type="text"
            id="Vegetable"
            name="Vegetable"
            className="form-control"
            value={formData.Vegetable}
            onChange={handleInputChange}
            placeholder="Enter primary vegetable"
            list="vegetables-list"
            required
          />
          <datalist id="vegetables-list">
            {vegetables.map((veg, index) => (
              <option key={index} value={veg} />
            ))}
          </datalist>
        </div>

        <div className="form-group">
          <label htmlFor="Dish Type">Dish Type *</label>
          <select
            id="Dish Type"
            name="Dish Type"
            className="form-control"
            value={formData['Dish Type']}
            onChange={handleInputChange}
            required
          >
            <option value="">Select dish type</option>
            {dishTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="btn" 
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Dish'}
        </button>
      </form>
    </div>
  );
};

export default AddDishForm;
