import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import {Item} from '../Components/Item.jsx'
// import all_products from "../assets/all_products"
import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext.jsx"
export const Category = ({category,banner}) => {
  const {all_products}=useContext(ShopContext);
  return (
    <section className="max_padd_container py-16 xl:py-28">
      <div>
        <div>
          <img src={banner} alt="" className="block my-7 mx-auto"/>
        </div>
        <div className="flexBetween my-8 mx-2">
          <h5><span className="font-bold">Showing 1-12</span> out of 36 products</h5>
          <div className="flexBetween max-sm:p-3 gap-x-1 px-6 py-2 rounded-5xl ring-1 ring-slate-900/15">Sort by <MdOutlineKeyboardArrowDown></MdOutlineKeyboardArrowDown></div>
        </div>
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
          {all_products.map((item)=>{
            if(item.category===category){
              return <Item key={item.id} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}></Item>
            }
          })}
        </div>
        <div className="mt-16 text-center">
          <button className="btn_dark_rounded">Load more</button>
        </div>
      </div>
    </section>
  )
}
