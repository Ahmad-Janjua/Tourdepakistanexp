import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import "./Forgot.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "../CustomizedSnackbars";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpMsg, setOtpMsg] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [otpSendMsg, setOtpSendMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [passMsg, setPassMsg] = useState("");
  const handleCheckValidEmail = (e) => {
    // check if email is valid
    const email = e.target.value;
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      setError("");
    } else {
      setError("Email is not valid");
    }
  };

  const onSubmit = (data) => {
    setEmail(data.email);
    const email = data.email;
    // send otp to email
    const otpsendurl = `${import.meta.env.VITE_BACKEND_URL}/api/admin/send-otp`;
    axios
      .post(otpsendurl, { email })
      .then((res) => {
        setOtpSent(true);
        setOtpSendMsg(res.data.message);
        handleSetTimer();
      })
      .catch((err) => {
        console.log(err);
        setError("Email is not registered");
      });
  };

  const handleSetTimer = () => {
    const timer = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      setOtpTimer(60);
    }, 60000);
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);

    if (otp.length > 3) {
      setOtpMsg("");
    }
  };

  const handleVerifyOtp = () => {
    const otpverifyurl = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/admin/verify-otp`;
    const data = {
      otp,
      email,
    };
    axios
      .post(otpverifyurl, data)
      .then((res) => {
        setOtpVerified(true);
        setOtpMsg(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setOtpMsg("Invalid OTP");
      });
  };
  const handleChangepasswordSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log(password, confirmPassword);
      const changepasswordurl = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/reset-password`;
      const data = {
        email,
        password: password,
      };
      axios
        .post(changepasswordurl, data)
        .then((res) => {
          setPassMsg(res.data.message);

          setAlert({
            open: true,
            message: res.data.message,
            type: "success",
          });

          setTimeout(() => {
            navigate("/");
          }, 3000);
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
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  if (otpVerified) {
    return (
      <main>
        <CustomizedSnackbars alert={alert} />
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <Link
                      to={"/"}
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logo.png" alt="" />
                      <span className="d-none d-lg-block">
                        Tours And Travels Admin
                      </span>
                    </Link>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Reset Password
                        </h5>
                      </div>
                      <form
                        className="row g-3 needs-validation"
                        onSubmit={(e) => handleChangepasswordSubmit(e)}
                      >
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="validationCustom01"
                          onChange={(e) => handleChangePassword(e)}
                          placeholder="New Password"
                        />
                        {password === "" ? (
                          <span className="text-danger m-0 p-0">
                            Password is required
                          </span>
                        ) : (
                          ""
                        )}

                        <input
                          type="password"
                          className="form-control"
                          id="validationCustom01"
                          onChange={(e) => handleChangeConfirmPassword(e)}
                          placeholder="Confirm Password"
                        />
                        <span className="text-danger m-0 p-0">
                          {confirmPassword === ""
                            ? "Confirm Password is required"
                            : confirmPassword !== password
                            ? "Password does not match"
                            : ""}
                        </span>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Reset Password
                          </button>
                        </div>

                        <div className="col-12 text-center">
                          <p className="small mb-0">
                            <Link to={"/"}>Login to your account</Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link
                    to={"/"}
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">
                      Tours And Travels Admin
                    </span>
                  </Link>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Forgot Password
                      </h5>
                      <p className="text-center small">
                        {otpSent
                          ? otpSendMsg
                          : "Enter email address to reset password"}
                      </p>
                    </div>

                    <form
                      className="row g-3 needs-validation"
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      {otpSent ? (
                        <>
                          <div className="d-flex justify-content-center align-fields">
                            <OtpInput
                              value={otp}
                              className="otp-input"
                              onChange={(otp) => handleOtpChange(otp)}
                              numInputs={4}
                              separator={<span>-</span>}
                            />
                          </div>
                          <span className="error">
                            {otp === "" ? "Otp is required" : otpMsg}
                          </span>

                          <div className="col-12">
                            <button
                              className="btn btn-primary w-100"
                              type="button"
                              onClick={handleVerifyOtp}
                            >
                              Verify
                            </button>
                            <div className="resend-otp">
                              {otpTimer === 60 ? (
                                <button type="button" onClick={handleSetTimer}>
                                  <span>Resend Otp</span>
                                </button>
                              ) : (
                                <p>Otp is Expiring in {otpTimer} Secs</p>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="col-12">
                            <label
                              htmlFor="yourPassword"
                              className="form-label"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              onInput={(e) => handleCheckValidEmail(e)}
                              id="yourPassword"
                              {...register("email", {
                                required: "Email is required",
                              })}
                              required
                            />
                            <small className="text-danger">
                              {errors?.email?.message || error}
                            </small>
                          </div>

                          <div className="col-12">
                            <button
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              Send Otp
                            </button>
                          </div>
                        </>
                      )}

                      <div className="col-12 text-center">
                        <p className="small mb-0">
                          <Link to={"/"}>Login to your account</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ForgotPassword;
