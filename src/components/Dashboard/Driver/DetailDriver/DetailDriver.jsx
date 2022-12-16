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

const DetailDriver = () => {
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "",
    });
    const { id } = useParams();
    const [driver, setDriver] = useState({});
    const getDriverdetails = () => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/driver/get-driver/${id}`)
            .then((res) => {
                setDriver(res.data?.driver);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getDriverdetails();
    }, []);
    console.log(driver)

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
            <PageTitle name={"Driver Details"} />
            <Card className="px-3">
                <Box component="section">
                    <Container maxWidth="xl" sx={{ py: 6 }}>
                        <Grid
                            container
                            spacing={3}
                            sx={{ justifyContent: "space-between" }}
                        >
                            <Grid item xs={12} md={4}>
                                {driver?.profilePicture ?
                                    <Box
                                        alt="tourimagee"
                                        component="img"
                                        src={driver?.profilePicture}
                                        sx={{
                                            borderRadius: 4,
                                            width: "80%",
                                            height: "200px",
                                            objectFit: "cover",
                                        }}

                                    /> : ''}



                                <div className="row pb-4">
                                    {driver?.lcs_front ?
                                        <div className="col-md-6">
                                            <p className="p-0 m-0">License Front</p>
                                            <Box
                                                alt="tourimagee"
                                                component="img"
                                                src={driver?.lcs_front}
                                                sx={{
                                                    borderRadius: 4,
                                                    width: "90%",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div> : ''}
                                    {driver?.lcs_back ?
                                        <div className="col-md-6">
                                            <p className="p-0 m-0">License Back</p>
                                            <Box
                                                alt="tourimagee"
                                                component="img"
                                                src={driver?.lcs_back}
                                                sx={{
                                                    borderRadius: 4,
                                                    width: "90%",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            
                                        </div> : ''}
                                    {driver?.cnic_back ?
                                        <div className="col-md-6">
                                            <p className="p-0 m-0">CNIC Back</p>

                                            <Box
                                                alt="tourimagee"
                                                component="img"
                                                src={driver?.cnic_back}
                                                sx={{
                                                    borderRadius: 4,
                                                    width: "90%",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            
                                        </div> : ''}
                                    {driver?.cnic_front ?
                                        <div className="col-md-6">
                                            <p className="p-0 m-0">CNIC Front</p>
                                            <Box
                                                alt="tourimagee"
                                                component="img"
                                                src={driver?.cnic_front}
                                                sx={{
                                                    borderRadius: 4,
                                                    width: "90%",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                           
                                        </div> : ''}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Box
                                    key={driver?.firstName}
                                    sx={{ display: "flex", flexDirection: "row", mb: 2 }}
                                >
                                    <Box>
                                        <table className="table table-responsive">
                                            <tbody>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>{driver?.firstName}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">CNIC</th>
                                                    <td>{driver?.CNIC}</td>
                                                </tr>
                                                {driver?.dateOfBirth ?
                                                    <>
                                                        <tr>
                                                            <th scope="row">Age</th>
                                                            <td>
                                                                {CalCulateAge(driver?.dateOfBirth)}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Date of birth</th>
                                                            <td>
                                                                {getDateStr(driver?.dateOfBirth)}
                                                            </td>
                                                        </tr>
                                                    </> : ''}
                                                {driver?.CNIC ?
                                                    <tr>
                                                        <th scope="row">CNIC</th>
                                                        <td>{driver?.CNIC}</td>
                                                    </tr> : ''}

                                                {driver?.email ?
                                                    <tr>
                                                        <th scope="row">Email</th>
                                                        <td>
                                                            {driver?.email}
                                                        </td>
                                                    </tr> : ''}
                                                {driver?.optionalContactNumber ?
                                                    <tr>
                                                        <th scope="row">Other Contact Number</th>
                                                        <td>
                                                            {driver?.optionalContactNumber}
                                                        </td>
                                                    </tr> : ''}
                                                {driver?.address ?
                                                    <tr>
                                                        <th scope="row">address</th>
                                                        <td>
                                                            {(driver?.address)}
                                                        </td>
                                                    </tr> : ''}

                                                {driver?.licenseNumber ?
                                                    <tr>
                                                        <th scope="row">License Number</th>
                                                        <td>
                                                            {(driver?.licenseNumber)}
                                                        </td>
                                                    </tr> : ''}
                                                {driver?.gender ?
                                                    <tr>
                                                        <th scope="row">Gender</th>
                                                        <td>
                                                            {(driver?.gender)}
                                                        </td>
                                                    </tr> : ''}



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

export default DetailDriver;
