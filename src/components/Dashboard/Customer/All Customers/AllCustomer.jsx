import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const AllCustomer = () => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singleCustomer, setSingleCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCustomer();
  }, [update]);

  // Function to get all customers

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

  const getCustomer = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/customer/get-customer`)
      .then((res) => {
        setCustomer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  function getDateStr(date) {
    let tdate = new Date(date);
    return (
      tdate.getDate() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear()
    );
  }

  // function to convert image to base64

  function showDetails(id) {
    let tempDriver = [...customer];
    let _details = tempDriver.filter((driver) => driver?._id == id);
    if (_details && _details.length !== 0) {
      setSingleCustomer(_details[0]);
    } else {
      setSingleCustomer({});
    }
  }
  function editCustomer(id) {
    navigate(`/dashboard/customer/update-customer/${id}`);
  }
  async function deleteCustomer(id) {
    try {
      const rawData = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/customer/delete-customer/${id}`
      );
      if (rawData.status == 200) {
        setUpdate(!update);
        alert("Customer deleted successfully");
      } else {
        alert("Customer deletion failed");
      }
    } catch (err) {}
  }

  const handleConfirmDelete = (id) => {
    const text = "Are you Sure to Delete";
    if (confirm(text) == true) {
      deleteCustomer(id);
    }
  };

  function customerDetails(id) {
    navigate(`/dashboard/customer/details-customer/${id}`);
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
      <PageTitle name={"All Customers"} />
      <section className="section dashboard">
        <div className="row">
          {customer?.length > 0 && (
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
                  {customer?.map((singleCustomer, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {singleCustomer?.firstName} {singleCustomer?.lastName}
                      </td>
                      {singleCustomer?.dateOfBirth && (
                        <td>{getDateStr(singleCustomer?.dateOfBirth)} </td>
                      )}
                      {!singleCustomer?.dateOfBirth && <td>--</td>}
                      <td>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => showDetails(singleCustomer?._id)}
                        >
                          Details
                        </button>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => editCustomer(singleCustomer?._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn"
                          type="button"
                          onClick={() =>
                            handleConfirmDelete(singleCustomer?._id)
                          }
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
          {customer?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No customers found
            </div>
          )}
          {Object.keys(singleCustomer).length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    style={{ width: `200px`, height: `200px` }}
                    src={singleCustomer?.profilePicture}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h2>
                    {singleCustomer?.firstName} {singleCustomer?.lastName}
                  </h2>
                  <h3>{singleCustomer?.contactNumber}</h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        {singleCustomer?.CNIC ? (
                          <tr>
                            <th scope="row">CNIC</th>
                            <td>{singleCustomer?.CNIC}</td>
                          </tr>
                        ) : (
                          ""
                        )}

                        {singleCustomer?.dateOfBirth ? (
                          <>
                            <tr>
                              <th scope="row">Age</th>
                              <td>
                                {CalCulateAge(singleCustomer?.dateOfBirth)}
                              </td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}
                        {singleCustomer?.email ? (
                          <tr>
                            <th scope="row">Email</th>
                            <td>{singleCustomer?.email}</td>
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
                      onClick={() => customerDetails(singleCustomer?._id)}
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
    </main>
  );
};

export default AllCustomer;
