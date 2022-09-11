import "./style.scss";
import { getAllCategories } from "../../../api/categories";
import { getAllProducts } from "../../../api/products";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../features/loaderSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(setLoader({ showloader: true }));

    getAllCategories().then((res) => {
      setCategories(res.data.categories);
      dispatch(setLoader({ showloader: false }));
    });

    getAllProducts().then((res) => {
      setProducts(res.data.products);
      dispatch(setLoader({ showloader: false }));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="home container">
      <div className="main-categories">
        {categories
          .filter((category) => !category.parent_id)
          .map((category) => {
            return (
              <div
                className="one-category"
                key={category.id + category.title}
                onClick={() => navigate(`/categories/${category.id}`)}
              >
                <div className="image-block">
                  <img src={category.image} alt="img" />
                </div>
                <div className="title-block">{category.title}</div>
              </div>
            );
          })}
      </div>
      {categories
        .filter((category) => category.parent_id)
        .map((category) => {
          return (
            <div key={category.id + category.title + "index"}>
              <div
                className="sub-category-title"
                onClick={() => navigate(`/categories/${category.id}/product-sp`)}
              >
                {category.title} <span>&#62;</span>
              </div>
              <div className="sub-category-products">
                {products
                  .filter((product) => product.category_id === category.id)
                  .slice(0,5)
                  .map((product) => {
                    return (
                      <div 
                      className='product' 
                      key={product.id + category.id}
                      onClick={() => navigate(`/products/${product.id}`)}
                      >
                        <div className="product-image" style={{backgroundImage: `url(${product.main_image})`}}></div>
                        <div className="product-info">
                            <p className="product-info-price">{product.price} $</p>
                            <p className="product-info-title">{product.title}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );
};
