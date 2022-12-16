import React, { useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import { brown, blue } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { Button } from "@mui/material";

const AddDriver = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validateMessage, setValidateMessage] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });

  const toggleSuccess = () => {
    setSuccess(false);
  };
  const toggleError = () => {
    setError(false);
  };

  function handleValidateAge(dateOfBirth) {
    // find the date 18 years ago
    const date18YrsAgo = new Date();
    date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
    // check if the date of birth is before that date
    dateOfBirth <= date18YrsAgo
      ? setValidateMessage("")
      : setValidateMessage("Driver must be 18 years old or older");
    return dateOfBirth <= date18YrsAgo;
  }
  const handleToggleAlert = () => {
    setAlert({ ...alert, open: !alert.open });
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const ImagetoBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [gender, setGender] = useState("male");
  const handleChangeGender = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);
  };

  const onSubmit = async (data) => {
    console.log(data);
    const DataList = {
      profilePicture: await ImagetoBase64(data.profile_picture[0]),
      cnic_front: await ImagetoBase64(data.cnic_front[0]),
      cnic_back: await ImagetoBase64(data.cnic_back[0]),
      lcs_front: await ImagetoBase64(data.license_front[0]),
      lcs_back: await ImagetoBase64(data.license_back[0]),
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      contact_number: data.contact_number,
      password: data.password,
      cnic: data.cnic,
      license_number: data.license_number,
      date_of_birth: data.date_of_birth,
      gender: gender,
      contact_number: data.contact_number,
      address: data.address,
    };

    if (validateMessage === "") {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/driver/add-driver`,
          DataList
        )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            setAlert({
              open: true,
              message: "Driver Added Successfully",
              type: "success",
            });
          }
        })
        .catch((err) => {
          if (err.response?.status == 302) {
            setAlert({
              open: true,
              message: "Driver Already Exist",
              type: "error",
            });
          } else if (err.response?.status == 500) {
            setAlert({
              open: true,
              message: "Server Error",
              type: "error",
            });
          }
        });
    } else {
      setAlert({
        open: true,
        message: validateMessage,
        type: "error",
      });
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle name={"Add Driver"} />
      <section className="section dashboard">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">
                    Add Driver
                  </h5>
                  <p className="text-center small">
                    Enter details of new driver
                  </p>
                </div>

                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                  <h4>Basic Details</h4>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="First Name"
                        {...register("first_name", {
                          required: "First name is required",
                          minLength: {
                            value: 3,
                            message:
                              "First name must have atleast 3 characters",
                          },
                        })}
                      />
                      <label htmlFor="floatingName">First Name</label>
                    </div>
                    <small className="text-danger">
                      {errors?.first_name?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Last Name"
                        {...register("last_name", {
                          required: "Last name is required",
                          minLength: {
                            value: 3,
                            message: "Last name must have atleast 3 characters",
                          },
                        })}
                      />
                      <label htmlFor="floatingName">Last Name</label>
                    </div>
                    <small className="text-danger">
                      {errors?.last_name?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingName"
                        placeholder="Date Of Birth"
                        {...register("date_of_birth", {
                          required: "Date of birth is required",
                        })}
                        onInput={(e) => {
                          handleValidateAge(new Date(e.target.value));
                        }}
                      />
                      <label htmlFor="floatingName">Date Of Birth</label>
                    </div>

                    <small className="text-danger">
                      {errors?.date_of_birth?.message || validateMessage}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="CNIC"
                        {...register("cnic", {
                          required: "CNIC is required",
                          // pattern: {
                          //   value: /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i,
                          //   message: "Your CNIC should be XXXXX-XXXXXXX-X",
                          // },
                        })}
                      />
                      <label htmlFor="floatingName">CNIC</label>
                    </div>
                    <small className="text-danger">
                      {errors?.cnic?.message}
                    </small>
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="inputNumber"
                      className="col-sm-2 col-form-label"
                    >
                      CNIC Front
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        {...register("cnic_front", {
                          required: "CNIC front is required",
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      {errors?.cnic_front?.message}
                    </small>
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="inputNumber"
                      className="col-sm-2 col-form-label"
                    >
                      CNIC Back
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        {...register("cnic_back", {
                          required: "CNIC back is required",
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      {errors?.cnic_back?.message}
                    </small>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Address"
                        id="floatingTextarea"
                        style={{ height: "100px;" }}
                        {...register("address", {
                          required: "Address is required",
                        })}
                      ></textarea>
                      <label htmlFor="floatingTextarea">Address</label>
                    </div>
                    <small className="text-danger">
                      {errors?.address?.message}
                    </small>
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="inputNumber"
                      className="col-sm-2 col-form-label"
                    >
                      Profile Picture
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        {...register("profile_picture", {
                          required: "Profile picture is required",
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      {errors?.profile_picture?.message}
                    </small>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="floatingSelect"
                        name="gender"
                        onChange={(e) => {
                          handleChangeGender(e);
                        }}
                        aria-label="Floating label select example"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <label htmlFor="floating" className="text-dark">
                        Gender
                      </label>
                    </div>
                    <small className="text-danger">
                      {gender === "" && "Gender is Required"}
                    </small>
                  </div>
                  <hr />
                  <h4>Account Details</h4>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingEmail"
                        placeholder="Your Email"
                        {...register("email", {
                          required: "Email address is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "email address must have @ and .",
                          },
                        })}
                      />
                      <label htmlFor="floatingEmail">Your Email</label>
                    </div>
                    <small className="text-danger">
                      {errors?.email?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                      <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <small className="text-danger">
                      {errors?.password?.message}
                    </small>
                  </div>
                  <hr />
                  <h4>License Details</h4>
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="License Number"
                        {...register("license_number", {
                          required: "License number is required",
                        })}
                      />
                      <label htmlFor="floatingPassword">License Number</label>
                    </div>
                    <small className="text-danger">
                      {errors?.license_number?.message}
                    </small>
                  </div>

                  <div className="col-12">
                    <label
                      htmlFor="inputNumber"
                      className="col-sm-2 col-form-label"
                    >
                      License Front
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        {...register("license_front", {
                          required: "License front is required",
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      {errors?.license_front?.message}
                    </small>
                  </div>
                  <div className="col-12">
                    <label
                      htmlFor="inputNumber"
                      className="col-sm-2 col-form-label"
                    >
                      License Back
                    </label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        {...register("license_back", {
                          required: "License back is required",
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      {errors?.license_back?.message}
                    </small>
                  </div>
                  <hr />
                  <h4>Contact Information</h4>
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingCity"
                          placeholder="Contact Number"
                          {...register("contact_number", {
                            required: "Contact number is required",
                            pattern: {
                              value: /^[0-9+]{4}-[0-9+]{7}$/i,
                              message: "Contact number should be XXXX-XXXXXXX",
                            },
                          })}
                        />
                        <label htmlFor="floatingCity">Contact Number</label>
                      </div>
                      <small className="text-danger">
                        {errors?.contact_number?.message}
                      </small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingCity"
                          placeholder="Optional Contact Number"
                          {...register("opt_contact_number", {
                            pattern: {
                              value: /^[0-9+]{4}-[0-9+]{7}$/i,
                              message: "Contact number should be XXXX-XXXXXXX",
                            },
                          })}
                        />
                        <label htmlFor="floatingCity">
                          Optional Contact Number
                        </label>
                      </div>
                      <small className="text-danger">
                        {errors?.opt_contact_number?.message}
                      </small>
                    </div>
                  </div>
                  <div className="text-center d-flex gap-3 justify-content-center">
                    <Button
                      variant="contained"
                      type="submit"
                      size="large"
                      sx={{
                        backgroundColor: blue[400],
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: blue[400],
                          color: "#fff",
                        },
                      }}
                    >
                      Submit
                    </Button>

                    <Button
                      type="reset"
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: brown[500],
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: brown[500],
                          color: "#fff",
                        },
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          autoHideDuration={3000}
          onClose={handleToggleAlert}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={alert.open}
          key={"top" + "right"}
        >
          <Alert onClose={handleToggleAlert} severity={alert.type}>
            {alert.message}
          </Alert>
        </Snackbar>
      </section>
    </main>
  );
};

export default AddDriver;
