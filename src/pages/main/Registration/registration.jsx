import "./style.scss";
import { FormInput } from "../../../components/FormInput/index";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { register } from "../../../api/auth";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../../features/userSlice";

export const Registration = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors.data);

  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onInputHandler = (e, id) => {
    e.preventDefault();
    data[id] = e.target.value;
    setData({ ...data });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await register(data);
    dispatch(setUserData(res.data.user));
    window.location.href = "/";
  };

  return (
    <div className="registation">
      <p className="h1">Registration Page</p>
      <form
        className="form"
        onSubmit={(e) => onSubmitHandler(e)}
        onChange={(e) => onInputHandler(e, e.target.id)}
      >
        <FormInput
          label="Name"
          type="text"
          id={"name"}
          message={errors?.name}
          placeholder="Enter your name"
        />
        <FormInput
          label="Age"
          type="text"
          id={"age"}
          message={errors?.age}
          placeholder="Enter your age"
        />
        <FormInput
          label="Email"
          type="email"
          id={"email"}
          message={errors?.email}
          placeholder="Enter your email"
        />
        <FormInput
          label="Password"
          type="password"
          id={"password"}
          message={errors?.password}
          placeholder="Enter your password"
        />
        <FormInput
          label="Confirm password"
          type="password"
          id={"password_confirmation"}
          message={errors?.password}
          placeholder="Confirm your password"
        />
        <Button
          variant="outline-secondary"
          type="submit"
          className="d-block mx-auto my-4"
        >
          Registration
        </Button>
      </form>
    </div>
  );
};
