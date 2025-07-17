import { Info, TriangleAlert } from "lucide-react";
import { useState } from "react";
import type { UserType } from "../Types/UserType";

interface Props {
  user: UserType | null;
  handleSubmit: (id: number) => void;
  hideDelete: () => void;
  status?: string;
}

const DeleteTab = ({ user, handleSubmit, hideDelete, status }: Props) => {
  const [showError, setShowError] = useState(false);
  return (
    <>
      <div className="modal show" tabIndex={-1} style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {user && (
                  <b
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: 18,
                    }}
                  >
                    <TriangleAlert size={23} />
                    Are you sure you want to delete this account?
                  </b>
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={hideDelete}
              ></button>
            </div>
            <div
              className="modal-body"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                  onClick={hideDelete}
                  style={{ width: "180px", marginRight: 20 }}
                >
                  <b>
                    No, Do <i>Not</i> Delete
                  </b>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    user ? handleSubmit(user.id) : handleSubmit(-1);
                    setShowError(true);
                  }}
                >
                  <b>Yes, Delete This Account</b>
                </button>
              </div>
              {status && showError && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
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
                onClick={hideDelete}
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

export default DeleteTab;
