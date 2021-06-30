import React  from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from "firebase/app";
class App  extends React.Component {
  constructor(){
    super();
    this.state={
       products:[],
       loading:true
    }  
}
componentDidMount(){
  // firebase.firestore().collection('products').get().then((snapshot)=>{
  // console.log(snapshot);
  // snapshot.docs.map((doc)=>{
  //   console.log(doc.data())
  // });
  // const products=snapshot.docs.map((doc)=>{
   
  //  const data=doc.data();
  //   data['id']=doc.id;
  //   return data;
  // })
  // this.setState({
  //   products:products,
  //   loading :false
  // })
  // })

  //adding listiners 

  firebase.firestore().collection('products').onSnapshot((snapshot)=>{
    console.log(snapshot);
    snapshot.docs.map((doc)=>{
    console.log(doc.data())
  });
  const products=snapshot.docs.map((doc)=>{
   
   const data=doc.data();
    data['id']=doc.id;
    return data;
  })
  this.setState({
    products:products,
    loading :false
  })
  })
      
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
   if(products[index].qty===0)
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
  const {products,loading}=this.state;
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
     {loading && <h1>Loading Products</h1>}  
     {/* conditional rendering */}
     <div style={{fontSize:20, padding:10}}>
       TOTAL: {this.getCartTotal()}
     </div>
    </div>
    
  );
}
}

export default App;
