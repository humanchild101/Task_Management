import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password_hash, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:8000/users/login", {
        email,
        password_hash,
      });

      const token = result.data.access_token;
      sessionStorage.setItem("token", token);

      console.log(result.data);
      setError("");
      navigate("/home");
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setError("Invalid User");
      } else if (err.response && err.response.status === 401) {
        setError("Incorrect Password");
      } else {
        setError("Unknown Error");
      }
    }
  };

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle">
        <form
          className="p-4 border rounded shadow bg-white"
          style={{ width: "400px", opacity: "0.9" }}
          onSubmit={handleSubmit}
        >
          <label>
            <h2>Login To Your Account</h2>
          </label>
          {/* Input Fields */}
          <div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password_hash}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
          </div>

          {error && (
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              <strong>⚠️</strong> {error}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setError("")}
              ></button>
            </div>
          )}

          {/*Submit button*/}
          <div className="d-grid">
            <button className="btn btn-outline-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
