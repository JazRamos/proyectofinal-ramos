import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { db } from "../../services/firebase/firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";


export const ItemListContainer = ({ greeting }) => {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    const prodCollection = category
      ? query(collection(db, 'products'), where('category', '==', category))
      : collection(db, 'products')

    getDocs(prodCollection)
      .then(querySnapshot => {
        const prodList = querySnapshot.docs.map(doc => {
          const fields = doc.data()
          return { id: doc.id, ...fields }
        })
        setProducts(prodList)
      })

      .catch((error) => alert('error'))
      .finally(() => {
        setLoading(false)
      })
  }, [category])

  return (
    <>
      <div> {greeting} </div>
      {isLoading ? <div className="fs-3 text-center p-3"> Cargando productos, gracias por la paciencia :)
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
          </div>
        </div> </div> : <ItemList products={products} />}
     
    </>
  );
};
