
import './App.css';
import Home from './screens/Home';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import OrderHistory from './screens/OrderHistory';

function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/createuser" element={<Signup/>}/>
          <Route exact path="/orderHistory" element={<OrderHistory/>}/>

        </Routes>
      </div>
    </Router>

    
    </CartProvider>
  );
}

export default App;
