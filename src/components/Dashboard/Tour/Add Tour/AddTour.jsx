import { useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomizedSnackbars from "../../../CustomizedSnackbars";
import { brown, blue } from "@mui/material/colors";
import { Button } from "@mui/material";

const AddTour = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState("");
  const [cars, setCars] = useState([]);
  const [disable, setDisable] = useState(false);
  const [dateError, setDateError] = useState("");
  const [showDateError, setShowDateError] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const toggleSuccess = () => {
    setSuccess(false);
  };
  const toggleError = () => {
    setError(false);
  };

  const getCars = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/car/get-cars`)
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCars();
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

  const onSubmit = async (data) => {
    if (
      new Date(data.start_date).getTime() > new Date(data.end_date).getTime()
    ) {
      setDateError("Start Date cannot be greater than end date");
      setShowDateError(true);
      return;
    } else {
      setDateError("");
      setErrorMessage(false);

      const DataList = {
        tour_name: data.tour_name,
        tourLocation: data.tourLocation,
        start_date: data.start_date,
        end_date: data.end_date,
        package_description: value,
        car_id: data.car_id,
        tour_city: data.tour_city,
        tour_price: data.tourPri,
        tour_picture: await ImagetoBase64(data.tour_picture[0]),
      };

      console.log("DataList", DataList);

      // axios
      //   .post(`${import.meta.env.VITE_BACKEND_URL}/api/tour/add-tour`, DataList)
      //   .then((res) => {
      //     setAlert({
      //       open: true,
      //       message: res.data.message,
      //       severity: "success",
      //     });
      //     setSuccessMessage(res.data.message);
      //     setDisable(true);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setAlert({
      //       open: true,
      //       message: err.data.message,
      //       severity: "error",
      //     });
      //     setErrorMessage(err.response.data.message);
      //   });
    }
  };

  return (
    <main id="main" className="main">
      <PageTitle name={"Add Tour"} />
      <section className="section dashboard">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">Add Tour</h5>
                  <p className="text-center small">Enter details of new tour</p>
                </div>

                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                  <h4>Basic Details</h4>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Tour Name"
                        {...register("tour_name", {
                          required: "Tour name is required",
                          minLength: {
                            value: 3,
                            message: "Tour name must have atleast 3 characters",
                          },
                        })}
                      />
                      <label htmlFor="floatingName">Tour Name</label>
                    </div>
                    <small className="text-danger">
                      {errors?.tour_name?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Tour City"
                        {...register("tour_city", {
                          required: "Tour city is required",
                          minLength: {
                            value: 3,
                            message: "Tour city must have atleast 3 characters",
                          },
                        })}
                      />
                      <label htmlFor="floatingName">Tour City</label>
                    </div>
                    <small className="text-danger">
                      {errors?.tour_city?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Location"
                        {...register("tourLocation", {
                          required: "Tour Location is required",
                          minLength: {
                            value: 3,
                            message:
                              "Tour Location must have atleast 3 characters",
                          },
                        })}
                      />
                      <label htmlFor="floatingName">Tour Location</label>
                    </div>
                    <small className="text-danger">
                      {errors?.tourLocation?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingName"
                        placeholder="Price"
                        {...register("tourPrice", {
                          required: "Tour Price is required",
                          min: {
                            value: 100,
                            message: "Price cannot be less than 100",
                          },
                        })}
                      />
                      <label htmlFor="floatingName">Tour Price</label>
                    </div>
                    <small className="text-danger">
                      {errors?.tourPrice?.message}
                    </small>
                  </div>
                  <hr />
                  <h4>Duration</h4>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="date"
                        className="form-control"
                        defaultValue={new Date()}
                        id="floatingName"
                        placeholder="Start Date"
                        {...register("start_date", {
                          required: "Start Date is required",
                        })}
                      />
                      <label htmlFor="floatingName">Start Date</label>
                    </div>
                    <small className="text-danger">
                      {errors?.start_date?.message}
                    </small>
                  </div>
                  <div className="col-md-4">
                    <div className="form-floating">
                      <input
                        type="date"
                        className="form-control"
                        id="floatingName"
                        placeholder="End Date"
                        {...register("end_date", {
                          required: "End Date is required",
                        })}
                        onChange={() =>
                          validateDate(
                            getValues("start_date"),
                            getValues("end_date")
                          )
                        }
                      />
                      <label htmlFor="floatingName">End Date</label>
                    </div>
                    <small className="text-danger">
                      {errors?.end_date?.message}
                    </small>
                  </div>
                  {/* <div className="col-md-4">
                    <span>Price</span> <p>10000</p>
                  </div> */}
                  {showDateError && (
                    <div className="text-center">
                      <p className="text-danger">{dateError}</p>
                    </div>
                  )}
                  <hr />
                  <h4>Tour Image</h4>
                  <div className="col-12">
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        {...register("tour_picture", {
                          required: "Tour picture is required",
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      {errors?.tour_picture?.message}
                    </small>
                  </div>
                  <hr />
                  <h4>Tour Description</h4>
                  <div className="col-12">
                    <ReactQuill
                      theme="snow"
                      name="package_description"
                      value={value}
                      onChange={setValue}
                      modules={modules}
                      formats={formats}
                    />
                  </div>
                  <hr />
                  <h4>Car Selection</h4>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Car Name"
                        {...register("car_id", {
                          required: "Car name is required",
                        })}
                      >
                        <option value={""}>--Select Model--</option>
                        {cars?.map((brand, index) => (
                          <option value={brand?._id} key={index}>
                            {brand?.carName}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="floatingSelect">Car Model</label>
                    </div>
                    <small className="text-danger">
                      {errors?.car_id?.message}
                    </small>
                  </div>

                  <hr />

                  <div className="text-center d-flex gap-3 justify-content-center">
                    <Button
                      variant="contained"
                      type="submit"
                      size="large"
                      value={disable}
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

export default AddTour;
