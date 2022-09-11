import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getAllProducts, deleteProduct } from "../../../api/products";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { setLoader } from "../../../features/loaderSlice";
import { useDispatch } from "react-redux";

export const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(setLoader({ showloader: true }));
    getAllProducts().then((res) => {
      setProducts(res.data.products);
      dispatch(setLoader({ showloader: false }));
    });
    // eslint-disable-next-line
  }, []);

  const removeProduct = async (id, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id).then((res) => {
          if (res.data.success) {
            products.splice(index, 1);
            setProducts([...products]);
          }
        });
      }
    });
  };

  return (
    <div className="products">
      <p className="h1 text-center m-4">Products</p>
      <Link
        to="/dashboard/products/add-product"
        className="btn btn-outline-success my-3 ml-auto add"
      >
        Add produnct
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Title</th>
            <th>Image</th>
            <th>Price</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => {
              return (
                <tr key={product.id + product.title}>
                  <td>{product.id}</td>
                  <td>{product.category.title}</td>
                  <td>{product.title}</td>
                  <td>
                    <img
                      src={product.main_image}
                      alt="product_image"
                      width={100}
                    />
                  </td>
                  <td>{product.price}</td>
                  <td>{product.created_at}</td>
                  <td>
                    <Button
                      variant="text"
                      onClick={() =>
                        navigate(`/dashboard/products/${product.id}/edit`)
                      }
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => removeProduct(product.id, index)}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
