import React, { useContext } from "react";
import { useCart } from "../../Context/CartContext";
import { Link } from "react-router-dom";
const CartView = () => {
    const { cart, total, removeProduct } = useCart();

    return (
        <>
            <div className="table table-striped">
                
                    
                        {cart.map((item) => (
                        <div className="col mb-3" key={item.id} style={{ width: '50%', display: "flex",   }}>
                            <h5>{item.name}</h5>
                            <p className="fs-6">Precio Unitario: ${item.price}</p>
                            <p className="fs-6">Cantidad: {item.quantity}</p>
                            <p className="fs-6">Subtotal: ${item.quantity * item.price}</p>
                    
                            <button className="btn btn-outline-danger mx-2" onClick={() => removeProduct(item.id)}>Remover</button>

                            
                            <section>
                                <h5>Total ${total}</h5>
                            </section>
                        </div>
                    ))}
                
                
                <div><Link to='/checkout'>
                    <button className="btn btn-outline-success mx-2">Checkout</button></Link></div> 
            </div>
            

        </>
    )
}
export default CartView