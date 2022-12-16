import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import ProfileImage from "./../../../../assets/img/profile-img.jpg";
import CircularProgress from "@mui/material/CircularProgress";

import { Navigate, useNavigate } from "react-router-dom";
import DeleteModal from "../../../DeleteModal";
import { Box } from "@mui/material";

const AllTours = () => {
  const [tours, setTours] = useState(null);
  const [update, setUpdate] = useState(false);
  const [tourdelete, setTourDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const getAllTours = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/tour/get-tours`)
      .then((res) => {
        setTours(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllTours();
  }, [update]);

  const deleteConfirm = (id) => {
    setTourDelete(id);
  };

  const deleteTour = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/tour/delete-tour/${id}`)
      .then((res) => {
        setUpdate(!update);
        setTourDelete(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  console.log(tours)
  return (
    <main id="main" className="main">
      <PageTitle name={"All Tours"} />
      <section className="section dashboard">
        <div className="row">
          {tours?.length > 0 && (
            <div className="col-lg-12">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours?.map((tour, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{tour?.tourName}</td>
                      <td>{tour?.tourLocation} </td>
                      <td>
                        <button
                          className="btn"
                          type="button"
                          onClick={() =>
                            navigate(
                              `/dashboard/tours/tour-details/${tour?._id}`
                            )
                          }
                        >
                          Details
                        </button>
                        <button
                          className="btn"
                          type="button"
                          onClick={() =>
                            navigate(
                              `/dashboard/tours/update-tour/${tour?._id}`
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => deleteConfirm(tour?._id)}
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

          {tours?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No tours found
            </div>
          )}

          {/* {singleDriver?.[0]?.tourName && (
            <div className="col-xl-8">
              <div className="card">
              
                <img
                  src={`data:${singleDriver?.[0]?.tourPic?.contentType};base64,${singleDriver?.[2]}`}
                  alt="Profile"
                  className="img-fluid"
                />
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <h2>{singleDriver[0]?.tourName}</h2>
                  <h3>{singleDriver[0]?.tourLocation}</h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Car</th>
                          <td>{singleDriver[0]?.car?.carName}</td>
                        </tr>
                        <tr>
                          <th scope="row">Start Date</th>
                          <td>{singleDriver[0]?.startDate}</td>
                        </tr>
                        <tr>
                          <th scope="row">End Date</th>
                          <td>{singleDriver[0]?.endDate}</td>
                        </tr>
                      </tbody>
                    </table>
                    <h4>Description</h4>
                    <div {{dangerouslySetInnerHTML: <p>Je;;p</p>}}></div>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </section>
      <DeleteModal id={tourdelete} delete={deleteTour} />
    </main>
  );
};

export default AllTours;
