import { Info, TriangleAlert } from "lucide-react";
import type { CreateFormData } from "../Types/CreateType";
import { useState } from "react";

interface Props {
  formData: CreateFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateFormData>>;
  handleSubmit: () => void;
  hideCreate: () => void;
  status?: string;
}

const CreateTab: React.FC<Props> = ({
  formData,
  setFormData,
  handleSubmit,
  hideCreate,
  status,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [showError, setShowError] = useState(false);
  return (
    <>
      <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <b style={{ fontSize: 20 }}>Create a new user account</b>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideCreate}
              ></button>
            </div>
            <div className="modal-body">
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
                  placeholder="John"
                  aria-label="First Name"
                  aria-describedby="basic-addon1"
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
                  placeholder="Doe"
                  aria-label="Last Name"
                  aria-describedby="basic-addon1"
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
                  placeholder="pR0j3<+_M@na9em3πt"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </div>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  handleSubmit();
                  setShowError(true);
                }}
                style={{ marginBottom: 10 }}
              >
                Create User
              </button>
              {status && showError && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Info size={18} />
                  {status}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                      setShowError(false);
                    }}
                  ></button>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
                onClick={hideCreate}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
};

export default CreateTab;
