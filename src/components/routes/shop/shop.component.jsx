import { useContext} from "react";

import CategoryPreview from "../../category-preview/category-preview.component";
import { CategoriesContext } from "../../../contexts/categories.context";
// import ProductCard from "../../product-card/product-card.component";

import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div className="shop-container">
      {
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products}  />
        })}
    </div>
  );
};

export default Shop;

// <Fragment key={title}>
//             <h2>{title}</h2>
//             <div className="products-container">
//               {categoriesMap[title].map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </Fragment>