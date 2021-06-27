import React from 'react';
import CartItems from './CartItem';
class Cart extends React.Component{

    render(){
        return(
        <div className="cart">
            <CartItems/>
            <CartItems/>
            <CartItems/>
            
        </div>
        );
    }

}

export default Cart;