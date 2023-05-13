import React, { useState, useEffect, useMemo } from 'react';
import bag from './bag.png';
import googlePixel from './googlePixel.jpg';
import samsungS7 from './samsungS7.png';
import xiaomi from './xiaomi.png';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setItems([
        { id: 1, name: 'Google Pixel', price: 499.99, image: googlePixel, quantity: 0 },
        { id: 2, name: 'Xiaomi Redmi Note 2', price: 699.99, image: xiaomi, quantity: 0 },
        { id: 3, name: 'Samsung Galaxy S7', price: 599.99, image: samsungS7, quantity: 0 },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  const ItemList = ({ items }) => {
    return (
      <div>
        {items.map((item) => (
          <div key={item.id} className="item">
            <div className="left">
              <img src={item.image}/>
              <div className="naice">
                <div id="name">{item.name}</div>
                <div id="pric">${item.price}</div>  
                <button id="rem" onClick={()=> handleRemove(item.id)}>remove</button>
              </div> 
            </div>
            <div className="right">
              <button id="up" onClick={()=> handleIncrement(item.id)}>^</button>
              <div id="quant">{item.quantity}</div>
              <button id="down" onClick={()=> handleDecrement(item.id)}>v</button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleIncrement = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      )
    );
  };

  const handleRemove = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  const total = () => {
    return items.reduce((total, item)=>{
      return total+item.quantity;
    },0);
  }

  const handleClearCart = () => {
    setItems([]);
  };

  const memoizedItems = useMemo(() => items, [items]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='header'>
        <h2>Cart App</h2>
        <div className="him">
          <img src={bag} id="bag" alt="bbg"/>
          <div id="amount">{total()}</div>
        </div>
      </div>

      <div className="container">
        <h1>YOUR BAG</h1>
        {items.length === 0 ? (
        <center><p>is currently empty</p></center>
        ) : (
        <div>
          <ItemList items={memoizedItems} />
          <div id="line"></div>
          <div className="total">
            <p>Total</p>
            <p>${calculateTotal()}</p>
          </div>
          <center><button id="clear" onClick={handleClearCart}>CLEAR CART</button></center>
      </div>
      )}
      </div>
      
      
    </div>
  );
};

export default App;
