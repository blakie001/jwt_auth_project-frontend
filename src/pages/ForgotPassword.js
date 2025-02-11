import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [data, setData] = useState({
    username: "",
    email: "",
    newPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:3001/password/reset", {
        username: data.username,
        email: data.email,
        newPassword: data.newPassword,
      });

      if (res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data || "An error occurred. Please try again.");
    }
  };

  return (
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
                    Forgot Password
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        onChange={handleChange}
                        value={data.username}
                        name="username"
                        className="form-control form-control-lg"
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange}
                        value={data.email}
                        name="email"
                        className="form-control form-control-lg"
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        placeholder="New Password"
                        id="newPassword"
                        onChange={handleChange}
                        value={data.newPassword}
                        name="newPassword"
                        className="form-control form-control-lg"
                        required
                      />
                    </div>

                    {error && (
                      <p style={{ color: "red", textAlign: "center" }}>{error}</p>
                    )}

                    {success && (
                      <p style={{ color: "green", textAlign: "center" }}>
                        Password updated successfully! Redirecting to login...
                      </p>
                    )}

                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-outline-primary"
                        style={{ marginTop: "14px" }}
                        type="submit"
                      >
                        Update Password
                      </button>
                    </div>

                    <div className="extraContent">
                      <p className="text-center text-muted mt-2">
                        Remember your password?{" "}
                        <Link to={"/login"}>
                          <span className="fw-bold text-body">
                            <u>Login here</u>
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
  );
}

export default ForgotPassword;