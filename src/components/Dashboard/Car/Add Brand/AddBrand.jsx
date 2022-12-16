import { useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"; //es6
import CustomizedSnackbars from "../../../CustomizedSnackbars";
import { Button } from "@mui/material";
import { brown, blue } from "@mui/material/colors";

const AddBrand = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });

  const onSubmit = async (data) => {
    try {
      const resposne = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/car/add-brand`,
        data
      );
      if (resposne.status == 201) {
        setAlert({
          open: true,
          message: "Brand Added Successfully",
          type: "success",
        });
      }
    } catch (err) {
      if (err.response?.status == 302) {
        setAlert({
          open: true,
          message: "Brand Already Exist",
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
  return (
    <main id="main" className="main">
      <PageTitle name={"Add Brand"} />
      <section className="section dashboard">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div className="card mb-3">
              <div className="card-body">
                <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">
                    Add Brand
                  </h5>
                  <p className="text-center small">Enter Brand Name</p>
                </div>

                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Brand Name"
                        {...register("car_brand", {
                          required: "Brand name is required",
                        })}
                      />
                      <label htmlFor="floatingName">Brand Name</label>
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

export default AddBrand;
