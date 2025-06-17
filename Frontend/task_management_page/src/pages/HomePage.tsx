import axios from "axios";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get("http://localhost:8000/users/home", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user", err));

    axios
      .get("http://localhost:8000/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching all users", err));
  }, []);

  return (
    <>
      <nav
        className="navbar rounded"
        style={{
          margin: "5px",
          backgroundColor: "#E97C75",
          padding: "12px 24px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            {user
              ? `Welcome, ${user.first_name} ${user.last_name}`
              : "Unable to Load User Name"}
          </span>
        </div>
      </nav>

      <div className="card w-50 shadow ms-1">
        <div className="card-body">
          <h5 className="card-title">All Users</h5>
          <ol className="list-group list-group-numbered">
            {users.map((u) => (
              <li className="list-group-item" key={u.id}>
                {u.first_name} {u.last_name} – {u.email}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default HomePage;
