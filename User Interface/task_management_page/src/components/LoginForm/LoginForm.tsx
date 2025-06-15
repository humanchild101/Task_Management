const LoginForm = () => {
  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle">
        <form
          className="p-4 border rounded shadow bg-white"
          style={{ width: "400px" }}
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
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
          </div>

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
