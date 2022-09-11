import './style.scss';
import { getAllCategories } from '../../../../api/categories';
import { getAllProducts } from '../../../../api/products';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../../features/loaderSlice';
import { useNavigate } from 'react-router-dom';
import Checkbox from "@mui/material/Checkbox";

export const ProductsAll = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([]);

    const [printProduct, setPrintProduct] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);

    useEffect(() => {
        dispatch(setLoader({showloader: true}));

        getAllCategories().then(res => {
            setCategories(res.data.categories);
            dispatch(setLoader({showloader: false}));
        })

        getAllProducts().then(res => {
            setProducts(res.data.products);
            setPrintProduct(res.data.products);
            dispatch(setLoader({showloader: false}));
        })
        // eslint-disable-next-line
    },[])

    const filterCategories = () => {
        let newProducts = [];

        newProducts = products.filter(product => {
            if (product.price >= minPrice &&
                product.price <= maxPrice) {
                    return product
                }
        });
        
        if (selectedCategories.length) {
            newProducts = products.filter(product => {
                if (selectedCategories.includes(product.category_id) 
                && product.price >= minPrice
                && product.price <= maxPrice
                ){
                    return product
                }
            })
        }        
        
        setPrintProduct(newProducts);          
    }

    useEffect(() => {
        filterCategories();
        // eslint-disable-next-line
    }, [minPrice, maxPrice]);

    const checkboxChangeHandler = (id, e) => {

        if (e.target.checked) {
            selectedCategories.push(id);
        } else {
            selectedCategories.splice(selectedCategories.indexOf(id),1);
        }
        setSelectedCategories([...selectedCategories]);

        filterCategories();
    }

    const inputCahngeHandler = (e) => {
        if (e.target.id === 'minPrice'){
            setMinPrice(+e.target.value);
            if (e.target.value === ''){
                setMinPrice(0);
            } else if (e.target.value < 0) {
                setMinPrice(0);
            }
        } else {
            setMaxPrice(+e.target.value);
            if (e.target.value === ''){
                setMaxPrice(1000000);
            } else if (e.target.value < 0) {
                setMaxPrice(0);
            }
        }
    }

    return(
        <div className='container all-products'>
            <div className="row">
                <div className='col-md-3 filters border'>
                    {categories.map((category, index) => {
                        return(
                            <div key={category.id + category.create_at + index}>
                            {!category.parent_id 
                            ?
                            <div key={category.id + category.create_at + index}>
                                <label className='parent-category'>
                                    {category.title}
                                </label>
                            </div>
                            :
                            <div key={category.id + category.create_at + index}>
                                <label className='sub-category'>
                                    <Checkbox 
                                    onChange={(e) => checkboxChangeHandler(category.id,e)} />
                                    {category.title}
                                </label>
                            </div>                            
                            }
                            </div>
                        )
                    })}
                    <div className='filters-inputs'>
                        <input 
                        type="number" 
                        id='minPrice' 
                        placeholder='Min' 
                        onChange={(e) => inputCahngeHandler(e)} />
                        <input 
                        type="number" 
                        id='maxPrice' 
                        placeholder='Max' 
                        onChange={(e) => inputCahngeHandler(e)}  />
                    </div>
                </div>
                <div className='col-md-9 content '>
                    {printProduct.map(product => {
                        return(
                            <div 
                                className="productItem" 
                                onClick={() => navigate(`/products/${product.id}`)} 
                                key={product.id + product.created_at + 1}>
                            <div 
                                className="productItem-image" 
                                style={{backgroundImage: `url(${product.main_image})`}}></div>
                            <div className="productItem-information">
                                <p className="productItem-information-price">{product.price}</p>
                                <p className="productItem-information-title">{product.title}</p>
                                <p className="productItem-information-data">{product.created_at.substring(0,11)}</p>
                            </div>                  
                            </div>                            
                        )
                    })}
                </div>
            </div>            
        </div>
    )
}
