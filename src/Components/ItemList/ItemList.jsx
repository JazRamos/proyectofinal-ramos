import { Item } from "../Item/Item";

export const ItemList = ({ products }) => {
    return (
        <>
            <div className=" row row-cols-4 p-3 gap-1">
                {products.map((product) => (
                    <Item key={product.id} {...product} />))}
            </div>
        </>
    );
};
