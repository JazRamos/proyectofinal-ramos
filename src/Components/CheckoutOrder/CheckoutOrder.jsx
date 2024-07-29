import { useState } from "react";

const CheckoutOrder = ({ onConfirm }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleConfirmation = (event) => {
        event.preventdefault()
        const userData = {
            name, phone, email
        }
        onConfirm(userData);

    }

    return (<>
        <div className="container-form">
            <h2>Datos de compra </h2>
            <form onSubmit={handleConfirmation}>
                <div className="mb-3">

                    <input
                        type="text"
                        value={name}
                        placeholder="Nombre"
                        onChange={(event) => setName(event.target.value)} />
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