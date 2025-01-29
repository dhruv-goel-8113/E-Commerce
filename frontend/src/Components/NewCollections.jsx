import {useState,useEffect} from 'react'
import {Item} from './Item.jsx'
export const NewCollections = () => {
  const [new_collection,setNew_collection]=useState([]);

  useEffect(()=>{
    fetch(`${process.env.VITE_API_BASE_URL}/newcollection`).then((response)=>response.json()).then((data)=>setNew_collection(data));
  },[])
  return (
    <section className='bg-primary'>
    <div className='max_padd_container py-12 xl:py-28 xl:w-[88%]'>
        <h3 className='h3 text-center'>Latest Products</h3>
        <hr className='h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16'/>
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
            {new_collection.map((item)=>(
                <Item key={item.id} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}></Item>
            ))}
        </div>
    </div>
</section>
  )
}
