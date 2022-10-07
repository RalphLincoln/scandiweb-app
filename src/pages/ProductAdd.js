import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";

import axios from "axios";


const types = [
    "DVD",
    "Furniture",
    "Book"
]


const ProductAdd = () => {
    const navigate = useNavigate();

    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [selected, setSelected] = useState(types[0]);
    const [size, setSize] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [length, setLength] = useState("");
    const [weight, setWeigth] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [warning, setWarning] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    

    if (showWarning) {
        setTimeout(() => {
            setShowWarning(false)
        }, 3000)
    }

    if (showError) {
        setTimeout(() => {
            setShowError(false)
        }, 3000)
    }

    const submitProduct = (e) => {
        e.preventDefault();
        let attr = "";

        if (name.trim() === "") {
            setWarning("Please enter product name.")
            setShowWarning(true)
        } else if (sku.trim() === "") {
            setWarning("Please enter product sku.")
            setShowWarning(true)
        } else if (price.trim() === "") {
            setWarning("Please enter product price.")
            setShowWarning(true)
        } else if (selected === "Furniture" && height.trim() === "" && width.trim() === "" &&length.trim() === "") {
            setWarning("Please enter complete product dimension.")
            setShowWarning(true)
        } else if (selected === "Book" && weight.trim() === "") {
            setWarning("Please enter product weight.")
            setShowWarning(true)
        } else if (selected === "DVD" && size.trim() === "") {
            setWarning("Please enter product size.")
            setShowWarning(true)
        } else {
            //console.log("selected", selected);

            if (selected === "Furniture") {
                attr = `Dimension: ${ height }x${ width }x${ length }`;
            } else if (selected === "Book") {
                attr = `Weight: ${ weight }KG`;
            } else {
                attr = `Size: ${ size }MB`;
            }

            const headers = {
                "Content-Type": "application/json",
            }
            axios.post("https://scandiweb-restapi.herokuapp.com/api/create.php", {
                sc_sku: sku,
                sc_name: name,
                sc_price: `${ price } $`,
                sc_attr: attr
            }, { headers })
                .then(res => {
                    console.log(res.data)
                    navigate("/")
                })
                .catch(err => {
                    console.log(err.message)
                    setError(err.message)
                    setShowError(true)
                })
        }
    }

    return (
        <div className="h-screen relative">
            <div className='flex justify-between border-b-2 border-slate-500 py-1 md:py-2 px-3'>
                <h4 className="text-base md:text-xl lg:text-2xl font-bold p">Product Add</h4>
                <div className="flex justify-items-center">
                    <button onClick={ (e) => submitProduct(e) } className="mr-2 border-2 rounded shadow-md hover:shadow-lg">
                        <p className="mx-2 my-1 text-xs md:text-sm">Save</p>
                    </button>
                    <button onClick={ () => navigate(-1) } className="ml-2 border-2 rounded shadow-md hover:shadow-lg">
                        <p className="mx-2 my-1 text-xs md:text-sm">Cancel</p>
                    </button>
                </div>
            </div>

            <form id="product_form" className='mt-6 sm:w-9/12 md:w-8/12 lg:w-6/12 sm:px-3'>
                <div>
                    <div className="flex flex-row gap items-center mb-5 sm:mb-7">
                        <label className='basis-3/12 sm:basis-2/12 lg:basis-2/12 text-sm' htmlFor="sku">SKU</label>
                        <input id="sku" value={ sku } onChange={ e => setSku(e.target.value) } className="border basis-10/12 lg:basis-10/12 h-8 text-sm focus:border-indigo-500 focus:outline-none pl-3 pr-3 rounded-lg w-full" />
                    </div>

                    <div className="flex flex-row gap items-center mb-5 sm:mb-7">
                        <label className='basis-3/12 sm:basis-2/12 lg:basis-2/12 text-sm' htmlFor="sku">Name</label>
                        <input id="name" value={ name } onChange={ e => setName(e.target.value) } className="border basis-10/12 lg:basis-10/12 h-8 text-sm focus:border-indigo-500 focus:outline-none pl-3 pr-3 rounded-lg w-full" />
                    </div>

                    <div className="flex flex-row gap items-center mb-9 sm:mb-12">
                        <label className='basis-3/12 sm:basis-2/12 lg:basis-2/12 text-sm' htmlFor="sku">Price ($)</label>
                        <input id="price" value={ price } onChange={ e => setPrice(e.target.value) } className="border basis-10/12 lg:basis-10/12 h-8 text-sm focus:border-indigo-500 focus:outline-none pl-3 pr-3 rounded-lg w-full" />
                    </div>

                    <div className="flex flex-row gap items-center mb-5 sm:mb-7">
                        <label className='basis-4/12 sm:basis-3/12 text-sm' htmlFor="sku">Type Switcher</label>
                        <select id="productType" value={ selected } onChange={ (e) => setSelected(e.target.value)}
                                className="border basis-10/12 lg:basis-10/12 h-8 text-sm focus:border-indigo-500 focus:outline-none pl-3 pr-3 rounded-lg w-full">
                            <option id="DVD">DVD</option>
                            <option id="Furniture">Furniture</option>
                            <option id="Book">Book</option>
                        </select>
                        {/*<Listbox id="productType" className="w-full" onChange={setSelected}>
                            {({open}) => (
                                <div className="relative mt-1">
                                    <Listbox.Button
                                        className="w-full flex justify-between cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 text-left focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm">
                                        <span className="items-center">
                                            <span className="block truncate">{selected}</span>
                                        </span>
                                        <span className="pointer-events-none ml-3 flex items-center">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0">

                                        <Listbox.Options
                                            className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {
                                                types.map(tt => (
                                                    <Listbox.Option
                                                        key={tt}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                                            )
                                                        }
                                                        value={tt}>

                                                        {({selected, active}) => (
                                                            <>
                                                                <div className="flex items-center">
                                                                <span
                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                    {tt}
                                                                </span>
                                                                </div>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                        )}>
                                                                        <CheckIcon className="h-5 w-5"
                                                                                   aria-hidden="true"/>
                                                                </span>
                                                                ) : null}
                                                            </>
                                                        )}

                                                    </Listbox.Option>
                                                ))
                                            }
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            )}
                        </Listbox> */}
                    </div>


                    <div className="mt-9">
                        {
                            selected === "Furniture" ?
                                <div>
                                    <div id="Furniture" className="flex flex-row gap items-center mb-5 sm:mb-7">
                                        <label className='basis-4/12 sm:basis-3/12 text-sm' htmlFor="sku">Height (CM)</label>
                                        <input id="height" value={ height } onChange={ e => setHeight(e.target.value) } className="border basis-8/12 sm:basis-9/12 h-8 text-sm focus:border-indigo-500 focus:outline-none pl-3 pr-3 rounded-lg w-full" />
                                    </div>

                                    <div className="flex flex-row gap items-center mb-5 sm:mb-7">
                                        <label className='basis-4/12 sm:basis-3/12 text-sm' htmlFor="sku">Width (CM)</label>
                                        <input id="width" value={ width } onChange={ e => setWidth(e.target.value) } className="border basis-8/12 sm:basis-9/12 h-8 text-sm focus:border-indigo-500 focus:outline-none pl-3 pr-3 rounded-lg w-full" />
                                    </div>

                                    <div className="flex flex-row gap items-center mb-5 sm:mb-7">
                                        <label className='basis-4/12 sm:basis-3/12 text-sm' htmlFor="sku">Length (CM)</label>
                                        <input id="length" value={ length } onChange={ e => setLength(e.target.value) } className="border basis-8/12 sm:basis-9/12 h-8 text-sm focus:border-indigo-500 focus:outline-none pl-3 pr-3 rounded-lg w-full" />
                                    </div>

                                    <p className="text-xs">Please, provide dimensions in HxWxL.</p>
                                </div>
                                : selected === "Book" ?
                                    <div>
                                        <div id="Book" className="flex flex-row gap items-center mb-5 sm:mb-7">
                                            <label className='basis-3/12 sm:basis-2/12 lg:basis-2/12 text-sm' htmlFor="sku">Weight (KG)</label>
                                            <input id="weight" value={ weight } onChange={ e => setWeigth(e.target.value) } className="border basis-10/12 lg:basis-10/12 h-8 text-sm focus:border-indigo-500 focus:outline-none pl-3 pr-3 rounded-lg w-full" />
                                        </div>

                                        <p className="text-xs">Please, provide weight in KG.</p>
                                    </div>
                                    :
                                    <div>
                                        <div id="DVD" className="flex flex-row gap items-center mb-5 sm:mb-7">
                                            <label className='basis-3/12 sm:basis-2/12 lg:basis-2/12 text-sm' htmlFor="sku">Size (MB)</label>
                                            <input id="size" value={ size } onChange={ e => setSize(e.target.value) } className="border basis-10/12 lg:basis-10/12 h-8 text-sm focus:border-indigo-500 focus:outline-none pl-3 pr-3 rounded-lg w-full" />
                                        </div>

                                        <p className="text-xs">Please, provide size in MB.</p>
                                    </div>
                        }
                    </div>
                </div>
            </form>

            <div className="h-2 absolute left-0 right-0 bottom-28">
                {
                    showError && <div className="bg-red-600 mt-3 w-3/4 sm:w-1/4 mx-auto py-3 rounded-lg">
                        <p className="text-center text-xs text-white">{ error }</p>
                    </div>
                }

                {
                    showWarning && <div className="bg-yellow-600 mt-3 w-3/4 sm:w-1/4 mx-auto py-3 rounded-lg">
                        <p className="text-center text-xs text-black">{ warning }</p>
                    </div>
                }

                <hr className={ showError || showWarning ? "mt-3" : "mt-14" } />
                <p className="text-xs text-center mt-3">Scandiweb Test Assignment</p>
            </div>
        </div>
    )
}

export default ProductAdd;