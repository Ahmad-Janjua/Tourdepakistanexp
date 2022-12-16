import { useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Link } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";
import { Button, FormHelperText, MenuItem } from "@mui/material";
import CustomizedSnackbars from "../../../CustomizedSnackbars";
import DeleteModal from "../../../DeleteModal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { brown, blue } from "@mui/material/colors";

const browns = brown[500];
const AddCar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [brands, setBrands] = useState(null);
  const [models, setModels] = useState("");
  const [carType, setCarType] = useState("rent");
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

  const getBrands = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/car/get-brands`)
      .then((res) => {
        setBrands(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBrands();
  }, []);

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

  const SelectModel = (e) => {
    console.log(e.target.value);
    setModels(e.target.value);
  };

  const onSubmit = async (data) => {
    const DataList = {
      ...data,
      car_brand: models,
      car_image: await ImagetoBase64(data.car_image[0]),
      car_type: carType,
    };
    console.log(DataList);
    if (models !== "") {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/car/add-car`, DataList)
        .then((res) => {
          if (res.status == 201) {
            setAlert({
              open: true,
              message: "Car Added Successfully",
              type: "success",
            });
          }
        })
        .catch((err) => {
          setAlert({
            open: true,
            message: "Something went wrong",
            type: "error",
          });
          console.log(err);
        });
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle name={"Add Car"} />
      <section className="section dashboard">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">Add Car</h5>
                  <p className="text-center small">Enter details of new car</p>
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
                        type="text"
                        className="form-control"
                        id="floatingName"
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
                        type="number"
                        className="form-control"
                        id="floatingName"
                        placeholder="Car Price"
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
                        placeholder="Car Number"
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
                        type="number"
                        className="form-control"
                        id="floatingName"
                        placeholder="Price per seat"
                        {...register("price_per_seat", {
                          required: "Price per seat is required",
                        })}
                      />
                      <label htmlFor="floatingName">Price per seat</label>
                    </div>
                    <small className="text-danger">
                      {errors?.price_per_seat?.message}
                    </small>
                  </div>

                  <hr />

                  <div className="col-md-6">
                    <h4>Car Model</h4>
                    <FormControl
                      sx={{ m: 1, minWidth: 250 }}
                      error={models === "" ? true : false}
                    >
                      <InputLabel id="demo-simple-select-error-label">
                        Car Model
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        value={models}
                        label="Car Model"
                        onChange={(e) => SelectModel(e)}
                      >
                        <MenuItem value="">
                          <em>Select Car</em>
                        </MenuItem>
                        {brands?.map((brand, index) => (
                          <MenuItem value={brand?._id} key={index}>
                            {" "}
                            {brand?.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {" "}
                        {models === "" && "Car model is required"}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className="col-md-6">
                    <h4>Car Type</h4>
                    <FormControl>
                      <RadioGroup
                        row
                        sx={{ mt: 2, mb: 1 }}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="car_type "
                        defaultValue={carType}
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
                      >
                        <FormControlLabel
                          value="rent"
                          control={<Radio />}
                          label="For rent"
                        />
                        <FormControlLabel
                          value="tour"
                          control={<Radio />}
                          label="For tour"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <hr />
                  <h4>Car Image</h4>
                  <div className="col-12">
                    <div className="col-sm-12">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        {...register("car_image", {
                          required: "Car image is required",
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      {errors?.car_image?.message}
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
      <CustomizedSnackbars alert={alert} />
    </main>
  );
};

export default AddCar;
