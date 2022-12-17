import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatDate } from "./../../../../utils/Utils";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DeleteModal from "../../../DeleteModal";
import CustomizedSnackbars from "../../../CustomizedSnackbars";
import { Button } from "@mui/material";
import { brown, blue } from "@mui/material/colors";

const AllDriver = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [drivers, setDrivers] = useState(null);
  const [singleDriver, setSingleDriver] = useState({});
  const [selectSingleDriver, setSelectSingleDriver] = useState([]);
  const [cars, setCars] = useState([]);
  const [update, setUpdate] = useState(false);
  const [driverdelete, setDriverDelete] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });

  const CalCulateAge = (date) => {
    var today = new Date();

    var birthDate = new Date(date);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/driver/get-all-drivers`
      );
      setDrivers(response.data);

      setLoading(false);

      const cars = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/car/getAvailableCars-without-drivers`
      );
      setCars(cars?.data);
    })();
  }, [update]);

  function showDetails(id) {
    let tempDriver = [...drivers];
    let _details = tempDriver.filter((driver) => driver?._id == id);
    console.log("fff", _details);
    if (_details && _details.length !== 0) {
      setSingleDriver(_details[0]);
    } else {
      setSingleDriver({});
    }
  }
  const deleteDriver = (id) => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/driver/delete-driver/${id}`
      )
      .then((res) => {
        setUpdate(!update);
        if (res.status == 200) {
          setAlert({
            open: true,
            message: "Driver deleted successfully",
            type: "success",
          });
          setDriverDelete(null);
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
  };
  const deleteConfirm = (id) => {
    console.log("id", id);
    setDriverDelete(id);
  };
  function editDriver(id) {
    navigate(`/dashboard/driver/edit-driver/${id}`);
  }

  function detailDriver(id) {
    navigate(`/dashboard/driver/details-driver/${id}`);
  }
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
        id="main"
        className="main"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <main id="main" className="main">
      <PageTitle name={"All Drivers"} />
      <section className="section dashboard">
        <div className="row">
          {drivers?.length > 0 && (
            <div className="col-lg-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers?.map((driver, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {driver?.firstName} {driver?.lastName}
                      </td>
                      <td>{formatDate(driver?.dateOfBirth, true)} </td>
                      <td>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => showDetails(driver?._id)}
                        >
                          Details
                        </button>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => editDriver(driver?._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => deleteConfirm(driver?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {drivers?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No Drivers found
            </div>
          )}
          {Object.keys(singleDriver).length !== 0 &&
            singleDriver?.firstName && (
              <div className="col-xl-4">
                <div className="card">
                  <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                    <img
                      style={{ width: `200px`, height: `200px` }}
                      src={singleDriver?.profilePicture}
                      alt="Profile"
                      className="rounded-circle"
                    />
                    <h2 className="pt-3">
                      {singleDriver?.firstName} {singleDriver?.lastName}
                    </h2>
                    <h3>{singleDriver?.contactNumber}</h3>
                    <div className="col-12">
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <th scope="row">CNIC</th>
                            <td>{singleDriver?.CNIC}</td>
                          </tr>
                          {singleDriver?.dateOfBirth ? (
                            <>
                              <tr>
                                <th scope="row">Age</th>
                                <td>
                                  {CalCulateAge(singleDriver?.dateOfBirth)}
                                </td>
                              </tr>
                            </>
                          ) : (
                            ""
                          )}

                          {singleDriver?.email ? (
                            <tr>
                              <th scope="row">Email</th>
                              <td>{singleDriver?.email}</td>
                            </tr>
                          ) : (
                            ""
                          )}
                        </tbody>
                      </table>
                      <Button
                        variant="contained"
                        type="submit"
                        size="medium"
                        sx={{
                          backgroundColor: "#4154F1",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#4154F1",
                            color: "#fff",
                          },
                        }}
                        onClick={() => detailDriver(singleDriver?._id)}
                      >
                        View More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {cars?.length > 0 && selectSingleDriver?.[0]?.firstName && (
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <h2>
                    {singleDriver[0]?.firstName} {singleDriver[0]?.lastName}
                  </h2>
                  <h3>{singleDriver[0]?.contactNumber}</h3>
                  <div className="col-12">
                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                      <h4>Assign Car</h4>
                      <hr />
                      <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                          Available Cars
                        </label>
                        <select id="inputState" className="form-select">
                          <option defaultValue={""}>Choose...</option>
                          {cars?.map((car) => (
                            <option value={car?._id} {...register("carId")}>
                              {car?.carName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DeleteModal id={driverdelete} delete={deleteDriver} />
        </div>
        <CustomizedSnackbars alert={alert} />
      </section>
    </main>
  );
};

export default AllDriver;
