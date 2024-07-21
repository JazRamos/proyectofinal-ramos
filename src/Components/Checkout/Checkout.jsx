import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
<<<<<<< HEAD
import { db } from "../../services/firebase/firebaseConfig";
export const Checkout = ({ children }) =>{
   
        const [products, setProducts] = useState([]);
        const [product, setProduct] = useState(null);
        const [isLoading, setIsLoading] = useState(true);

        const getProductsDB = (category) => {
            const myProducts = category
                ? query(collection(db, "products"), where("category", "==", category))
                : query(collection(db, "products"));
            getDocs(myProducts).then((resp) => {
                if (resp.size === 0) {
                    console.log("No hay productos en la base de datos");
                }
                const productList = resp.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setProducts(productList);
                setIsLoading(false);
            });
        };

        const getProductById = (id) => {
            const productRef = doc(db, "products", id);
            getDoc(productRef).then((resp) => {
                if (resp.exists()) {
                    const prod = {
                        id: resp.id,
                        ...resp.data(),
                    };
                    setProduct(prod);
                }
            });
        };

        const discountStock = async (product) => {
            const productRef = doc(db, "products", product.id);
            const newStock = product.stock - 1;
            await updateDoc(productRef, { stock: newStock })

        }

        const addOrderDB = () => {
            const newOrder = {
                buyer: grsza,
                items: dseg,
                total
            }
            console.log(newOrder)
            addDoc(collection(db, "orders"), newOrder);
        }

        const objetValue = {
            products,
            product,
            isLoading,
            getProductsDB,
            getProductById,
            discountStock,
            addOrderDB
        };

        return <FirebaseContext.Provider value={objetValue}> {children} </FirebaseContext.Provider>;
    };

    
=======
import { CartContext } from "../../Context/CartContext";
import { db } from "../../services/firebase/firebaseConfig";
import { useCart } from "../../Context/CartContext";
export const Checkout = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { cart, total } = useCart()
    const getProductsDB = (category) => {
        const myProducts = category
            ? query(collection(db, "products"), where("category", "==", category))
            : query(collection(db, "products"));
        getDocs(myProducts).then((resp) => {
            if (resp.size === 0) {
                alert("No hay productos en la base de datos");
            }
            const productList = resp.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setProducts(productList);
            setIsLoading(false);
        });
    };

    const getProductById = (id) => {
        const productRefe = doc(db, "products", id);
        getDoc(productRefe).then((resp) => {
            if (resp.exists()) {
                const prod = {
                    id: resp.id,
                    ...resp.data(),
                };
                setProduct(prod);
            }
        });
    };

    const discountStock = async (product) => {
        const productRefer = doc(db, "products", product.id);
        const newStock = product.stock - 1;
        await updateDoc(productRefer, { stock: newStock })

    }

    const addOrderDB = () => {
        const newOrder = {
            buyer: {
                name: 'Jazmin',
                email: 'jaz@hotmail.com',
                phone: '92837012'
            },
            items: cart,
            total

        }  
        console.log(newOrder)
        alert(`Gracias por su compra de: ${newOrder}`)
        addDoc(collection(db, "orders"), newOrder);
      
       
      
    }

    const objectValue = {
        products,
        product,
        isLoading,
        getProductsDB,
        getProductById,
        discountStock,
        addOrderDB
    };


    return (
        <>
            <CartContext.Provider value={objectValue}> {children} </CartContext.Provider>;
            <h1>CHECKOUT</h1>
            <button className="btn btn-outline-success mx-2" onClick={addOrderDB}>Generar orden</button>
            
            
        </>)
};


>>>>>>> 8d4d7a2d9bc42477a13609627b3abe7cf4886409

