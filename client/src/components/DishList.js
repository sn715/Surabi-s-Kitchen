import React, { useState, useEffect, useCallback } from 'react';
import { dishesAPI, vegetablesAPI, dishTypesAPI } from '../services/api';
import DishCard from './DishCard';

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [selectedVegetable, setSelectedVegetable] = useState('');
  const [selectedDishType, setSelectedDishType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const loadDishes = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      let result;
      
      if (searchTerm) {
        result = await dishesAPI.search(searchTerm);
      } else if (selectedVegetable) {
        result = await dishesAPI.getByVegetable(selectedVegetable);
      } else {
        const params = {};
        if (selectedDishType) {
          params.dishType = selectedDishType;
        }
        result = await dishesAPI.getAll(params);
      }

      setDishes(result.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedVegetable, selectedDishType]);

  const loadInitialData = async () => {
    try {
      const [vegetablesRes, dishTypesRes] = await Promise.all([
        vegetablesAPI.getAll(),
        dishTypesAPI.getAll()
      ]);
      setVegetables(vegetablesRes.data || []);
      setDishTypes(dishTypesRes.data || []);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadDishes();
  }, [loadDishes]);

  const handleVegetableChange = (e) => {
    setSelectedVegetable(e.target.value);
    setSelectedDishType(''); // Reset dish type when vegetable changes
  };

  const handleDishTypeChange = (e) => {
    setSelectedDishType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSelectedVegetable('');
    setSelectedDishType('');
    setSearchTerm('');
  };

  const filteredDishes = dishes.filter(dish => {
    if (selectedDishType && dish['Dish Type'] !== selectedDishType) {
      return false;
    }
    return true;
  });

  return (
    <div className="card">
      <h2>Browse Dishes</h2>

      {error && <div className="error">{error}</div>}

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search dishes, vegetables, or dish types..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="vegetable-filter">Filter by Vegetable</label>
          <select
            id="vegetable-filter"
            className="form-control"
            value={selectedVegetable}
            onChange={handleVegetableChange}
          >
            <option value="">All Vegetables</option>
            {vegetables.map((veg, index) => (
              <option key={index} value={veg}>
                {veg}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="dish-type-filter">Filter by Dish Type</label>
          <select
            id="dish-type-filter"
            className="form-control"
            value={selectedDishType}
            onChange={handleDishTypeChange}
          >
            <option value="">All Dish Types</option>
            {dishTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <button 
            onClick={clearFilters} 
            className="btn btn-secondary"
            style={{ marginTop: '24px' }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="loading">Loading dishes...</div>
      ) : filteredDishes.length > 0 ? (
        <>
          <p style={{ marginBottom: '20px', color: '#4a5568' }}>
            Showing {filteredDishes.length} dish{filteredDishes.length !== 1 ? 'es' : ''}
            {selectedVegetable && ` for ${selectedVegetable}`}
            {selectedDishType && ` of type ${selectedDishType}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
          <div className="dishes-grid">
            {filteredDishes.map((dish, index) => (
              <DishCard key={dish.id || index} dish={dish} />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <h3>No dishes found</h3>
          <p>
            {searchTerm 
              ? `No dishes match "${searchTerm}"`
              : selectedVegetable 
                ? `No dishes found for ${selectedVegetable}`
                : 'No dishes available. Try adding some dishes!'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default DishList;
