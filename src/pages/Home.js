import React, { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

function Home() {
  const { dispatch } = useContext(Context);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    setIsLoggedOut(true);
    navigate("/login");
  };

  if(isLoggedOut) {
    navigate("/login");
  }

  return (
    <div
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
                <div className="card-body p-5 text-center">
                  <h2
                    className="text-uppercase mb-4"
                    style={{ marginTop: "-2px", marginBottom: "2px" }}
                  >
                    Welcome Home
                  </h2>
                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <button
                      className="btn btn-outline-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;