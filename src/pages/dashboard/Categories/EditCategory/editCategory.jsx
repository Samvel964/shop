import "./style.scss";
import Select from "react-select";
import { useState, useEffect } from "react";
import { FormInput } from "../../../../components/FormInput/index";
import Button from "react-bootstrap/Button";
import { getAllCategories } from "../../../../api/categories";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { editCategory } from "../../../../api/categories";

export const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [categories, setCategories] = useState([]);

  const [data, setData] = useState({
    title: "",
    image: "",
    parent_id: "",
    description: "",
  });

  useEffect(() => {
    getAllCategories().then((res) => {
      const category = res.data.categories.find((item) => item.id === +id);
      setCategories(res.data.categories);

      data.title = category.title;
      data.parent_id = category.parent_id ?? "";
      data.description = category.description;
    });
    // eslint-disable-next-line
  }, []);

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
    formData.append("_method", "PATCH");

    const res = await editCategory(id, formData);
    console.log(res, 111);
    if (res?.data.success) {
      navigate("/dashboard/categories");
    }
  };

  return (
    <div className="container cont">
      <p className="h1 text-center m-4">Edit Category</p>
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
          value={data?.title}
          placeholder="Write title"
        />
        <FormInput type="file" id="image" />
        <FormInput
          type="text"
          id="description"
          value={data?.description}
          placeholder="Write description"
          as="textarea"
        />
        <div className="buttons-block">
          <Button variant="outline-success" type="submit" className="mx-2 my-4">
            Save changes
          </Button>
          <Button
            className="mx-2 my-4 btn btn-secondary"
            onClick={() => navigate("/dashboard/categories")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
