import "./FormField.components.styles.css"

export function FormField({
  label,
  type,
  name,
  isHalf,
  onChange,
  placeholder = "",
  children,
}) {
  if (type === "radio") {
    return (
      <div className={`div-form-field ${isHalf ? "field-half" : "field-full"}`}>
        <label htmlFor={name}>{label}</label>
        <div className="div-form-field-radio">{children}</div>
      </div>
    )
  } else {
    return (
      <div className={`div-form-field ${isHalf ? "field-half" : "field-full"}`}>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={(event) => onChange(event)}
        />
      </div>
    )
  }
}
