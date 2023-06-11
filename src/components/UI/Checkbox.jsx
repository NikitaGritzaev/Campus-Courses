import { useController } from "react-hook-form";

function Checkbox({ id, label, control, ...props }) {
  const { field, fieldState } = useController({
    name: id,
    control,
    defaultValue: false,
  });
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={id}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value || false}
        {...props}
      />
      <label htmlFor={id} className="form-check-label">
        {label}
      </label>
      <p className="fw-bold text-danger">{fieldState?.error?.message}</p>
    </div>
  );
}

export default Checkbox;
