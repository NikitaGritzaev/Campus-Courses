import { Spinner } from "react-bootstrap";
const Loader = () => (
  <div className="d-flex mt-5">
    <Spinner animation="grow" variant="info" className="mx-2" />
    <Spinner animation="grow" variant="warning" className="mx-2" />
    <Spinner animation="grow" variant="success" className="mx-2" />
  </div>
);

export default Loader;
