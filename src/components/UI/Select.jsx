import { useController } from "react-hook-form";
import ReactSelect from "react-select";

function Select({ id, label, control, validator, ...props }) {
  const { field, fieldState } = useController({
    name: id,
    control,
    rules: validator,
  });
  const styles = {
    control: (provided, state) => ({
      ...provided,
      boxShadow: "none",
      border: fieldState?.error
        ? "1px solid #dc3545"
        : state.isFocused
        ? "1px solid #0d6efd"
        : "1px solid lightgray",
    }),
  };
  return (
    <div className="my-2">
      <label>{label}</label>
      <ReactSelect
        styles={styles}
        noOptionsMessage={() => "Ничего не найдено"}
        className="my-2 text-dark"
        onChange={field.onChange}
        value={field.value}
        {...props}
      />
      <p className="fw-bold text-danger">{fieldState?.error?.message}</p>
    </div>
  );
}

export default Select;
