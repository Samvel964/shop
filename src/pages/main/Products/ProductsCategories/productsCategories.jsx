import "./style.scss";
import { getAllCategories } from "../../../../api/categories";
import { getAllProducts } from "../../../../api/products";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../../features/loaderSlice";
import { useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { SweetSpace } from "../../../../components/SweetSpace/index";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const ProductsCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [printProducts, setPrintProducts] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  useEffect(() => {
    dispatch(setLoader({ showloader: true }));

    getAllCategories().then((res) => {
      setCategories(res.data.categories);
      dispatch(setLoader({ showloader: false }));
    });

    getAllProducts().then((res) => {
      setProducts(res.data.products);
      setPrintProducts(
        res.data.products.filter(
          (products) => products.category.parent_id === +id
        )
      );
      dispatch(setLoader({ showloader: false }));
    });
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    productfilter();
    // eslint-disable-next-line
  }, [minPrice, maxPrice]);

  const productfilter = () => {
    let newProducts = [];

    newProducts = products.filter(product => {
      if (
        +id === product.category.parent_id &&
        product.price >= minPrice &&
        product.price <= maxPrice
      ) {
        return product;
      }
    });

    if (selectedCategories.length) {
      newProducts = products.filter((product) => {
        if (
          selectedCategories.includes(product.category_id) &&
          product.price >= minPrice &&
          product.price <= maxPrice
        ) {
          return product;
        }
      });
    }

    setPrintProducts(newProducts);
  };

  const checkboxChangeHandler = (id, e) => {

    if (e.target.checked) {
      selectedCategories.push(id);
    } else {
      selectedCategories.splice(selectedCategories.indexOf(id), 1);
    }

    setSelectedCategories([...selectedCategories]);

    productfilter();
  };

  const inputChangeHandler = (e) => {

    if (e.target.id === "minPrice") {
      setMinPrice(+e.target.value);

      if (e.target.value === "") {
        setMinPrice(0);
      }
    } else {
      setMaxPrice(+e.target.value);
      
      if (e.target.value === "") {
        setMaxPrice(1000000);
      }
    }

    productfilter();
  };

  return (
    <div className="productsCatgory container mt-5">
      <div className="main-categories">
        {categories
          ?.filter((category) => !category.parent_id)
          .map((category, index ) => {
            return (
              <SweetSpace
                image={category.image}
                title={category.title}
                href={`/categories/${category.id}`}
                key={category.id + index}
              />
            );
          })}
      </div>
      <div className="row">
        <div className="productsCatgory-filters col-md-3 ">
          <div className="filter-by-categories">
            {categories
              .filter((category) => category.parent_id === +id)
              .map((category) => {
                return (
                  <div className="filter-checkboxes" key={category.id + category.updated_at}>
                    <label>
                      <Checkbox
                        onChange={(e) => checkboxChangeHandler(category.id, e)}
                      />
                      {category.title}
                    </label>
                  </div>
                );
              })}
            <div className="filter-price">
              <input
                type="text"
                id="minPrice"
                placeholder="Min price"
                onChange={(e) => inputChangeHandler(e, id)}
              />
              <input
                type="text"
                id="maxPrice"
                placeholder="Max price"
                onChange={(e) => inputChangeHandler(e)}
              />
            </div>
          </div>
        </div>
        <div className="productsCatgory-content col-md-9 ">
          {printProducts.map((product) => {
            return (
              <div
                className="product-card "
                onClick={() => navigate(`/products/${product.id}`)}
                key={product.id + product.price}
              >
                <div
                  className="product-card-image"
                  style={{
                    backgroundImage: `url(${product.main_image})`,
                  }}
                ></div>
                <div className="product-card-info">
                  <p className="product-card-info-title">{product.title}</p>
                  <p className="product-card-info-description">
                    {product.description}
                  </p>
                  <p className="product-card-info-price">
                    {product.price}$
                    <span>{product.created_at.substring(0, 10)}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
