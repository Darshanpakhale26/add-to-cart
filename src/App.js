import React, { useState } from 'react'
import Navbar from './components/NavBar'
import Shop from './components/Shop'
import './App.css';
import Cart from './components/Cart';

const App = () => {

  const [cart,setCart] = useState([]);     // cart is an array of objects
  const [warning,setWarning] = useState(false);     // warning is a boolean
  const[show,setShow] = useState(true);        // show is a boolean

  const handleClick=(item) =>{
    let isPresent = false;
    cart.forEach((product) =>{
      if(item.id === product.id)
      isPresent= true;                    // checking if item is already present in cart
    })

    if(isPresent){
      setWarning(true);
      setTimeout(()=>{
        setWarning(false);
      },2000);
      return;
    }                                   // if item is already present in cart then it will show warning
    setCart([...cart,item]);
  }

  const handleChange = (item,d) => {
    let ind = -1;
    cart.forEach((data,index) => {
      if(data.id === item.id)         // checking the index of item in cart
      ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount +=d;
    console.log(tempArr);

    if(tempArr[ind].amount === 0){
      tempArr[ind].amount =1;
      
    }
    setCart([...tempArr])
  }

  return (
    <div>
      <Navbar size={cart.length} setShow={setShow}/>
      {
        show ? <Shop handleClick={handleClick} /> : <Cart cart={cart} setCart={setCart} handleChange={handleChange}/>
      }
      
      {
        warning && <div className='warning'> Item is already in your cart </div>
      }
    </div>
  )
}

export default App