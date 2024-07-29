import { addDoc, collection, getDocs, query, documentId, writeBatch, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../services/firebase/firebaseConfig";
import { useCart } from "../../Context/CartContext";
import CheckoutOrder from "../CheckoutOrder/CheckoutOrder";


const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const { cart, total, clearCart } = useCart()

    const createOrder = async (name, phone, email) => {
        setLoading(true)
        try {
            const objOrder = {
                buyer: {
                   name, phone, email
                },
                items: cart,
                total
            }

            const batch = writeBatch(db)
            const outOfStock = []

            const ids = cart.map(prod => prod.id)
            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids))

            const querySnapshot = await getDocs(productsCollection)
            const { docs } = querySnapshot

            docs.forEach(doc => {
                const fields = doc.data()
                const stockDb = fields.stock
                const productsAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productsAddedToCart.quantity
                console.log(stockDb >= prodQuantity)
                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...fields })
                }
            })

            if (outOfStock.length === 0) {
                batch.commit()
                const orderCollection = collection(db, 'orders')
                const { id } = await addDoc(orderCollection, objOrder)
                setOrderId(id)
                clearCart()
            } else {
                alert('error', 'Hay productos sin stock disponible')
            }
        } catch (error) {
            alert('error', 'Hubo un error al crear la orden')
        } finally {
            setLoading(false)
        }

    }

    if (loading) {
        return <h1>Se esta generando su orden, aguarde por favor...</h1>
    }

    if (orderId) {
        return <h1>Gracias por su compra! El nro de su compra es: {orderId} </h1>
        

    }

    return (
        <>
            <p className= "text-center" ><h1>Checkout</h1></p>
             <CheckoutOrder onConfirm={createOrder}/>
        </>
    )
}

export default Checkout
