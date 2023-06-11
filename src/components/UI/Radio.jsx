import { useController } from "react-hook-form";

function Radio({ id, label, control, options, defaultValue }) {
  const { field } = useController({
    name: id,
    control,
    defaultValue,
  });
  return (
    <div className="my-2">
      <label>{label}</label>
      <div>
        {options?.map((option) => (
          <div className="form-check form-check-inline" key={option.id}>
            <input
              className="form-check-input"
              type="radio"
              id={option.id}
              value={option.id}
              checked={field.value === option.id}
              onChange={field.onChange}
              disabled={option.disabled}
            />
            <label className="form-check-label" htmlFor={option.id}>
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Radio;
