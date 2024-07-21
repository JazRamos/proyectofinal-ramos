import { ItemCount } from "../ItemCount/ItemCount";
import { useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useCart } from "../../Context/CartContext";
export const ItemDetail = ({ id, description, price, stock, name, img }) => {
    const [quantity, setQuantity] = useState(0)
    const { addToCart } = useCart() 
    const honAdd = (quantity) => {
        const objProdAdd ={
            id, name, price, quantity
        }
        alert(`Se agregó ${quantity} ${name} al carrito`)
        addToCart(objProdAdd)
        setQuantity(quantity)
    }

    return (
        <div className="border m-2">
            <div className="card w-25 p-3" >
                <div className="card-body ">
                    <h5 className="card-title">{name}</h5>
                    <img src={img} className="card-img-top w-100" alt="" />
                    <p className="card-text"> {description} </p>
                    <p>Precio: {price} </p>
                    <ItemCount stock={stock} onAdd={honAdd} />
                </div>
            </div>
        </div>
    )

}
