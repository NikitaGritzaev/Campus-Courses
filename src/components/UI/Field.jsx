const Field = ({ label, ...props }) => (
  <>
    <label className="fs-5">{label}</label>
    <input
      disabled
      className="form-control form-control-lg my-2"
      {...props}
    />
  </>
);

export default Field;
