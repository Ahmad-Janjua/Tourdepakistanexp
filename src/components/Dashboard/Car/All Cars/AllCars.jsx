import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "../../../CustomizedSnackbars";
import DeleteModal from "../../../DeleteModal";
import { Box, Button, CircularProgress } from "@mui/material";
import { blue } from "@mui/material/colors";

const AllCars = () => {
  const [cars, setCars] = useState(null);
  const [singleCar, setSingleCar] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [cardelete, setCarDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    getCars();
  }, [update]);

  const getCars = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/car/get-cars`)
      .then((res) => {
        setLoading(false);
        setCars(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  function showDetails(id) {
    let tempCars = [...cars];
    let sCar = tempCars.filter((car) => car?._id == id);
    console.log("fff", sCar);
    setSingleCar(sCar);
  }
  const deleteConfirm = (id) => {
    setCarDelete(id);
  };
  function deleteCar(id) {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/car/delete-car/${id}`)
      .then((res) => {
        if (res.status == 200) {
          setAlert({
            open: true,
            message: "Car Deleted Successfully",
            type: "success",
          });
          setCarDelete(null);
          setUpdate(!update);
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

  function editCarDetails(id) {
    navigate(`/dashboard/car/edit-car/${id}`);
  }

  function CarDetails(id) {
    navigate(`/dashboard/car/details-car/${id}`);
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
      <PageTitle name={"All Cars"} />
      <section className="section dashboard">
        <div className="row">
          {cars?.length > 0 && (
            <div className="col-lg-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars?.map((car, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{car?.carBrand?.name}</td>
                      <td>{car?.carName}</td>
                      <td>{car?.carNumber}</td>
                      <td>
                        <Button
                          className="btn"
                          sx={{ color: "black", textTransform: "capitalize" }}
                          type="button"
                          onClick={() => showDetails(car?._id)}
                        >
                          Details
                        </Button>
                        <Button
                          className="btn"
                          sx={{ color: "black", textTransform: "capitalize" }}
                          type="button"
                          onClick={() => editCarDetails(car?._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          sx={{ color: "black", textTransform: "capitalize" }}
                          className="btn"
                          type="button"
                          onClick={() => deleteConfirm(car?._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {cars?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No car found
            </div>
          )}
          {singleCar.length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <img src={singleCar[0]?.profilePicture} alt="Profile" />
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <h2>{singleCar[0]?.carName}</h2>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Brand</th>
                          <td>{singleCar[0]?.carBrand?.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Color</th>
                          <td>{singleCar[0]?.carColor}</td>
                        </tr>
                        <tr>
                          <th scope="row">Seats</th>
                          <td>{singleCar[0]?.seatsLeft}</td>
                        </tr>
                        <tr>
                          <th scope="row">Number</th>
                          <td>{singleCar[0]?.carNumber}</td>
                        </tr>
                        <tr>
                          <th scope="row">Driver</th>
                          <td>
                            {singleCar[0]?.carDriver?.firstName}{" "}
                            {singleCar[0]?.carDriver?.lastName}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Price</th>
                          <td>{singleCar[0]?.carPrice || "0"} PKR/Day</td>
                        </tr>
                        <tr>
                          <th scope="row">Price per seat</th>
                          <td>{singleCar[0]?.pricePerSeat || "0"} PKR/Day</td>
                        </tr>
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
                      onClick={() => CarDetails(singleCar[0]?._id)}
                    >
                      View More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <CustomizedSnackbars alert={alert} />
      <DeleteModal id={cardelete} delete={deleteCar} />
    </main>
  );
};

export default AllCars;
