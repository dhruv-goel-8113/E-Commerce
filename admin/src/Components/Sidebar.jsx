import { Link } from "react-router-dom";
import addproduct from '../assets/addproduct.png'
import productlist from '../assets/productlist.png'

export const Sidebar = () => {
  return (
    <div className="py-7 flex justify-center gap-x-2 gap-y-5 w-full bg-white sm:gap-x-4 lg:flex-col lg:pt-20 lg:max-w-60 lg:h-screen lg:justify-start lg:pl-6">
        <Link to={'/addproduct'}>
        <button className="flexCenter gap-2 rounded-md bg-primary h-14 w-40 xs:w-44 medium-16">
        <img src={addproduct} alt="" height={55} width={55}/>
        <span>Add Product</span>
        </button>
        </Link>
        <Link to={'/listproduct'}>
        <button className="flexCenter gap-2 rounded-md bg-primary h-14 w-40 xs:w-44 medium-16">
        <img src={productlist} alt="" height={55} width={55}/>
        <span>Product List</span>
        </button>
        </Link>
    </div>
  )
}
