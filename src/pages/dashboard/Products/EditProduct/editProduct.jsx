import "./style.scss";
import Select from "react-select";
import { FormInput } from "../../../../components/FormInput/index";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../../../api/categories";
import { useNavigate } from "react-router-dom";
import { editProduct, getAllProducts } from "../../../../api/products";
import { useParams } from "react-router-dom";

export const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((res) => {
      setCategories(res.data.categories);
    });

    getAllProducts().then(res => {
        const product = res.data.products.find(product => product.id === +id);

        data.title = product.title;
        data.category_id = product.category_id ?? "";
        data.price = product.price;
        data.description = product.description;
    })
    // eslint-disable-next-line
  }, []);

  const [data, setData] = useState({
    title: "",
    image: "",
    category_id: "",
    price: "",
    description: "",
  });

  const onChangeHandler = (e, id) => {
    if (!e.target) {
      data.category_id = e.value;
    } else if (id === "image") {
      data.image = e.target.files;
    } else {
      data[id] = e.target.value;
    }
    setData({ ...data });
  };

  const onSubmithandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", data.title);

    for (let i = 0; i < data.image.length; i++) {
      formData.append("image[]", data.image[i]);
    }

    formData.append("category_id", data.category_id);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("_method", "PATCH");

    const res = await editProduct(id, formData);
  };

  return (
    <>
      <button
        className="btn btn-outline-secondary mx-3 my-2"
        onClick={() => navigate("/dashboard/products")}
      >
        Back
      </button>
      <div className="container cont">
        <p className="h1 text-center m-4">Edit product</p>
        <form
          onChange={(e) => onChangeHandler(e, e.target.id)}
          onSubmit={(e) => onSubmithandler(e)}
        >
          <Select
            options={categories?.map((item) => {
              return {
                value: item.id,
                label: item.title,
              };
            })}
            onChange={(e) => onChangeHandler(e)}
          />
          <FormInput type="text" id="title" placeholder="Write title" value={data?.title} />
          <FormInput type="file" id="image" multiple />
          <FormInput type="number" id="price" placeholder="Products price" value={data?.price} />
          <FormInput
            type="text"
            id="description"
            placeholder="Write description"
            as="textarea"
            value={data?.description}
          />
          <div className="buttons-block">
            <Button
              variant="outline-success"
              type="submit"
              className="mx-2 my-4"
            >
              Save changes
            </Button>
            <Button
              className="mx-2 my-4 btn btn-secondary"
              onClick={() => navigate("/dashboard/products")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
