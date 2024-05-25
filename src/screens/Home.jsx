import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';


export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/foodData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setFoodCat(data[1]);
            setFoodItem(data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div id="carouselExampleIndicators" className="carousel slide" style={{ objectFit: "contain !important" }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" id='carousel'>
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                            {/*<button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>*/}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/2500x700/?fast food" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/2500x700/?fried rice" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/2500x700/?salad" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
                {foodCat && foodCat.length > 0 ? (
                    foodCat.map((category, categoryIndex) => (
                        <div key={categoryIndex} className='row mb-3'>
                            <div className='fs-3 m-3'>
                                <div>{category.CategoryName}</div>
                            </div>
                            <hr />
                            {foodItem && foodItem.length > 0 ? (
                                foodItem
                                    .filter(item => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                    .map(filteredItem => (
                                        <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                                            <Cards
                                                foodItem={filteredItem}
                                                options={filteredItem.options[0]}
                                                
                                            />
                                        </div>
                                    ))
                            ) : (
                                <div>No food items available</div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No food categories available</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
