import { addDoc, collection, getDocs, query, documentId, writeBatch, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../services/firebase/firebaseConfig";
import { useCart } from "../../Context/CartContext";


const Checkout = ({onConfirm}) => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [nombre, setNombre] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const { cart, total, clearCart } = useCart()

    const createOrder = async (nombre, phone, email) => {
        setLoading(true)
        try {
            const objOrder = {
                buyer: {
                    nombre, phone, email
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
                await batch.commit()
                const orderCollection = collection(db, 'orders', createOrder)
                const { id } = await addDoc(orderCollection, objOrder)
                setOrderId(id)
                clearCart()
            } else {
                alert('Hay productos sin stock disponible')
            }
        } catch (error) {
            alert('Hubo un error al crear la orden')
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
    const handleConfirmation = (event) => {
        event.preventdefault()
        const userData = {
            nombre, phone, email
        };
        onConfirm(userData);

    }

    

    return (
        <>
            <div className="text-center" ><h1>Checkout</h1></div>
            <div className="container-form">
                <h2>Datos de compra </h2>
                <form onSubmit={handleConfirmation.orderId}>

                    {
                        cart.map(item => (
                            <div key={item.id}>
                                <strong> {item.name} x {item.quantity} </strong>
                                <strong> {item.price} </strong>
                            </div>
                        ))
                    }
                    <div className="mb-3">
                        <input
                            type="text"
                            value={nombre}
                            placeholder="Nombre"
                            onChange={(event) => setNombre(event.target.value)} />
                    </div>
                    <div className="mb-3">

                        <input
                            type="text"
                            value={phone}
                            placeholder="Teléfono"
                            onChange={(event) => setPhone(event.target.value)} />
                    </div>
                    <div className="mb-3">

                        <input
                            type="text"
                            value={email}
                            placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="d-grid gap-2">
                        <button onClick={createOrder} type="submit" className="btn btn-outline-success align-center">Generar orden</button>
                    </div>
                </form>

            </div>
           




        </>
    )
}

export default Checkout
