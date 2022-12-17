import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../../PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import { formatDate } from "./../../../../utils/Utils";
import CustomizedSnackbars from "../../../CustomizedSnackbars";
import { brown, blue } from "@mui/material/colors";
import { Button } from "@mui/material";

const EditCustomer = () => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors, isValid, touchedFields },
  } = useForm({
    mode: "onChange",
  });

  const [customer, setCustomer] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [gender, setGender] = useState("");

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/customer/get-customer/${id}`
        );
        setCustomer(response?.data);
        setGender(response?.data?.gender);
        reset();
      } catch (err) {}
    })();
  }, []);

  const toggleSuccess = () => {
    setSuccess(false);
  };
  const toggleError = () => {
    setError(false);
  };
  const onSubmit = async (data) => {
    data["gender"] = gender;

    try {
      //    first_name,
      // last_name,
      // date_of_birth,
      // cnic,
      // address,
      // email,
      // password,
      // contact_number,
      // opt_contact_number,
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/customer/update-customer/${
          customer?._id
        }`,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          address: data.address,
          cnic: data.cnic,
          date_of_birth: data.date_of_birth,
          opt_contact_number: data.opt_contact_number,
          contact_number: data.contact_number,
          password: data.password,
          email: data.email,
          gender: data.gender,
        }
      );
      if (response?.status == 201) {
        setAlert({
          open: true,
          message: "Customer Updated Successfully",
          type: "success",
        });
      }
    } catch (err) {
      if (err.response?.status == 302) {
        setAlert({
          open: true,
          message: "Customer with this email already exists",
          type: "error",
        });
      } else if (err.response?.status == 500) {
        setAlert({
          open: true,
          message: "Internal Server Error",
          type: "error",
        });
      }
      setSuccess(false);
      setError(true);
    }
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
  };

  console.log(customer, "---------");

  return (
    <main id="main" className="main">
      <PageTitle name={"Edit Customer"} />
      <section className="section dashboard">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">
                    Edit Customer
                  </h5>
                  <p className="text-center small">
                    Update the details of the customer
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
                        defaultValue={customer?.firstName}
                        {...register("first_name", {
                          required: "First name is required",
                          minLength: {
                            value: 3,
                            message:
                              "First name must have atleast 3 characters",
                          },
                        })}
                      />
                      <label htmlfor="floatingName">First Name</label>
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
                        defaultValue={customer?.lastName}
                        {...register("last_name", {
                          required: "Last name is required",
                          minLength: {
                            value: 3,
                            message: "Last name must have atleast 3 characters",
                          },
                        })}
                      />
                      <label htmlfor="floatingName">Last Name</label>
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
                        defaultValue={formatDate(customer?.dateOfBirth)}
                        {...register("date_of_birth", {
                          required: "Date of birth is required",
                        })}
                      />
                      <label htmlfor="floatingName">Date Of Birth</label>
                    </div>
                    <small className="text-danger">
                      {errors?.date_of_birth?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="CNIC"
                        defaultValue={customer?.CNIC}
                        {...register("cnic", {
                          required: "CNIC is required",
                          // pattern: {
                          //   value: /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/i,
                          //   message: "Your CNIC should be XXXXX-XXXXXXX-X",
                          // },
                        })}
                      />
                      <label htmlfor="floatingName">CNIC</label>
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
                        defaultValue={customer?.address}
                        style={{ height: "100px" }}
                        {...register("address", {
                          required: "Address is required",
                        })}
                      ></textarea>
                      <label htmlfor="floatingTextarea">Address</label>
                    </div>
                    <small className="text-danger">
                      {errors?.address?.message}
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
                        value={gender}
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
                        defaultValue={customer?.email}
                        {...register("email", {
                          required: "Email address is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "email address must have @ and .",
                          },
                        })}
                      />
                      <label htmlfor="floatingEmail">Your Email</label>
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
                        defaultValue={customer?.password}
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                      <label htmlfor="floatingPassword">Password</label>
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
                          defaultValue={customer?.contactNumber}
                          {...register("contact_number", {
                            required: "Contact number is required",
                            pattern: {
                              value: /^[0-9+]{4}-[0-9+]{7}$/i,
                              message: "Contact number should be XXXX-XXXXXXX",
                            },
                          })}
                        />
                        <label htmlfor="floatingCity">Contact Number</label>
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
                          defaultValue={customer?.optionalContactNumber}
                          {...register("opt_contact_number", {
                            pattern: {
                              value: /^[0-9+]{4}-[0-9+]{7}$/i,
                              message: "Contact number should be XXXX-XXXXXXX",
                            },
                          })}
                        />
                        <label htmlfor="floatingCity">
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
                      onClick={async () => {
                        trigger();
                      }}
                    >
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CustomizedSnackbars alert={alert} />
    </main>
  );
};

export default EditCustomer;
