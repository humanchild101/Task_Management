import { useState } from "react";
import type { UpdateFormData } from "../Types/UpdateType";
import axios, { formToJSON } from "axios";

interface Props {
  formData: UpdateFormData;
  setFormData: React.Dispatch<React.SetStateAction<UpdateFormData>>;
}

const UpdateTab: React.FC<Props> = ({ formData, setFormData }) => {
  const [userFound, setUserFound] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckUser = async () => {
    setErrorStatus("");

    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.get("http://localhost:5218/users/get_user", {
        params: { Email: formData.Email },
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = response.data;
      console.log("Fetched user:", user);

      setFormData({
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName,
        PasswordHash: "",
      });

      setUserFound(true);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        if (status === 404) {
          setErrorStatus("User not found");
        } else if (status === 401) {
          setErrorStatus("Unauthorized — please log in");
        } else if (formData.Email == "") {
          setErrorStatus("Please enter a valid email");
        } else {
          setErrorStatus(`Error ${status}: ${err.response.statusText}`);
        }
      } else {
        setErrorStatus("An unexpected error occurred");
        setUserFound(false);
      }
      setUserFound(false);
      console.log(err);
    }
  };

  return (
    <>
      <b>
        <p style={{ fontSize: 20 }}>Update an existing user account</p>
      </b>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Email
        </span>
        <input
          type="text"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          className="form-control"
          placeholder="john.doe123@gmail.com"
          aria-label="Email"
          aria-describedby="basic-addon1"
        />
      </div>

      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={() => handleCheckUser()}
      >
        Check For User
      </button>

      {userFound && <p className="text-success">User found and loaded!</p>}
      {errorStatus && <p className="text-danger">{errorStatus}</p>}

      <br />
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          First Name
        </span>
        <input
          type="text"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
          className="form-control"
          placeholder={userFound ? "John" : "User info not available"}
          aria-label="First Name"
          aria-describedby="basic-addon1"
          disabled={!userFound}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Last Name
        </span>
        <input
          type="text"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
          className="form-control"
          placeholder={userFound ? "Doe" : "User info not available"}
          aria-label="Last Name"
          aria-describedby="basic-addon1"
          disabled={!userFound}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Password
        </span>
        <input
          type="text"
          name="PasswordHash"
          value={formData.PasswordHash}
          onChange={handleChange}
          className="form-control"
          placeholder={
            userFound ? "pR0j3<+_M@na9em3πt" : "User info not available"
          }
          aria-label="Password"
          aria-describedby="basic-addon1"
          disabled={!userFound}
        />
      </div>
    </>
  );
};

export default UpdateTab;
