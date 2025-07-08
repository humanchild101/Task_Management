import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get("http://localhost:5218/users/home", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user", err));

    axios
      .get("http://localhost:5218/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching all users", err));
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#6AA7C8",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <nav
          className="navbar rounded"
          style={{
            margin: "5px",
            backgroundColor: "#40718B",
            padding: "12px 24px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <div className="container-fluid">
            <span
              className="navbar-brand mb-0 h1"
              style={{ color: "white", fontSize: "30px" }}
            >
              {user
                ? `Welcome, ${user.first_name} ${user.last_name}`
                : "Unable to Load User Name"}
            </span>
          </div>
        </nav>

        <div className="card w-90 shadow ms-1 me-1">
          <div className="card-body">
            <h5 className="card-title">Users List</h5>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr>
                      <td>{u.id}</td>
                      <td>{u.first_name}</td>
                      <td>{u.last_name}</td>
                      <td>{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
