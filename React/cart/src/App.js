import React  from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
class App  extends React.Component {
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
getCartCount=()=>{
   const{products}=this.state;
   let count=0;
   products.forEach((product)=>{
     count+=product.qty;
   })
   return count;
}
render(){
  const {products}=this.state;
  return (

    <div className="App">
    <Navbar
    count={this.getCartCount()}//we are passing the value not the function so that why '()' is used
    //we called the getCartCount here and pass the value
    />
    {/* passing to navbar and cart.js as a props */}
     <Cart
     products={products} 
     onIncreaseQuantity={this.handleIncreaseQuantity}   
     onDecreaseQuantity={this.handleDecreaseQuantity}
     onDeleteItem={this.handleDeleteItem}/>
    </div>
  );
}
}

export default App;
