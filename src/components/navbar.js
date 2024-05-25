import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function Navbar() {
    const [cartView, setCartView] = useState(false)
    const navigate= useNavigate();
    
    let data = useCart();
    const handleLogout=()=>{
        localStorage.removeItem("authToken");
        navigate("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link
                        className="navbar-brand fs-3"
                        to="/"
                        style={{
                            fontFamily: 'YourDesiredFont', // Replace with the desired font family
                            color: '#fff', // Replace with the desired text color
                            textDecoration: 'none', // Remove underline from the link
                            fontWeight: 'bold' // Set font weight to bold or adjust as needed
                        }}
                    >
                        FoodMall
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav me-auto mb-2">
                            <Link className="nav-link" aria-current="page" to="/">
                                Home
                            </Link>
                            {(localStorage.getItem("authToken")) ?
                            <Link className="nav-link" aria-current="page" to="/orderHistory">
                            My Orders
                        </Link>
                        : ""
                            }
                            

                        </div>
                        {(!localStorage.getItem("authToken")) ?
                        <div className='d-flex'>
                        <Link className="btn bg-white tet-success mx-1" to="/login">
                            Login
                        </Link>
                        <Link className="btn bg-white tet-success mx-1" to="/createuser">
                            Sign up
                        </Link>

                        </div>
                        : 
                        <div>
                        <div className="btn bg-white text-success mx-1" onClick={()=>{setCartView(true)}}>My Cart{" "}
                        <Badge pill bg='danger'>{data.length} </Badge>
                        </div>
                            {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                        <div className="btn bg-white text-danger mx-1" onClick={handleLogout}>Logout</div>
                        </div>
                        }
                    </div>

                </div>
            </nav>


        </div>

    )
}
