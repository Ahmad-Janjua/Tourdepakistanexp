import { useState, useEffect } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatDate } from "../../../../utils/Utils";
import CustomizedSnackbars from "../../../CustomizedSnackbars";
import { Button } from "@mui/material";
import { blue } from "@mui/material/colors";
const EditDriver = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [driver, setDriver] = useState();
  const [cars, setCars] = useState();
  const [carDriver, setCarDriver] = useState();
  const [car, setCar] = useState();
  const toggleSuccess = () => {
    setSuccess(false);
  };
  const toggleError = () => {
    setError(false);
  };

  const handleChange = (event) => {
    setCar(event.target.value);
  };

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/driver/update-driver/${
          driver?._id
        }`,
        {
          first_name: data?.first_name,
          last_name: data.last_name,
          address: data.address,
          cnic: data.cnic,
          date_of_birth: data.date_of_birth,
          license_number: data.license_number,
          opt_contact_number: data.opt_contact_number,
          contact_number: data.contact_number,
          password: data.password,
          email: data.email,
          car_id: car,
        }
      );
      if (response?.status == 201) {
        setAlert({
          open: true,
          message: "Driver Updated Successfully",
          type: "success",
        });
        navigate.push("/dashboard/driver/all-driver");
      }
    } catch (err) {
      if (err.response?.status == 302) {
        setAlert({
          open: true,
          message: "Driver Already Exists",
          type: "error",
        });
      } else if (err.response?.status == 500) {
        setAlert({
          open: true,
          message: "Please Select Car for Driver",
          type: "error",
        });
      }
    }
  };
  useEffect(() => {
    (async () => {
      try {
        console.log("here");
        const retDriver = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/driver/get-driver/${id}`
        );
        if (retDriver.status) {
          setDriver(retDriver?.data.driver);
        }
        const retCar = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/driver/get-car/${id}`
        );
        if (retCar.status) {
          setCarDriver(retCar?.data || null);
          console.log(retCar);
        }
        const car = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/car/get-cars-without-drivers`
        );
        setCars(car?.data);

        reset();
      } catch (err) {}
    })();
  }, []);
  return (
    <main id="main" className="main">
      <PageTitle name={"Edit Driver"} />
      <section className="section dashboard">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">
                    Edit Driver
                  </h5>
                  <p className="text-center small">
                    Update the details of the driver
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
                        defaultValue={driver?.firstName}
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
                        defaultValue={driver?.lastName}
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
                        defaultValue={formatDate(driver?.dateOfBirth)}
                        {...register("date_of_birth", {
                          required: "Date of birth is required",
                        })}
                      />
                      <label htmlFor="floatingName">Date Of Birth</label>
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
                        defaultValue={driver?.CNIC}
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
                        defaultValue={driver?.address}
                        style={{ height: "100px" }}
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

                  <hr />
                  <h4>Assign Car</h4>
                  <div className="col-md-6">
                    <FormControl sx={{ m: 1, minWidth: 400 }} size="medium">
                      <InputLabel id="demo-select-small">Select Car</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        defaultValue={carDriver?._id}
                        value={car}
                        fullWidth
                        label="Select Car"
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>Select Car</em>
                        </MenuItem>
                        {cars?.map((car) => (
                          <MenuItem value={car?._id}>
                            {car?.carBrand?.name} {car?.carName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* <select
                      class="form-select form-select-lg mb-3"
                      aria-label=".form-select-lg example"
                      {...register("car_id")}
                    >
                      <option
                        defaultValue={`${carDriver?._id}` || "none"}
                        value={`${carDriver?._id}` || "none"}
                      >
                        {`${carDriver?.carBrand?.name || ""}  ${
                          carDriver?.carName || "Select Car"
                        }` || "Select Car"}
                      </option>
                      {cars?.map((car) => (
                        <option value={car?._id}>
                          {car?.carBrand?.name} {car?.carName}{" "}
                        </option>
                      ))}
                    </select> */}
                    <small className="text-danger">
                      {errors?.car_id?.message}
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
                        defaultValue={driver?.email}
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
                        defaultValue={driver?.password}
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
                        defaultValue={driver?.licenseNumber}
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
                          defaultValue={driver?.contactNumber}
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
                          defaultValue={driver?.optionalContactNumber}
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

export default EditDriver;
