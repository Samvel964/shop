import "./style.scss";
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../../../api/categories";
import { getAllProducts } from "../../../../api/products";
import { setLoader } from "../../../../features/loaderSlice";
import { useDispatch } from "react-redux";

export const ProductSpecifically = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(setLoader({ showloader: true }));

    getAllCategories().then((res) => {
      setCategories(res.data.categories);
    });

    getAllProducts().then((res) => {
      setProducts(res.data.products);
      dispatch(setLoader({ showloader: false }));
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div className="product-sp container mt-5">
      <div className="row">
        <div className="select-categories col-md-3">
          {categories?.map(category => {
            return (
              <>
              {!category.parent_id 
              ?
              <p className="main-category">{category.title}</p> 
              : 
              <p onClick={() => navigate(`/categories/${category.id}/product-sp`)} 
              className="sub-category">{category.title} <span>&#62;</span></p>}
              </>
            )
          })}
        </div>
        <div className="product-sp-content col-md-9">
          {products
            .filter((product) => product.category_id === +id)
            .map((product) => {
              return(
                <div className="product" onClick={() => navigate(`/products/${product.id}`)}>
                  <div className="product-image" 
                  style={{backgroundImage: `url(${product.main_image})`}}></div>
                  <div className="product-information">
                    <p className="product-information-price">{product.price}</p>
                    <p className="product-information-title">{product.title}</p>
                    <p className="product-information-data">{product.created_at.substring(0,11)}</p>
                  </div>                  
                </div>
              )
            })}
        </div>
      </div>
    </div>
  );
};
