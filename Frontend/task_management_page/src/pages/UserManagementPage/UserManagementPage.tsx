import axios from "axios";
import { useEffect, useState } from "react";
import CreateTab from "./Tabs/CreateTab";
import DeleteTab from "./Tabs/DeleteTab";
import UpdateTab from "./Tabs/UpdateTab";
import type { UpdateFormData } from "./Types/UpdateType";
import { RefreshCcw, Trash2, UserPlus } from "lucide-react";
import type { UserType } from "./Types/UserType";

const UserManagementPage = () => {
  const [errorStatus, setErrorStatus] = useState("");

  const [createFormData, setCreateFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PasswordHash: "",
  });

  const [updateFormData, setUpdateFormData] = useState<UpdateFormData>({
    Id: 0,
    FirstName: "",
    LastName: "",
    Email: "",
    PasswordHash: "",
  });
  const token = sessionStorage.getItem("token");

  const handleCreate = () => {
    axios
      .post("http://localhost:5218/users/create_user", createFormData)
      .then((res) => setErrorStatus("User Successfully Created!"))
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response) {
          if (err.response?.status === 400) {
            setErrorStatus("User Already Exists");
          }
        }
      });
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:5218/users/update_user/${updateFormData.Id}`,
        updateFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setErrorStatus("User Successfully Updated!");
      })
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response) {
          if (err.response?.status === 401) {
            setErrorStatus("You are not authorized to perform this action.");
          }
        } else {
          setErrorStatus("Update Failed: " + err);
        }
      });
  };

  const handleDelete = (id: number) => {
    console.log("Deleting user with ID:", id);

    axios
      .delete(`http://localhost:5218/users/delete_user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setErrorStatus("User Successfully Deleted!");
      })
      .catch((err) => {
        if (axios.isAxiosError(err) && err.response) {
          if (err.response?.status == 401) {
            setErrorStatus("You are not authorized to perform this action.");
          } else if (err.response?.status === 400) {
            setErrorStatus("Bad Request: Unable to delete user.");
          }
        } else {
          setErrorStatus("Delete Failed: " + err);
        }
      });
  };
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showUpdateScreen, setShowUpdateScreen] = useState(false);
  const [showCreateScreen, setShowCreateScreen] = useState(false);

  const [users, setUsers] = useState<any[]>([]);
  const [curDeleteUser, setCurDeleteUser] = useState<UserType | null>(null);

  useEffect(() => {
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
        className="card shadow"
        style={{
          width: "100%",
          height: "fit-content",
          marginRight: "10px",
          marginLeft: "10px",

          backgroundColor: "#FFE5E0",
          alignSelf: "flex-start",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">Users </h5>
          <button
            className="btn btn-outline-danger"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={() => setShowCreateScreen(true)}
          >
            <UserPlus size={18} />
            Add User
          </button>
          <div style={{ maxHeight: "600px", overflowY: "auto" }}>
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Update Details</th>
                  <th scope="col">Delete User</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr>
                    <td>{u.id}</td>
                    <td>{u.first_name}</td>
                    <td>{u.last_name}</td>
                    <td>{u.email}</td>
                    <td> User's Role Here</td>

                    <td>
                      <button
                        className="btn btn-outline-danger"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                        onClick={() => {
                          setUpdateFormData({
                            Id: u.id,
                            FirstName: u.first_name,
                            LastName: u.last_name,
                            Email: u.email,
                            PasswordHash: u.password_hash,
                          });
                          // set delete 'form' data
                          setShowUpdateScreen(true);
                        }}
                      >
                        <RefreshCcw size={18} />
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                        onClick={() => {
                          setCurDeleteUser(u);
                          setShowDeleteWarning(true);
                        }}
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showCreateScreen && (
            <CreateTab
              formData={createFormData}
              setFormData={setCreateFormData}
              handleSubmit={handleCreate}
              hideCreate={() => setShowCreateScreen(false)}
              status={errorStatus}
            />
          )}

          {showUpdateScreen && (
            <UpdateTab
              formData={updateFormData}
              setFormData={setUpdateFormData}
              handleSubmit={handleUpdate}
              hideUpdate={() => setShowUpdateScreen(false)}
              status={errorStatus}
            />
          )}

          {showDeleteWarning && (
            <DeleteTab
              user={curDeleteUser}
              handleSubmit={handleDelete}
              hideDelete={() => setShowDeleteWarning(false)}
              status={errorStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import CreateTab from "./Tabs/CreateTab";
// import DeleteTab from "./Tabs/DeleteTab";
// import UpdateTab from "./Tabs/UpdateTab";
// import CreateResult from "./Results/CreateResult";
// import DeleteResult from "./Results/DeleteResult";
// import UpdateResult from "./Results/UpdateResult";
// import GetResult from "./Results/GetResult";
// import type { UpdateFormData } from "./Types/UpdateType";

//   return (
//     <div
//       style={{
//         backgroundColor: "#F28482",
//         minHeight: "100vh",
//         padding: "20px",
//         display: "flex",
//       }}
//     >
//       <div
//         style={{
//           // display: "flex",
//           // flex: 1,
//           // borderLeft: "1px solid",
//           padding: "10px",
//           height: "90%",
//           width: "30%",
//           border: 5,
//           boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//           backgroundColor: "#E1717B",
//           borderRadius: 5,
//         }}
//       >
//         <nav
//           className="navbar navbar-expand-lg"
//           style={{ backgroundColor: "rgba(231, 184, 188, 1.0)", width: "100%" }}
//         >
//           <div className="container-fluid">
//             <div className="navbar-nav" style={{ justifyContent: "center" }}>
//               <a
//                 className="nav-link"
//                 aria-current="page"
//                 href="#"
//                 onClick={() => {
//                   handleTabChange("create");
//                 }}
//                 style={{
//                   fontWeight: activeTab === "create" ? 800 : 400,
//                   marginLeft: 15,
//                   marginRight: 15,
//                   fontSize: 22,
//                 }}
//               >
//                 Create User
//               </a>
//               <a
//                 className="nav-link"
//                 href="#"
//                 onClick={() => {
//                   handleTabChange("update");
//                 }}
//                 style={{
//                   fontWeight: activeTab === "update" ? 800 : 400,
//                   marginLeft: 15,
//                   marginRight: 15,
//                   fontSize: 22,
//                 }}
//               >
//                 Update User
//               </a>

//               <a
//                 className="nav-link"
//                 href="#"
//                 onClick={() => {
//                   handleTabChange("delete");
//                 }}
//                 style={{
//                   fontWeight: activeTab === "delete" ? 800 : 400,
//                   marginLeft: 15,
//                   marginRight: 15,
//                   fontSize: 22,
//                 }}
//               >
//                 Delete User
//               </a>
//               {/* <a className="nav-link disabled" aria-disabled="true">
//               Disabled
//             </a> */}
//             </div>
//           </div>
//         </nav>
//         <br />

//         <div
//           style={{
//             backgroundColor: "rgba(231, 184, 188, 1.0)",
//             padding: "20px",
//             height: "100%",
//           }}
//         >
//           {activeTab === "create" && (
//             <CreateTab
//               formData={createFormData}
//               setFormData={setCreateFormData}
//             />
//           )}
//           {activeTab === "delete" && <DeleteTab />}
//           {activeTab === "update" && (
//             <UpdateTab
//               formData={updateFormData}
//               setFormData={setUpdateFormData}
//             />
//           )}

//           <button
//             type="button"
//             className="btn btn-outline-danger"
//             onClick={() => handleSubmit()}
//           >
//             Complete
//           </button>
//         </div>

//         <br />

//         <div
//           style={{
//             backgroundColor: "rgba(231, 184, 188, 1.0)",
//             padding: "20px",
//             height: "100%",
//           }}
//         >
//           {activeTab === "create" && <CreateResult />}
//           {activeTab === "delete" && <DeleteResult />}
//           {activeTab === "update" && <UpdateResult />}
//         </div>
//       </div>
//       <div
//         className="card shadow"
//         style={{
//           width: "70%",
//           height: "fit-content",
//           marginRight: "10px",
//           marginLeft: "25px",

//           backgroundColor: "#FFE5E0",
//           alignSelf: "flex-start",
//         }}
//       >
//         <div className="card-body">
//           <h5 className="card-title">Users List</h5>
//           <div style={{ maxHeight: "600px", overflowY: "auto" }}>
//             <table className="table table-striped table-hover table-bordered">
//               <thead>
//                 <tr>
//                   <th scope="col">ID</th>
//                   <th scope="col">First Name</th>
//                   <th scope="col">Last Name</th>
//                   <th scope="col">Email</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((u) => (
//                   <tr>
//                     <td>{u.id}</td>
//                     <td>{u.first_name}</td>
//                     <td>{u.last_name}</td>
//                     <td>{u.email}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserManagementPage;
