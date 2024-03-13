import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext(null)

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const addToCart = (item) => {
        const isItemInCart = cart.find((cartItem) => cartItem.id === item.id);
        if (isItemInCart) {
            setCart(
                cart.map((cartItem) => 
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem 
                )
            );
        } else {
            setCart([...cart, { ...item, quantity: 1 }]); 
        }
    };
    /* const addProductCart = (item) => {
        const isItemInCart = cart.findIndex((item) => item.id === product.id);
        if (index == -1) {
            const newProduct = {
                ...product,
                quantity,
                subTotal: product.price * quantity,
            };
            setCart([...cart, newProduct]);
        } else {
            const cartCopy = [...cart];
            cartCopy[index].quantity += quantity
            cartCopy[index].subTotal = cartCopy[index].price * cartCopy[index].quantity;
            setCart(cartCopy);
        }
    }; */
    const removeProduct = (item) => {
        const isItemInCart = cart.find((cartItem) => cartItem.id === item.id);
if (isItemInCart.quantity === 1){
        setCart(cartItems.filter(product => product.id !== id))
} else{ 
    setCart(cartItem.map((cartItem) =>
    cartItem.id === item.id
    ?{...cartItem, quantity: cartItem.quantity -1 }
    :cartItem
    ))
}

        const productsFilter = cartItems.filter(product => product.id !== id);
        setCart(productsFilter);}
    const handleTotal = () => {
        const totalItems = cart.reduce((acum, item) => acum + item.subTotal, 0);
        setTotal(totalItems);
    }

    const handleTotalProducts = () => {
        const items = cart.reduce((acum, item) => acum + item.quantity, 0);
        setTotalProducts(items);
    }

    useEffect(() => {
        handleTotal()
        handleTotalProducts()

    }, [cart])


    const objectValue = {
        cart,
        total,
        totalProducts,
        addToCart,
        removeProduct
    };

    return <CartContext.Provider value={objectValue}> {children} </CartContext.Provider>;
};
export const useCart = () => {
    return useContext(CartContext)
}