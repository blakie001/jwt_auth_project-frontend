import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import { LoginFailure, LoginStart } from "../context/Action";

function Login() {
  const { dispatch, token} = useContext(Context);
  const [internalError, setInternalError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginStart());

    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { token } = res.data;

      localStorage.removeItem("token");
      sessionStorage.removeItem("token");

      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("rememberMe", "true");
      } else {
        sessionStorage.setItem("token", token);
        localStorage.removeItem("rememberMe");
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: token });

    } catch (error) {
      console.log(error);
      dispatch(LoginFailure());
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

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
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
                      Login.
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          placeholder="Email"
                          id="form3Example3cg"
                          onChange={handleChange}
                          value={data.email}
                          name="email"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          id="form3Example4cg"
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
                      <div className="d-flex justify-content-center">
                        <Link to={"/forgot-password"}>
                          <span className="fw-bold text-body">
                            <u>Forgot Password ? </u>
                          </span>
                        </Link>
                      </div>
                      
                      <br />

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={handleRememberMe}
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3cg"
                        >
                          Remember Me
                        </label>
                      </div>

                      {internalError && (
                        <p style={{ color: "red", textAlign: "center" }}>
                          {internalError + "!"}
                        </p>
                      )}
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-outline-primary"
                          style={{ marginTop: "14px" }}
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      <div className="extraContent">
                        <p className="text-center text-muted mt-2">
                          Don't have an account?{" "}
                          <Link to={"/signup"}>
                            <span className="fw-bold text-body">
                              <u>Register here</u>
                            </span>
                          </Link>
                        </p>
                      </div>
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

export default Login;