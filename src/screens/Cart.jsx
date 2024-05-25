import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import TrashIcon from './TrashIcon';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    const handleCheckout = async () => {
        const userEmail = localStorage.getItem("userEmail");
    
        if (!userEmail) {
            console.error("User email not found in localStorage");
            return;
        }
    
        const payload = {
            email: userEmail,
            order_date: new Date().toISOString(),
            order_data: data,
        };
    
        console.log("Checkout request payload:", payload);
    
        try {
            const response = await fetch('http://localhost:5000/api/orderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                console.log("Checkout successful");
                dispatch({ type: 'DROP' });
            } else {
                const errorData = await response.json();
                console.error("Checkout failed:", errorData);
            }
        } catch (error) {
            console.error("Error during checkout:", error.message);
        }
    };
    

    if (!data || data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        );
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button
                                        type='button'
                                        className='btn p-0'
                                        onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                                        <TrashIcon width={24} height={24} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckout}>Check Out</button>
                </div>
            </div>
        </div>
    );
}
