import React from 'react';
import CartItems from './CartItem';
class Cart extends React.Component{

    constructor(){
        super();
        this.state={
           products:[
            { price:95,
            title:'watch',
            qty:7,
            img:'',
            id:1
            },
            { price:9456,
                title:'Mobile Phone',
                qty:1,
                img:'',
                id:2
            },
            { price:857,
                title:'Bag',
                qty:16,
                img:'',
                id:3
            }
          ]
        }
        
    }
    render(){
      const {products}=this.state;
        return(
        <div className="cart">
            {
                products.map((product)=>{
                    return (
                    <CartItems 
                        product={product} 
                        key={product.id} 
                        // func={()=>console.log("asd")}  //basically we can pass many things as props
                        // jsx={<h1>Test</h1>}
                        />
                        ) //passing the props
                    //basically we are calling cart items by calling products,id etc
                    //as argument;
                    //key is passed so to differenciate each object that has been passed
                })
            }
  
        </div>
        );
    }

}

export default Cart;