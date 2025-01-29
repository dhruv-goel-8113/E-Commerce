import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import {Home} from './pages/Home'
import {Category} from './pages/Category'
import {Product} from './pages/Product'
import {Cart} from './pages/Cart'
import {Login} from './pages/Login'
import bannerwomens from './assets/bannerwomens.png'
import bannermens from './assets/bannermens.png'
import bannerkids from './assets/bannerkids.png'
import { ForgotPassword } from "./pages/ForgotPassword";
export default function App() {
  return (
    <main className="bg-primary text-tertiary">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/mens' element={<Category category="men" banner={bannermens}/>}></Route>
        <Route path='/womens' element={<Category category="women" banner={bannerwomens}/>}></Route>
        <Route path='/kids' element={<Category category="kid" banner={bannerkids}/>}></Route>
        <Route path='/product' element={<Product/>}>
        <Route path=':productId' element={<Product/>}></Route>
        </Route>
        <Route path='/cart-page' element={<Cart/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
      </Routes>
      <Footer></Footer>
      </BrowserRouter>
    </main>
  )
}