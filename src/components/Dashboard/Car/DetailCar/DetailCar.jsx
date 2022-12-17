import React, { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import CustomizedSnackbars from "../../../CustomizedSnackbars";

const DetailCar = () => {
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "",
    });
    const { id } = useParams();
    const [singleCar, setSingleCar] = useState({});
    const getCardetails = () => {
        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/car/get-car/${id}`)
            .then((res) => {
                setSingleCar(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        getCardetails();
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

    return (
        <div id="main" className="main">
            <PageTitle name={"Car Details"} />
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
                                    src={singleCar?.profilePicture}
                                    sx={{
                                        borderRadius: 4,
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                    }}
                                />

                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Box
                                    key={singleCar?.firstName}
                                    sx={{ display: "flex", flexDirection: "row", mb: 2 }}
                                >
                                    <Box>
                                        <table className="table table-responsive">
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Brand</th>
                                                    <td>{singleCar?.carBrand?.name}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Color</th>
                                                    <td>{singleCar?.carColor}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Seats</th>
                                                    <td>{singleCar?.seatsLeft}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Number</th>
                                                    <td>{singleCar?.carNumber}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Driver</th>
                                                    <td>
                                                        {singleCar?.carDriver?.firstName}{" "}
                                                        {singleCar?.carDriver?.lastName}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Price</th>
                                                    <td>{singleCar?.carPrice || "0"} PKR/Day</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Price per seat</th>
                                                    <td>{singleCar?.pricePerSeat || "0"} PKR/Day</td>
                                                </tr>
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

export default DetailCar;
