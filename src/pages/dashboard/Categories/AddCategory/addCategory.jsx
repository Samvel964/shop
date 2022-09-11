import "./style.scss";
import Select from "react-select";
import { useState, useEffect } from "react";
import { getAllCategories } from "../../../../api/categories";
import { FormInput } from "../../../../components/FormInput";
import Button from "react-bootstrap/Button";
import { createCategory } from "../../../../api/categories";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const AddCategory = () => {
  const navigate = useNavigate();
  const error = useSelector((state) => state.errors.data);
  const [categories, setCategories] = useState([]);
  const [imageError, setImageError] = useState('');
  const [descriptionError, setDescriptionError] = useState('')

  useEffect(() => {
    getAllCategories().then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  const [data, setData] = useState({
    title: "",
    image: "",
    parent_id: "",
    description: "",
  });

  const onChangeHandler = (e, id) => {
    if (!e.target) {
      data.parent_id = e.value;
    } else if (id === "image") {
      data.image = e.target.files[0];
    } else {
      data[id] = e.target.value;
    }

    setData({ ...data });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("image", data.image);
    formData.append("parent_id", data.parent_id);
    formData.append("description", data.description);
    
    !data.image ? setImageError('The Image is required') : setImageError('');
    !data.description ? setDescriptionError('The description field is required.') : setDescriptionError('');

    const res = await createCategory(formData);

    if (res?.data.success) {
      navigate("/dashboard/categories");
    }
  };

  return (
    <>
      <button
        className="btn btn-outline-secondary mx-3 my-2"
        onClick={() => navigate("/dashboard/categories")}
      >
        Back
      </button>
      <div className="container custom-container">
        <p className="h1 text-center m-4">Add Category</p>
        <form
          onSubmit={(e) => onSubmitHandler(e)}
          onChange={(e) => onChangeHandler(e, e.target.id)}
        >
          <Select
            options={categories.map((item) => {
              return {
                value: item.id,
                label: item.title,
              };
            })}
            onChange={(e) => onChangeHandler(e, "parent_id")}
          />
          <FormInput
            type="text"
            id="title"
            placeholder="Write title"
            message={error.title}
          />
          <FormInput 
            type="file" 
            id="image" 
            message={imageError}
          />
          <FormInput
            type="text"
            id="description"
            placeholder="Write description"
            as="textarea"
            message={descriptionError}
          />
          <Button
            variant="outline-success"
            type="submit"
            className="d-block mx-auto my-4"
          >
            Add category
          </Button>
        </form>
      </div>
    </>
  );
};
