import './style.scss';
import { useState, useEffect } from 'react';
import { getAllCategories } from '../../../api/categories';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../features/loaderSlice';
import { useNavigate } from 'react-router-dom';

export const CategoriesShow = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        dispatch(setLoader({showloader: true}));
        getAllCategories().then(res => {
            setCategories(res.data.categories);
            dispatch(setLoader({showloader: false}));
        })
        // eslint-disable-next-line
    },[]);

    return (
        <div className='container'>
            {categories.filter(category => !category.parent_id).map(category => {
                return(
                    <div className='category-group'
                    key={category.id + category.title}>
                        <div className='parent-title'>{category.title}</div>
                        <div className='children'>
                            {categories
                            .filter(childCategory => childCategory.parent_id === category.id)
                            .map((category, index) => {
                                return(
                                    <div className='category'
                                    onClick={() => navigate(`/categories/${category.id}/product-sp`)}
                                    key={category.id + category.title + index}>
                                        <div className='category-image'
                                        style={{backgroundImage: `url(${category.image})`}}>
                                        </div>
                                        <p className='category-title'>{category.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>                    
                )
            })}
        </div>
    )
}
