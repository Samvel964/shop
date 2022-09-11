import { Routes, Route } from "react-router-dom";
import { Main } from './layoutes/main/main';
import { Home } from './pages/main/Home';
import { Categories } from "./pages/dashboard/Categories";
import { Registration } from "./pages/main/Registration";
import { LogIn } from "./pages/main/LogIn";
import { DashboardLayout } from "./layoutes/dashboard/dashboard";
import { Products } from "./pages/dashboard/Products";
import { AddCategory } from "./pages/dashboard/Categories/AddCategory";
import { EditCategory } from "./pages/dashboard/Categories/EditCategory";
import { AddProduct } from "./pages/dashboard/Products/AddProduct/addProduct";
import { EditProduct } from "./pages/dashboard/Products/EditProduct";
import { ProductsCategories } from "./pages/main/Products/ProductsCategories/productsCategories";
import { ProductSpecifically } from "./pages/main/Products/ProductSpecifically/productSpecifically";
import { ProductItem } from "./pages/main/Products/ProductItem";
import { ProductsAll } from "./pages/main/Products/ProductsAll";
import { CategoriesShow } from "./pages/main/Categories/categories";
import { ErrorPage } from "./pages/main/Error";

export default function ProjectRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Main/>}>
                <Route path="/shop_project" element={<Home/>} />
                <Route path="/categories" element={<CategoriesShow/>} />
                <Route path="/categories/:id" element={<ProductsCategories />} />
                <Route path="/categories/:id/product-sp" element={<ProductSpecifically />} />
                <Route path="/products" element={<ProductsAll />} />
                <Route path="/products/:id" element={<ProductItem />} /> 
                <Route path="/registration" element={<Registration/>} />
                <Route path="/log-in" element={<LogIn/>} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout/>}>
                <Route path="/dashboard" element={<Home/>} />
                <Route path="/dashboard/categories" element={<Categories/>} />
                <Route path="/dashboard/categories/add-category" element={<AddCategory/>} />
                <Route path="/dashboard/categories/:id/edit" element={<EditCategory/>} />
                <Route path="/dashboard/products" element={<Products/>} />
                <Route path="/dashboard/products/add-product" element={<AddProduct/>} />
                <Route path="/dashboard/products/:id/edit" element={<EditProduct/>} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}
