import "./style.scss";
import { useNavigate } from "react-router-dom";

export const SweetSpace = ({image, title, href}) => {
    const navigate = useNavigate()
  return (
    <div className="one-category" onClick={() => navigate(href)}>
      <div className="image-block">
        <img src={image} alt="img" />
      </div>
      <div className="title-block">{title}</div>
    </div>
  );
};
