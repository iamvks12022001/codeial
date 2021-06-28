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
        img:'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        id:1
        },
        { price:9456,
            title:'Mobile Phone',
            qty:1,
            img:'https://images.unsplash.com/photo-1604474834292-8f0276a2065f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bW9iaWxlcGhvbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            id:2
        },
        { price:857,
            title:'Bag',
            qty:16,
            img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFnfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
   if(products[index].qty==0)
   {
     return;
   }
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
getCartTotal=()=>{
  const{products}=this.state;
   let total=0;
   products.forEach((product)=>{
     total+=(product.qty * product.price);
   })
   return total;
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
     <div style={{fontSize:20, padding:10}}>
       TOTAL: {this.getCartTotal()}
     </div>
    </div>
    
  );
}
}

export default App;
