import React, { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import CustomizedSnackbars from "../../../CustomizedSnackbars";

const DetailCustomer = () => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const getCustomerdetails = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/customer/get-customer/${id}`
      )
      .then((res) => {
        setCustomer(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCustomerdetails();
  }, []);

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

  function getDateStr(date) {
    let tdate = new Date(date);
    return (
      tdate.getDate() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear()
    );
  }

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

  return (
    <div id="main" className="main">
      <PageTitle name={"Customer Details"} />
      <Card className="px-3">
        <Box component="section">
          <Container maxWidth="xl" sx={{ py: 6 }}>
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item xs={12} md={4}>
                <Box
                  alt="tourimagee"
                  component="img"
                  src={customer?.profilePicture}
                  sx={{
                    borderRadius: 4,
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography sx={{ mb: 2 }} variant="h4">
                  {customer?.firstName} {customer?.lastName}
                </Typography>

                <Box
                  key={customer?.firstName}
                  sx={{ display: "flex", flexDirection: "row", mb: 2 }}
                >
                  <Box>
                    <table className="table table-responsive">
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <td>{customer?.firstName}</td>
                        </tr>

                        {customer?.CNIC ? (
                          <tr>
                            <th scope="row">CNIC</th>
                            <td>{customer?.CNIC}</td>
                          </tr>
                        ) : (
                          ""
                        )}

                        {customer?.dateOfBirth ? (
                          <>
                            <tr>
                              <th scope="row">Age</th>
                              <td>{CalCulateAge(customer?.dateOfBirth)}</td>
                            </tr>
                            <tr>
                              <th scope="row">Date of birth</th>
                              <td>{getDateStr(customer?.dateOfBirth)}</td>
                            </tr>
                          </>
                        ) : (
                          ""
                        )}
                        {customer?.email ? (
                          <tr>
                            <th scope="row">Email</th>
                            <td>{customer?.email}</td>
                          </tr>
                        ) : (
                          ""
                        )}
                        {customer?.optionalContactNumber ? (
                          <tr>
                            <th scope="row">Other Contact Number</th>
                            <td>{customer?.optionalContactNumber}</td>
                          </tr>
                        ) : (
                          ""
                        )}
                        {customer?.address ? (
                          <tr>
                            <th scope="row">address</th>
                            <td>{customer?.address}</td>
                          </tr>
                        ) : (
                          ""
                        )}
                        {customer?.gender ? (
                          <tr>
                            <th scope="row">Gender</th>
                            <td>{customer?.gender}</td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </table>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Card>
      <CustomizedSnackbars alert={alert} />
    </div>
  );
};

export default DetailCustomer;
