import { useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import axios from "axios";
import { brown, blue } from "@mui/material/colors";
import { Button } from "@mui/material";

const AddCustomer = () => {
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
  const [gender, setGender] = useState("");

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
  const handleChangeGender = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);
  };

  const onSubmit = async (data) => {
    data["gender"] = gender;
    const DataList = {
      ...data,
      customer_image: await ImagetoBase64(data.customer_image[0]),
    };
    if (gender !== "") {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/customer/add-customer`,
          DataList
        )
        .then((res) => {
          if (res.status === 201) {
            setSuccess(true);
            setSuccessMessage(res.data.message);
          } else {
            setError(true);
            setErrorMessage(res.data.message);
          }
        })
        .catch((err) => {
          if (err.response?.status == 302) {
            setErrorMessage("Customer with this email already exists");
          } else if (err.response?.status == 500) {
            setErrorMessage("Form submission failed, try again later!");
            console.log(err);
          } else {
            setErrorMessage("Form submission failed, try again later!");
            console.log(err);
          }
          setSuccess(false);
          setError(true);
        });
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle name={"Add Customer"} />
      <section className="section dashboard">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="card mb-3">
              <div className="card-body">
                {success && (
                  <div className="pt-4 pb-2">
                    <div
                      className="alert alert-primary alert-dismissible fade show"
                      role="alert"
                    >
                      {successMessage}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={toggleSuccess}
                      ></button>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="pt-4 pb-2">
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      {errorMessage}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={toggleError}
                      ></button>
                    </div>
                  </div>
                )}
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">
                    Add Customer
                  </h5>
                  <p className="text-center small">
                    Enter details of new customer
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
                          pattern: {
                            value: /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i,
                            message: "Your CNIC should be XXXXX-XXXXXXX-X",
                          },
                        })}
                      />
                      <label htmlFor="floatingName">CNIC</label>
                    </div>
                    <small className="text-danger">
                      {errors?.cnic?.message}
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
                        name="customer_image"
                        {...register("customer_image", {
                          required: "Profile picture is required",
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      {errors?.customer_image?.message}
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
                        type="email"
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
      </section>
    </main>
  );
};

export default AddCustomer;
