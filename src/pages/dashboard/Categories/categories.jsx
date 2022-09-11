import "./style.scss";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getAllCategories } from "../../../api/categories";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteCategory } from "../../../api/categories";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { setLoader } from "../../../features/loaderSlice";
import { useDispatch } from "react-redux";

export const Categories = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    dispatch(setLoader({showloader: true}));
    getAllCategories().then((res) => {
      setCategories(res.data.categories);

      dispatch(setLoader({showloader: false}));
    });
    // eslint-disable-next-line
  },[]);

  const removeCategory = async (id, index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id).then(res => {
          if (res?.data.success) {
            categories.splice(index, 1);
            setCategories([...categories]);
          }
        })        
      }
    })
  };

  return (
    <div className="categories">
      <p className="h1 text-center m-4">Categories</p>
      <Link
        to="add-category"
        className="btn btn-outline-success my-3 ml-auto add"
      >
        Add Category
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Main Category</th>
            <th>Image</th>
            <th>Title</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  {item.parent_id ? <td>{item.parent.title}</td> : <td>N/A</td>}
                  <td>
                    <img src={item.image} alt="item" width={100} />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.created_at}</td>
                  <td>
                    <Button
                      variant="text"
                      onClick={() =>
                        navigate(`/dashboard/categories/${item.id}/edit`)
                      }
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => removeCategory(item.id, index)}
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
