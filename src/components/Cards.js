import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Cards(props) {
    const dispatch = useDispatchCart();
    const data = useCart() || []; // Ensure data is at least an empty array
    const priceRef = useRef();
    const [size, setSize] = useState("");
    const [qty, setQty] = useState(1);

    const options = props.options || {};
    const priceOptions = Object.keys(options);
    let finalPrice = qty * parseInt(options[size] || 0);

    const handleAddToCart = async () => {
        let food = [];
        for (const item of data){
            if(item.id===props.foodItem._id){
                food=item;
                break;
            }
        }

        if (food) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
            } else {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
            }
        } else {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        }
    };

    useEffect(() => {
        if (priceRef.current) {
            setSize(priceRef.current.value);
        }
    }, [priceOptions]);

    return (
        <div>
            <div className="card" style={{ width: '18rem', maxHeight: '360px', margin: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px', overflow: 'hidden' }}>
                <img
                    src={props.foodItem.img}
                    className="card-img-top"
                    alt="Food Item"
                    style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name || 'Food Item'}</h5>
                    <p className="card-text">Delicious and tasty food item to satisfy your cravings.</p>
                    <div className='container w-100'>
                        <div className="d-flex justify-content-between align-items-center">
                            <select className='m-2 h-100 bg-success text-white' onChange={(e) => setQty(e.target.value)}>
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <select className='m-2 h-100 bg-success text-white rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.length > 0 ? (
                                    priceOptions.map(data => (
                                        <option key={data} value={data}>
                                            {data}
                                        </option>
                                    ))
                                ) : (
                                    <option value="default">No options available</option>
                                )}
                            </select>
                            <div className='d-inline h-100 fs-5'>Rs. {finalPrice}/-</div>
                        </div>
                        <button className="btn btn-primary" onClick={handleAddToCart} style={{ backgroundColor: '#007bff', borderColor: '#007bff', fontWeight: 'bold' }}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
