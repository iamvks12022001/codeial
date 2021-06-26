import React from 'react';
import reactDom from 'react-dom';
class CartItem extends React.Component{
    render(){
        return(
           <div className='cart-item'>
               <div className='left-block'>
                   <img style={styles.image}/>

               </div>
               <div className='right-block'>
                   <div style={{fontSize:25}}>Phone</div>  {/*inline styling*/}
                   <div style={{color:'#777'}}>Rs 999</div>
                   <div style={{color:'#777'}}>Qty:4</div>
                   <div className='cart-item-actions'>
                    {/* Buttons */}  
                   </div>
               </div>
           </div>
        );
    }
}

//styling the cartitem by object

const styles={
    image:{
        height:100,
        width:110,
        borderRadius:4,
        background:'#ccc'
    }
}
export default CartItem;