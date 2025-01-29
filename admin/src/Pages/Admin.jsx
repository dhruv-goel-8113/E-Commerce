import { AddProduct } from '../Components/AddProduct.jsx'
import { ListProduct } from '../Components/ListProduct.jsx'
import {Sidebar} from '../Components/Sidebar.jsx'
import {Routes,Route} from 'react-router-dom'
export const Admin = () => {
  return (
    <div className='lg:flex'>
        <Sidebar />
        <Routes>
            <Route path='/addproduct' element={<AddProduct />}></Route>
            <Route path='/listproduct' element={<ListProduct />}></Route>
        </Routes>
    </div>
  )
}
