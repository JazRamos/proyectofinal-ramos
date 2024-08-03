import { useState } from "react";
import { useCart } from "../../Context/CartContext";

const CheckoutOrder = ({ onConfirm }) => {
    const [nombre, setNombre] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const { cart } = useCart()

    const handleConfirmation = (event) => {
        event.preventdefault()
        const userData = {
            nombre, phone, email
        }
        onConfirm(userData);

    }

    return (<>
        <div className="container-form">
            <h2>Datos de compra </h2>
            <form onSubmit={handleConfirmation}>

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
                    <button type="submit" className="btn btn-outline-success align-center">Generar orden</button>
                </div>
            </form>

        </div>

    </>
    )
}

export default CheckoutOrder