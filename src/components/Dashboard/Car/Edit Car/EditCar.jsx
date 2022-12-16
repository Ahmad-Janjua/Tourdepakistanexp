import { useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CustomizedSnackbars from "../../../CustomizedSnackbars";
import { Button } from "@mui/material";
import { blue } from "@mui/material/colors";

const EditCar = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [brands, setBrands] = useState(null);
  const [car, setCar] = useState();
  const toggleSuccess = () => {
    setSuccess(false);
  };
  const toggleError = () => {
    setError(false);
  };

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/car/get-car/${id}`
        );
        setCar(response?.data);
        console.log(car);
        const brands = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/car/get-brands`
        );
        setBrands(brands?.data);
        reset();
      } catch (err) {}
    })();
  }, []);
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/car/update-car/${car?._id}`,
        {
          car_name: data.car_name,
          car_color: data.car_color,
          car_number: data.car_number,
          car_seating: data.car_seating,
          car_brand: data.car_brand,
          car_price: data.car_price,
          price_per_seat: data.price_per_seat,
        }
      );
      if (response?.status == 201) {
        setAlert({
          open: true,
          message: "Car Updated Successfully",
          type: "success",
        });
      }
    } catch (err) {
      setAlert({
        open: true,
        message: "Something went wrong please try again later",
        type: "error",
      });
    }
  };
  return (
    <main id="main" className="main">
      <PageTitle name={"Edit Car"} />
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
                  <h5 className="card-title text-center pb-0 fs-4">Edit Car</h5>
                  <p className="text-center small">Update the details of car</p>
                </div>

                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                  <h4>Basic Details</h4>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Car Name"
                        defaultValue={car?.carName}
                        {...register("car_name", {
                          required: "Car name is required",
                        })}
                      />
                      <label htmlFor="floatingName">Car Name</label>
                    </div>
                    <small className="text-danger">
                      {errors?.car_name?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingName"
                        placeholder="Car Price"
                        defaultValue={car?.carPrice}
                        {...register("car_price", {
                          required: "Car price is required",
                        })}
                      />
                      <label htmlFor="floatingName">Car Price</label>
                    </div>
                    <small className="text-danger">
                      {errors?.car_price?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        defaultValue={car?.carColor}
                        placeholder="Car Color"
                        {...register("car_color", {
                          required: "Car color is required",
                        })}
                      />
                      <label htmlFor="floatingName">Car Color</label>
                    </div>
                    <small className="text-danger">
                      {errors?.car_color?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Car Number"
                        defaultValue={car?.carNumber}
                        {...register("car_number", {
                          required: "Car number is required",
                        })}
                      />
                      <label htmlFor="floatingName">Car Number</label>
                    </div>
                    <small className="text-danger">
                      {errors?.car_number?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Car Seating Capacity"
                        defaultValue={car?.carSeating}
                        {...register("car_seating", {
                          required: "Car seating capacity is required",
                        })}
                      />
                      <label htmlFor="floatingName">Seating Capacity</label>
                    </div>
                    <small className="text-danger">
                      {errors?.car_seating?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Car Price For Seat"
                        defaultValue={car?.pricePerSeat}
                        {...register("price_per_seat", {
                          required: "Car Price For Seat is required",
                        })}
                      />
                      <label htmlFor="floatingName">Car Price For Seat</label>
                    </div>
                    <small className="text-danger">
                      {errors?.price_per_seat?.message}
                    </small>
                  </div>

                  <hr />
                  <h4>Car Model</h4>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Car Model"
                        {...register("car_brand", {
                          required: "Car brand is required",
                        })}
                      >
                        <option
                          defaultValue={car?.carBrand?._id}
                          value={car?.carBrand?._id || "none"}
                        >
                          {car?.carBrand?.name}
                        </option>
                        {brands?.map((brand, index) => (
                          <option value={brand?._id} key={index}>
                            {brand?.name}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="floatingSelect">Car Model</label>
                    </div>
                    <small className="text-danger">
                      {errors?.car_brand?.message}
                    </small>
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

export default EditCar;
