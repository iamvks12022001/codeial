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
    handleIncreaseQuantity=(product)=>{
       console.log("this==>",this)
         console.log('heyy Please inc the qty of ',product);
        const {products}=this.state;
        const index=products.indexOf(product);
        products[index].qty+=1;
        this.setState({
            products:products
        })
    }
    handleDecreaseQuantity=(product)=>{
        console.log("this==>",this)
         console.log('heyy Please dec the qty of ',product);
        const {products}=this.state;
        const index=products.indexOf(product);
        products[index].qty-=1;
        this.setState({
            products:products
        })
    }
    handleDeleteItem=(product)=>{
        console.log("this==>",this)
         console.log('heyy Please delete the item  ',product);
         const{products}=this.state;
        
         const index=products.indexOf(product);
         products.splice(index,1);
         this.setState({
            products:products
        })
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
                        
                        onIncreaseQuantity={this.handleIncreaseQuantity}
                        // func={()=>console.log("asd")}  //basically we can pass many things as props
                        // jsx={<h1>Test</h1>}
                        onDecreaseQuantity={this.handleDecreaseQuantity}
                        onDeleteItem={this.handleDeleteItem}
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