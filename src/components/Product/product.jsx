import "./style.scss";
import { useNavigate } from "react-router-dom";

export const Product = ({navigat, image, price, title}) => {
  const navigate = useNavigate()
  return (
    <div className="product" onClick={()=> navigate(`/categories/${navigat}`)}>
      <div
        className="product-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="product-info">
        <p className="product-info-price">{price} $</p>
        <p className="product-info-title">{title}</p>
      </div>
    </div>
  );
};
