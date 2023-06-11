import cls from "./FormLayout.module.css";

const FormLayout = ({ children, header, decor = false }) => {
  const classes = "col-12 d-flex justify-content-center rounded formLayout";
  const classesDecor = `${cls.FormFade} ${classes} bg-white shadow border formLayout`;
  return (
    <div className={decor ? classesDecor : classes}>
      <div className="p-4 w-100">
        <h2 className="text-center mb-3">{header}</h2>
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
