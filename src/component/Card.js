import React from 'react';


const Card = (props) => {
    const { sc_sku, sc_name, sc_price, sc_attr } = props.product;
    const { index, checkedState, handler } = props;
    return (
        <label className="group relative rounded-md bg-gray-200">
            <input
                id={ `custom-checkbox-${ sc_sku }` }
                name={ sc_sku }
                value={ sc_sku }
                type="checkbox"
                checked={ checkedState[index] }
                className="delete-checkbox ml-4 mt-4"
                onChange={ (e) => handler(index, sc_sku, e) }
            />
            <div className="min-h-70 aspect-w-1 aspect-h-1 w-full group-hover:opacity-75 lg:aspect-none h-48 flex justify-center items-center">
                <div className="px-2">
                    <p className="text-center text-sm">{ sc_sku }</p>
                    <p className="text-center text-sm">{ sc_name }</p>
                    <p className="text-center text-sm">{ sc_price }</p>
                    <p className="text-center text-sm">{ sc_attr }</p>
                </div>
            </div>
        </label>
    )
}

export default Card