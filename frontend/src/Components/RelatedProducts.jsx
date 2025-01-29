import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext.jsx';
import { Item } from './Item.jsx';

export const RelatedProducts = (props) => {
  const { product } = props;
  const { all_products } = useContext(ShopContext);

  // Filter products that belong to the same category and limit to the first 4
  const relatedProducts = all_products
    .filter((item) => item.category === product.category && item.id!==product.id)
    .slice(0, 4);

  return (
    <section className='bg-primary'>
      <div className='max_padd_container py-12 xl:w-[88%]'>
        <h3 className='h3 text-center'>Related Products</h3>
        <hr className='h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16' />
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
          {relatedProducts.length > 0 ? (
            relatedProducts.map((item) => (
              <Item key={item.id} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}></Item>
            ))
          ) : (
            <p className='text-center col-span-full'>No related products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};
