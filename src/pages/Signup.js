import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/Context";
import { RegisterFailure, RegisterStart, RegisterSuccess } from "../context/Action";

function Register() {
  const { dispatch } = useContext(Context);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [internalError, setInternalError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setInternalError("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      setInternalError("You must accept the terms and conditions");
      return;
    }

    dispatch(RegisterStart());

    try {
      const res = await axios.post("http://localhost:3001/auth/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      // localStorage.setItem("token", res.data.token);

      dispatch(RegisterSuccess(res.data.user));
      navigate("/login");
    } catch (error) {
      console.log(error)
      dispatch(RegisterFailure());
      if (error?.response?.data) {
        setInternalError(error.response.data);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInternalError(null);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  return (
    <>
      <section
        className="vh-100 bg-image"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/music-notes_207634-10616.jpg?w=740')",
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2
                      className="text text-center mb-4"
                      style={{ marginTop: "-2px", marginBottom: "2px" }}
                    >
                      Signup. New User 
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          placeholder="Username"
                          id="form3Example1cg"
                          name="username"
                          onChange={handleChange}
                          value={data.username}
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          placeholder="Email"
                          id="form3Example2cg"
                          name="email"
                          onChange={handleChange}
                          value={data.email}
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          id="form3Example3cg"
                          onChange={handleChange}
                          value={data.password}
                          name="password"
                          className="form-control form-control-lg"
                          required
                        />
                        <button
                          className="btn btn-outline-primary"
                          style={{ marginTop: "14px" }}
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide Password" : "Show Password"}
                        </button>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          id="form3Example4cg"
                          name="confirmPassword"
                          onChange={handleChange}
                          value={data.confirmPassword}
                          className="form-control form-control-lg"
                          required
                        />
                      </div>

                      {internalError && (
                        <p style={{ color: "red", textAlign: "center" }}>
                          {internalError}
                        </p>
                      )}

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={handleTermsChange}
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3cg"
                        >
                          I agree to all statements in Terms of Services.
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Already have an account?{" "}
                        <Link to={"/login"}>
                          <span className="fw-bold text-body">
                            <u>Login here</u>
                          </span>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;