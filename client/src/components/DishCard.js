import React from 'react';

const DishCard = ({ dish }) => {
  return (
    <div className="dish-card">
      <h3 className="dish-name">{dish.Dish}</h3>
      <p className="dish-vegetable">
        <strong>Vegetable:</strong> {dish.Vegetable}
      </p>
      <span className="dish-type">{dish['Dish Type']}</span>
    </div>
  );
};

export default DishCard;
