import React from "react";
import { Categories } from "./category-item.type";
import './category-item.styles.scss';

export const CategoryItem: React.FC<{ category: Categories }> = ({ category }) => {

  const { id, imageUrl, title } = category;

  return (
    <div key={`category_${id}`} className='category-container'>
      <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  )
};
