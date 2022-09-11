import "./style.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../../../api/products";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../../features/loaderSlice";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const ProductItem = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);  

  useEffect(() => {
    dispatch(setLoader({ showloader: true}));

    getAllProducts().then((res) => {
      setProduct(res.data.products.filter((product) => product.id === +id));
      setProducts(res.data.products);
      dispatch(setLoader({ showloader: false}));
    });
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <div className="container product-item">
      <div className="for-address"></div>
      <div className="row main">
        <div className="col-md-8 left">
          {product?.map((product) => {
              return (
                <div
                  className="product-item"
                  key={product.id + product.created_at}
                >
                  <Carousel className="slider">
                    {product?.images.map((image, index) => {
                      return (
                        <Carousel.Item key={image + index} className=''>
                          <div style={{backgroundImage: `url(${image})`}} className='slider-image'></div>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                  <div className="product-item-info">
                    <p className='product-item-info-title'>{product.title}</p>
                    <p className='product-item-info-description'>{product.description}</p>
                    <div className="d-flex justify-content-between">
                      <p className='product-item-info-price'>{product.price} $</p>
                      <p className='product-item-info-created'>{product.created_at}</p>                      
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="col-md-4 right">
          <p className='right-title text-center'>Նմանատիպ հայտարարություններ</p>
          {products
          ?.filter(products => products.category.parent_id === product[0].category.parent_id 
            && products.id !== product[0].id)
          .map((product, index) => {
            return(
              <div className='similar-products' 
              onClick={() => navigate(`/products/${product.id}`)}
              key={product.id + index + 'index'}>
                <div className="similar-products-image" 
                style={{backgroundImage: `url(${product.main_image})`}}></div>
                <div className="similar-products-info">
                  <p className="similar-products-info-title">{product.title}</p>
                  <p className="similar-products-info-price">{product.price} $</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};
