import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Card from "../component/Card";


const ProductList = ()  => {
    const [product, setProduct] = useState([])
    const [selected, setSelected] = useState([])
    const [checkDelete, setCheckDelete] = useState("");
    const navigate = useNavigate();
    const [checkedState, setCheckedState] = useState([]);

    useEffect(() => {
        axios.get("https://scandiweb-restapi.herokuapp.com/api/read.php")
            .then(res => {
                setProduct(res.data)
                setCheckedState(new Array(res.data.length).fill(false))
            })
            .catch(err => {
                console.error(err)
            })
    }, [checkDelete])

    const handleOnChange = (position, id) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
        if (updatedCheckedState[position]) {
            setSelected(oldArray => [...oldArray, id])
        } else {
            setSelected(oldArray => {
                return oldArray.filter((value, i) => value !== id)
            })
        }
    }

    const headers = {
        "Content-Type": "application/json",
    }

    const massDelete = () => {
        axios.post("https://scandiweb-restapi.herokuapp.com/api/delete.php", {
            selected }, { headers })
            .then(res => {
                console.log(res.data)
                setCheckDelete("delete");
            })
            .catch(err => {
                console.error(err)
            })
    }

    return (
        <div className="h-screen">
            <div className='flex justify-between border-b-2 border-slate-500 py-1 md:py-2 px-3'>
                <h4 className="text-base md:text-xl lg:text-2xl font-bold p">Product List</h4>
                <div className="flex justify-items-center">
                    <button onClick={ () => navigate("/addproduct") } className="mr-2 border-2 rounded shadow-md hover:shadow-lg">
                        <p className="mx-2 my-1 text-xs md:text-sm">ADD</p>
                    </button>
                    <button onClick={ () => massDelete() } id="delete-product-btn" className="ml-2 border-2 rounded shadow-md hover:shadow-lg">
                        <p className="mx-2 my-1 text-xs md:text-sm">MASS DELETE</p>
                    </button>
                </div>
            </div>

            <div className="py-6 px-3 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {
                    product.map((data, index) => {
                        return <Card
                            key={ data.sc_sku }
                            index={ index }
                            product={ data }
                            checkedState={ checkedState }
                            handler={ handleOnChange }
                        />
                    })
                }
            </div>
        </div>
    )
}

export default ProductList;