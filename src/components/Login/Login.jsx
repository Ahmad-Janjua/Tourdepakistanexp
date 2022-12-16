import React from "react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../assets/userContext";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { blue } from "@mui/material/colors";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { value, setValue } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  const onSubmit = (data) => {
    // implement login api here

    const user_loginurl = "http://localhost:3300/api/admin/login";
    axios
      .post(user_loginurl, data)
      .then((response) => {
        if (response.data.error === false) {
          setMessage(response.data.message);
          setSeverity("success");
          setOpen(true);

          localStorage.setItem("admin-token", response.data.token);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setSeverity("error");
        setOpen(true);
      });
  };

  const handleToggleAlert = () => {
    setOpen(!open);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link
                    to={"/"}
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">
                      Tours And Travels Admin
                    </span>
                  </Link>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Login to Your Account
                      </h5>
                      <p className="text-center small">
                        Enter your email & password to login
                      </p>
                    </div>

                    <form
                      className="row g-3"
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Email
                        </label>
                        <div className="input-group has-validation">
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            id="yourUsername"
                            {...register("email", {
                              required: "Email address is required",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "email address must have @ and .",
                              },
                            })}
                          />
                        </div>
                        <small className="text-danger">
                          {errors?.email?.message}
                        </small>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          {...register("password", {
                            required: "Password is required",
                          })}
                          required
                        />
                        <small className="text-danger">
                          {errors?.password?.message}
                        </small>
                      </div>

                      <div className="col-12">
                        <Button
                          variant="contained"
                          type="submit"
                          size="medium"
                          fullWidth
                          sx={{
                            backgroundColor: "#4154F1",
                            color: "#fff",
                            "&:hover": {
                              backgroundColor: "#4154F1",
                              color: "#fff",
                            },
                          }}
                        >
                          Login
                        </Button>
                      </div>
                      <div className="col-12 text-center">
                        <p className="small mb-0">
                          Forgot Password?{" "}
                          <Link to={"/forgot-password"}>Reset Password</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Snackbar
        autoHideDuration={3000}
        onClose={handleToggleAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        key={"top" + "right"}
      >
        <Alert onClose={handleToggleAlert} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default Login;
