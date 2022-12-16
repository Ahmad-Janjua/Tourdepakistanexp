import React from "react";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Orders = () => {
  const [requests, setRequests] = useState();
  const [update, setUpdate] = useState(false);
  const [tour, setTour] = useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deletetype, setDeleteType] = useState(null);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleToggleAlert = () => {
    setAlert({ ...alert, open: !alert.open });
  };

  const handleClickOpenDelete = (id, dltype) => {
    setOpenDelete(!openDelete);
    setDeleteId(id);
    if (dltype) {
      setDeleteType(dltype);
    }
  };

  const handleConfirmDelete = (id, deletetype) => {
    if (deletetype == "travel") {
      deleteRequest(id);
    } else if (deletetype == "tour") {
      deleteTour(id);
    }
    setOpenDelete(!openDelete);
  };

  useEffect(() => {
    (async () => {
      const rentRquest = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/travelDetails/get-travels`
      );
      setRequests(rentRquest?.data);
      const tourRequest = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/booktour/tourrequest`
      );
      setTour(tourRequest?.data);
      console.log(tourRequest?.data);
    })();
  }, [update]);

  async function deleteRequest(id, email) {
    try {
      const rentRquest = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/travelDetails/delete-travels/${id}`
      );
      if (rentRquest?.status == 200) {
        setAlert({
          open: true,
          message: "Deleted the rent request",
          type: "success",
        });
        setUpdate(!update);
      }
    } catch (err) {
      setAlert({
        open: true,
        message: err?.response?.data?.message,
        type: "error",
      });
    }
  }
  async function approveRequest(id, customerId) {
    try {
      const rentRquest = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/travelDetails/update-travels/${id}/${customerId}`
      );
      if (rentRquest?.status == 200) {
        setAlert({
          open: true,
          message: "Approved the rent request",
          type: "success",
        });

        setUpdate(!update);
      } else {
      }
    } catch (err) {
      setAlert({
        open: true,
        message: err?.response?.data?.message,
        type: "error",
      });
    }
  }
  async function approveTour(id, customerId) {
    try {
      let response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/booktour/approveStatus/${id}/${customerId}`
      );
      console.log(customerId);
      if (response?.status == 200) {
        setAlert({
          open: true,
          message: "Approved the tour request",
          type: "success",
        });
      }
      setUpdate(!update);
    } catch (err) {
      setAlert({
        open: true,
        message: err?.response?.data?.message,
        type: "error",
      });
    }
  }
  async function deleteTour(id) {
    try {
      let response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/booktour/deletetour/${id}`
      );
      if (response?.status == 200) {
        setAlert({
          open: true,
          message: "Deleted the tour request",
          type: "success",
        });
      }
      setUpdate(!update);
    } catch (err) {
      setAlert({
        open: true,
        message: err?.response?.data?.message,
        type: "error",
      });
    }
  }

  const viewPaymentImage = (url) => {
    window.open(url, "_blank");
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  console.log(tour)
  return (
    <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="filter">
          <a className="icon" href="#" data-bs-toggle="dropdown">
            <i className="bi bi-three-dots"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
              <h6>Filter</h6>
            </li>

            <li>
              <a className="dropdown-item" href="#">
                Today
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                This Month
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                This Year
              </a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <h5 className="card-title">All Travel Requests</h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Customer</th>
                <th scope="col">Contact</th>
                <th scope="col">Days</th>
                <th scope="col">Destination</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((req, index) => req.status === 'pending' && (
                <tr key={index}>
                  <th scope="row">
                    <a href="#">#{index + 1}</a>
                  </th>
                  <td>
                    {req?.customer?.firstName} {req?.customer?.lastName}
                  </td>
                  <td>{req?.customer?.contactNumber}</td>
                  <td>{req?.days}</td>
                  <td>
                    <a href="#" className="text-primary">
                      {req?.destination}
                    </a>
                  </td>
                  <td>{req.car?.carPrice * req?.days || 0} Pkr</td>
                  <td>
                    {req.status == "approve" && (
                      <span className="badge bg-success">Approved</span>
                    )}
                    {req.status == "pending" && (
                      <span className="badge bg-warning">Pending</span>
                    )}
                  </td>
                  <td className="d-flex gap-2">
                    {req.status !== "approve" && (
                      <Button
                        variant="contained"
                        type="submit"
                        size="small"
                        sx={{
                          backgroundColor: "#4154F1",
                          color: "#fff",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#4154F1",
                            color: "#fff",
                          },
                        }}
                        onClick={(e) =>
                          approveRequest(req?._id, req?.customer?._id)
                        }
                      >
                        Approve
                      </Button>
                    )}
                    <Button
                      className="btn btn-small btn-danger"
                      color="error"
                      variant="contained"
                      size="small"
                      sx={{
                        fontWeight: "bold",
                      }}
                      onClick={(e) => handleClickOpenDelete(req?._id, "travel")}
                    >
                      Delete
                    </Button>
                    {req?.paymentPic ? (
                      <Button
                        className="btn btn-small btn-success"
                        color="success"
                        variant="contained"
                        size="small"
                        sx={{
                          fontWeight: "bold",
                        }}
                        onClick={() => viewPaymentImage(req?.paymentPic)}
                      >
                        Payment
                      </Button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
              {requests?.length == 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    No Requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card-body">
          <h5 className="card-title">All Tour Requests</h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Customer</th>
                <th scope="col">Contact</th>
                <th scope="col">Seats</th>
                <th scope="col">Tour Name</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {tour?.map((req, index) => req.status === "pending" &&   (
                <tr key={index}>
                  <th scope="row">
                    <a href="#">#{index + 1}</a>
                  </th>
                  <td>
                    {req?.customer?.firstName} {req?.customer?.lastName}
                  </td>
                  <td>{req?.customer?.contactNumber}</td>
                  <td>{req?.seats}</td>
                  <td>{req?.tour?.tourName}</td>
                  <td>{req?.seats * req?.tour?.car?.carPrice || 0} Pkr</td>

                  <td>
                    {req?.status == "approved" && (
                      <span className="badge bg-success">Approved</span>
                    )}
                    {req?.status == "pending" && (
                      <span className="badge bg-warning">Pending</span>
                    )}
                  </td>
                  <td className="d-flex gap-2">
                    {req.status !== "approved" && (
                      <Button
                        variant="contained"
                        type="submit"
                        size="small"
                        sx={{
                          backgroundColor: "#4154F1",
                          color: "#fff",
                          fontWeight: "bold",
                          "&:hover": {
                            backgroundColor: "#4154F1",
                            color: "#fff",
                          },
                        }}
                        onClick={(e) =>
                          approveTour(req?._id, req?.customer?._id)
                        }
                      >
                        Approve
                      </Button>
                    )}
                    <Button
                      className="btn btn-small btn-danger"
                      color="error"
                      variant="contained"
                      size="small"
                      sx={{
                        fontWeight: "bold",
                      }}
                      onClick={(e) => handleClickOpenDelete(req?._id, "tour")}
                    >
                      Delete
                    </Button>

                    {req?.paymentPic ? (
                      <Button
                        className="btn btn-small btn-success"
                        color="success"
                        variant="contained"
                        size="small"
                        sx={{
                          fontWeight: "bold",
                        }}
                        onClick={() => viewPaymentImage(req?.paymentPic)}
                      >
                        Payment
                      </Button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
              {tour?.length == 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    No Requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={openDelete}
        onClose={handleClickOpenDelete}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Delete ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this request this action cannot be
            undone ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClickOpenDelete}>
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmDelete(deleteId, deletetype)}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        autoHideDuration={3000}
        onClose={handleToggleAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alert.open}
        key={"top" + "right"}
      >
        <Alert onClose={handleToggleAlert} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Orders;
