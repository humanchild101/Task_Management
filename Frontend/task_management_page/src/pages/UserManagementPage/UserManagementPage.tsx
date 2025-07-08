import axios from "axios";
import { useEffect, useState } from "react";
import CreateTab from "./Tabs/CreateTab";
import DeleteTab from "./Tabs/DeleteTab";
import UpdateTab from "./Tabs/UpdateTab";
import GetTab from "./Tabs/GetTab";
import CreateResult from "./Results/CreateResult";
import DeleteResult from "./Results/DeleteResult";
import UpdateResult from "./Results/UpdateResult";
import GetResult from "./Results/GetResult";
import type { UpdateFormData } from "./Types/UpdateType";

const UserManagementPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [createFormData, setCreateFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PasswordHash: "",
  });

  const [updateFormData, setUpdateFormData] = useState<UpdateFormData>({
    FirstName: "",
    LastName: "",
    Email: "",
    PasswordHash: "",
  });

  const [getFormData, setGetFormData] = useState({
    Email: "",
  });

  const [deleteAccount, setDeleteAccount] = useState(false);
  const [wantedUser, setWantedUser] = useState<any>(null);

  //const

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);

    setCreateFormData({
      FirstName: "",
      LastName: "",
      Email: "",
      PasswordHash: "",
    });

    setUpdateFormData({
      FirstName: "",
      LastName: "",
      Email: "",
      PasswordHash: "",
    });

    setGetFormData({ Email: "" });

    setDeleteAccount(false);
  };

  const handleSubmit = () => {
    if (activeTab == "create") {
      axios.post("http://localhost:5218/users/create_user", createFormData);
    } else if (activeTab == "update") {
      axios.put("http://localhost:5218/users/update_user", updateFormData);
    } else if (activeTab == "find") {
      axios
        .get("http://localhost:5218/users/get_user")
        .then(() => setWantedUser(getFormData));
    } else if (activeTab == "delete") {
      axios.delete("http://localhost:5218/users/delete_user");
      setDeleteAccount(true);
    }
  };

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get("http://localhost:5218/users/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching all users", err));
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#F28482",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
      }}
    >
      <div
        style={{
          // display: "flex",
          // flex: 1,
          // borderLeft: "1px solid",
          padding: "10px",
          height: "90%",
          width: "30%",
          border: 5,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          backgroundColor: "#E1717B",
          borderRadius: 5,
        }}
      >
        <nav
          className="navbar navbar-expand-lg"
          style={{ backgroundColor: "rgba(231, 184, 188, 1.0)", width: "100%" }}
        >
          <div className="container-fluid">
            <div className="navbar-nav" style={{ justifyContent: "center" }}>
              <a
                className="nav-link"
                aria-current="page"
                href="#"
                onClick={() => {
                  handleTabChange("create");
                }}
                style={{
                  fontWeight: activeTab === "create" ? 800 : 400,
                  marginLeft: 15,
                  marginRight: 15,
                  fontSize: 22,
                }}
              >
                Create User
              </a>
              <a
                className="nav-link"
                href="#"
                onClick={() => {
                  handleTabChange("update");
                }}
                style={{
                  fontWeight: activeTab === "update" ? 800 : 400,
                  marginLeft: 15,
                  marginRight: 15,
                  fontSize: 22,
                }}
              >
                Update User
              </a>
              <a
                className="nav-link"
                href="#"
                onClick={() => {
                  handleTabChange("find");
                }}
                style={{
                  fontWeight: activeTab === "find" ? 800 : 400,
                  marginLeft: 15,
                  marginRight: 15,
                  fontSize: 22,
                }}
              >
                Find User
              </a>
              <a
                className="nav-link"
                href="#"
                onClick={() => {
                  handleTabChange("delete");
                }}
                style={{
                  fontWeight: activeTab === "delete" ? 800 : 400,
                  marginLeft: 15,
                  marginRight: 15,
                  fontSize: 22,
                }}
              >
                Delete User
              </a>
              {/* <a className="nav-link disabled" aria-disabled="true">
              Disabled
            </a> */}
            </div>
          </div>
        </nav>
        <br />

        <div
          style={{
            backgroundColor: "rgba(231, 184, 188, 1.0)",
            padding: "20px",
            height: "100%",
          }}
        >
          {activeTab === "create" && (
            <CreateTab
              formData={createFormData}
              setFormData={setCreateFormData}
            />
          )}
          {activeTab === "delete" && <DeleteTab />}
          {activeTab === "update" && (
            <UpdateTab
              formData={updateFormData}
              setFormData={setUpdateFormData}
            />
          )}
          {activeTab === "find" && <GetTab />}

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => handleSubmit()}
          >
            Complete
          </button>
        </div>

        <br />

        <div
          style={{
            backgroundColor: "rgba(231, 184, 188, 1.0)",
            padding: "20px",
            height: "100%",
          }}
        >
          {activeTab === "create" && <CreateResult />}
          {activeTab === "delete" && <DeleteResult />}
          {activeTab === "update" && <UpdateResult />}
          {activeTab === "find" && <GetResult />}
        </div>
      </div>
      <div
        className="card shadow"
        style={{
          width: "70%",
          height: "fit-content",
          marginRight: "10px",
          marginLeft: "25px",

          backgroundColor: "#FFE5E0",
          alignSelf: "flex-start",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">Users List</h5>
          <div style={{ maxHeight: "600px", overflowY: "auto" }}>
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
  );
};

export default UserManagementPage;
