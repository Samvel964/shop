import Select from 'react-select';
import { FormInput } from '../../../../components/FormInput/index';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../../../../api/categories';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../../api/products';
import { useSelector } from 'react-redux';


export const AddProduct = () => {
    const navigate = useNavigate();
    let errors = useSelector(state => state.errors.data);
    const [imageError, setImageError] = useState('');
    const [selectError, setSelectError] = useState('');
    const selectErrorStyle = {color:'red',marginBottom: '0',marginLeft: '5px'}
    
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then(res => {
            setCategories(res.data.categories);
        })
    },[])

    const [data, setData] = useState({
        title: '',
        image: '',
        category_id: '',
        price: '',
        description: '',
    });

    const onChangeHandler = (e, id) => {
        if (!e.target) {
            data.category_id = e.value;
        } else if (id === 'image') {
           data.image = e.target.files;
        } else {
            data[id] = e.target.value;
        }
        setData({...data});
    }

    const onSubmithandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', data.title);

        for (let i = 0; i < data.image.length; i++) {
            formData.append('image[]', data.image[i]);
        }
        
        if (!data.image.length) {
            setImageError('The image is required');
        } else if (data.image.length > 4) {
            setImageError('Images maximum amount is 4');                                
        } else {
            setImageError('')
        }

        formData.append('category_id', data.category_id);
        formData.append('price', data.price);
        formData.append('description', data.description);

        if(!data.category_id) {
            setSelectError('selct ara mi ban');
        } else {
            setSelectError('');
        }

        const res = await createProduct(formData);

        if (res.data.success) {
            navigate('/dashboard/products');
        }
    }

    return(
        <>
         <button className='btn btn-outline-secondary mx-3 my-2'
            onClick={() => navigate('/dashboard/products')}>Back</button>
            <div className='container cont'>           
            <p className='h1 text-center m-4'>Add product</p>
            <form onChange={(e) => onChangeHandler(e,e.target.id)} onSubmit={(e) => onSubmithandler(e)}>
                <p style={selectErrorStyle}>{selectError && selectError}</p>
                <Select 
                options={categories?.map(item => {
                    if (!item.parent_id) {
                        return(
                            {
                                value: item.id,
                                label: item.title,
                                isDisabled: true,
                            }
                        )
                    }
                    return( 
                        {
                            value: item.id,
                            label: item.title,
                        }
                    )
                })}
                onChange={(e) => onChangeHandler(e)}
                />
                <FormInput  type='text' id='title' placeholder='Write title' message={errors.title}/>
                <FormInput  type='file' id='image' multiple message={imageError} />
                <FormInput  type='number' id='price' placeholder='Products price' message={errors.price}/>
                <FormInput  type='text' id='description' placeholder='Write description' as='textarea' message={errors.description}/>
                <Button 
                variant="outline-success" 
                type='submit' 
                className='d-block mx-auto my-4'
                >Add product</Button>
            </form>
        </div>
        </>
    )
}
