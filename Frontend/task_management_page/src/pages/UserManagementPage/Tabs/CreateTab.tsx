import type { CreateFormData } from "../Types/CreateType";

interface Props {
  formData: CreateFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateFormData>>;
}

const CreateTab: React.FC<Props> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <b>
        <p style={{ fontSize: 20 }}>Create a new user account</p>
      </b>

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
    </>
  );
};

export default CreateTab;
