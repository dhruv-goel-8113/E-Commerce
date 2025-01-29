import { useContext } from "react";
import {ShopContext} from '../Context/ShopContext';
import { useParams } from "react-router-dom";
import {ProductHd} from '../Components/ProductHd'
import {ProductDisplay} from '../Components/ProductDisplay'
import {ProductDescription} from '../Components/ProductDescription.jsx'
import { RelatedProducts } from "../Components/RelatedProducts.jsx";
export const Product = () => {
  const {all_products}=useContext(ShopContext);
  const {productId}=useParams();
  const product=all_products.find((e)=> e.id===Number(productId));
  if(!product){
    return <div>Product not found!</div>
  }
  return (
    <section className="max_padd_container py-28">
      <div>
        <ProductHd product={product}></ProductHd>
        <ProductDisplay product={product}></ProductDisplay>
        <ProductDescription product={product}/>
        <RelatedProducts product={product}/>
      </div>
    </section>
  )
}
