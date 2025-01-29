import {useState,useEffect} from 'react'
import {Item} from './Item.jsx'
export const Popular = () => {
  const [popular_product,setPopular_product]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:4000/popular").then((response)=>response.json()).then((data)=>setPopular_product(data));
  },[])
  return (
    <section className='bg-primary'>
        <div className='max_padd_container py-12 xl:py-28 xl:w-[88%]'>
            <h3 className='h3 text-center'>Popular Products</h3>
            <hr className='h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16'/>
            <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                {popular_product.map((item)=>(
                    <Item key={item.id} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}></Item>
                ))}
            </div>
        </div>
    </section>
  )
}
