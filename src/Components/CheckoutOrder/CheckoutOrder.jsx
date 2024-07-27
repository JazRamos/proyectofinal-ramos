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
        <div className="container">
            <form onSubmit={handleConfirmation}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        className="input"
                        placeholder="Nombre"
                        onChange={( target ) => setName(target.value)}> </input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                        type="text"
                        value={phone}
                        className="input"
                        placeholder="Teléfono"
                        onChange={( target ) => setPhone(target.value)}> </input>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Email</label>
                    <input
                        type="text"
                        value={email}
                        className="input"
                        placeholder="Email"
                        onChange={( target ) => setEmail(target.value)}> </input>

                </div>
            </form>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-outline-success align-center">Generar orden</button>
            </div>
        </div>
    </>
    )
}
export default CheckoutOrder