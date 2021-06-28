import React from 'react';

const CartItem =(props)=>{
  //remove this in the function.
       console.log("this.props ",props);
        const{price,title,qty}=props.product; //props is basically argument that
        // has been pass while calling this file cartitems

        return(
           <div className='cart-item'>
               {/* {this.props.jsx} */}
               <div className='left-block'>
                   <img style={styles.image} src={props.product.img}/>

               </div>
               <div className='right-block'>
                   <div style={{fontSize:25}}>{title}</div>  {/*inline styling*/}
                   <div style={{color:'#777'}}>Rs: {price}</div>
                   <div style={{color:'#777'}}>Qty: {qty}</div>
                   <div className='cart-item-actions'>
                    {/* Buttons */}  
                    <img alt="increase" 
                     className="action-icons"
                     src="https://image.flaticon.com/icons/png/128/992/992651.png"
                     //if you not want to use arrow function
                   //  onClick={this.props.onIncreaseQuantity.bind(this,this.props.product)}
                   onClick={()=>props.onIncreaseQuantity(props.product)}
                     //by onclick i have to send the information of items that is clicked
                     />
        
                    <img alt="decrease"
                     className="action-icons" 
                     src="https://image.flaticon.com/icons/png/512/992/992683.png"
                     onClick={()=>props.onDecreaseQuantity(props.product)}
                     />

                    <img alt="delete" 
                    className="action-icons" 
                    src="https://t4.ftcdn.net/jpg/00/98/26/11/240_F_98261175_Sv69O3rZsHApYkjAdrWbgQixYHwyZyOr.jpg"
                    onClick={()=>props.onDeleteItem(props.product)}
                    />
                   </div>
               </div>
           </div>
        );
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