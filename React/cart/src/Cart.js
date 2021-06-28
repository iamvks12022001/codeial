import React from 'react';
import CartItems from './CartItem';
const Cart = (props) => {


    const { products } = props;
    return (
        <div className="cart">
            {

                products.map((product) => {
                    return (

                        <CartItems
                            product={product}
                            key={product.id}
                            onIncreaseQuantity={props.onIncreaseQuantity}
                            onDecreaseQuantity={props.onDecreaseQuantity}
                            onDeleteItem={props.onDeleteItem}
                        />
                    )
                })
            }

        </div>
    );


}

export default Cart;