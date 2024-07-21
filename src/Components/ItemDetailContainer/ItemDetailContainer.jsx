import { useEffect } from "react";
import { useState } from "react";
import { db } from "../../services/firebase/firebaseConfig";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";


export const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

    useEffect(() => {
        setLoading(true)
        const prodDoc = doc(db, 'products', id)
        getDoc(prodDoc)
            .then(queryDocumentSnapshot => {
                const field = queryDocumentSnapshot.data()
                const prodSingle = { id: queryDocumentSnapshot.id, ...field }
                setProduct(prodSingle)
            })

            .catch((error) => alert('error'))
            .finally(() => { 
                setLoading(false)
            })
}, [id])

return (
    <div>
        {product && <ItemDetail {...product} />}
    </div>
)
}
