
import Topbar from "./components/topbar/Topbar";
import "./App.css"
import ProductList from "./pages/productList/ProductList";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import AddProduct from "./pages/addProduct/AddProduct";
import UpdateProduct from "./pages/updateProduct/UpdateProduct";
import CategoryList from "./pages/categoryList/CategoryList";
import BrandList from "./pages/brandList/BrandList";
import ModelList from "./pages/modelList/ModelList";
import VariantList from "./pages/variantList/VariantList";
import CaracteristicList from "./pages/caracteristicList/CaracteristicList";


function App() {
  return (
    <Router >
      <Topbar/>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<ProductList/>} />  
          <Route exact path="/addProduct" element={<AddProduct/>} />
          <Route  path="/updateProduct" element={<UpdateProduct/>} />
          <Route exact path="/categoryList" element={<CategoryList/>} />
          <Route exact path="/brandList" element={<BrandList/>} />
          <Route exact path="/modelList" element={<ModelList/>} />
          <Route exact path="/variantList" element={<VariantList/>} />
          <Route exact path="/caractList" element={<CaracteristicList/>} />
          
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
