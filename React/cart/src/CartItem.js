import React from 'react';

class CartItem extends React.Component{
   
  
    increaseQuantity=()=>{
      

    this.setState((prevState)=>{
            return{
                  qty:prevState.qty+1
            }
    },()=>{
        console.log('new state: ',this.state);
    });
   
   }
decreaseQuantity=()=>{
        const {qty}=this.state;
        if(qty==0)
        {
            return;
        }
            //console.log("qty dec by 1 ", this.state);

            this.setState((prevState)=>{
                return{
                    qty:prevState.qty-1
                }
        },()=>{
            console.log('new state: ',this.state);
        });

   }

    render(){
       console.log("this.props ",this.props);
        const{price,title,qty}=this.props.product; //props is basically argument that
        // has been pass while calling this file cartitems

        return(
           <div className='cart-item'>
               {/* {this.props.jsx} */}
               <div className='left-block'>
                   <img style={styles.image}/>

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
                     onClick={this.increaseQuantity}
                     />

                    <img alt="decrease"
                     className="action-icons" 
                     src="https://image.flaticon.com/icons/png/512/992/992683.png"
                     onClick={this.decreaseQuantity}
                     />

                    <img alt="delete" 
                    className="action-icons" 
                    src="https://t4.ftcdn.net/jpg/00/98/26/11/240_F_98261175_Sv69O3rZsHApYkjAdrWbgQixYHwyZyOr.jpg"/>

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