
import './App.css';

import { Routes, Route } from 'react-router-dom';
import ProductList from "./pages/ProductList";
import ProductAdd from "./pages/ProductAdd";

function App() {
    return (
        <div className="p-5">
            <Routes>
                <Route exact path="/" element={ <ProductList /> } />
                <Route exact path="/addproduct" element={ <ProductAdd /> } />
            </Routes>
        </div>
    );
}

export default App;

