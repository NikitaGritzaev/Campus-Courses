import { useController } from "react-hook-form";

function Textarea({ id, label, control, validator, ...props }) {
  const { field, fieldState } = useController({
    name: id,
    control,
    rules: validator,
  });
  return (
    <>
      <label htmlFor={id} className="fs-5">
        {label}
      </label>
      <textarea
        className={
          fieldState?.error
            ? "form-control form-control-lg my-2 is-invalid"
            : "form-control form-control-lg my-2"
        }
        id={id}
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value || ""}
        {...props}
      />
      <p className="fw-bold text-danger">{fieldState?.error?.message}</p>
    </>
  );
}

export default Textarea;
