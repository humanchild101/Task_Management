const DeleteTab = () => {
  return (
    <>
      <b>
        <p style={{ fontSize: 20 }}>Delete an existing user account</p>
      </b>

      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          Email
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="john.doe123@gmail.com"
          aria-label="Email"
          aria-describedby="basic-addon1"
        />
      </div>
    </>
  );
};

export default DeleteTab;
