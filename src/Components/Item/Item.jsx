import { Link } from "react-router-dom";

export const Item = ({ id, name, img}) => {
    return (
        <div className="card-group">
                <div className="card text-center mb-3 " >
                    <div className="card-body ">
                        <img src={img} className="w-75 card-img-top" alt="" />
                        <h5 className="fw-bold">{name}</h5>
                        <Link to={`/item/${id}`}>
                            <button className="btn btn-outline-success">Detalles</button>
                        </Link>
                    </div>
                </div>
           
            </div>
           
       
    ); 
};
