import { CategoryItem } from "../category-item/category-item.component";
import { Categories } from "../category-item/category-item.type";

import './directory.styles.scss';

export const Directory: React.FC<{categories : Categories[]}> = ({categories}) => {
  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <CategoryItem
          key={`Category_${category.id}`}
          category={category}
        />
      ))}
    </div>
  );
}
