import "./FormField.components.styles.css"

export function FormField({
  label,
  type,
  name,
  isHalf,
  onChange,
  placeholder = "",
  isTextArea,
  children,
  value,
  isMandatory = false,
  isError = false,
  content,
  maxLength,
}) {
  if (type === "radio") {
    return (
      <div className={`div-form-field ${isHalf ? "field-half" : "field-full"}`}>
        <label htmlFor={name}>{`${label} ${isMandatory ? "*" : ""}`}</label>
        <div className={`div-form-field-radio ${isError ? "radio-error" : ""}`}>
          {children}
        </div>
      </div>
    )
  }
  if (type === "select") {
    return (
      <div className={`div-form-field ${isHalf ? "field-half" : "field-full"}`}>
        <label htmlFor={name}>{`${label} ${isMandatory ? "*" : ""}`}</label>
        <select
          name={name}
          id={name}
          onChange={(event) => onChange(event)}
          value={value}
          className={isError ? "input-error" : ""}
        >
          <option disabled value={""}>
            {`Selecione um ${name}`}
          </option>
          {content.map((state, index) => {
            return (
              <option key={index} value={state}>
                {state}
              </option>
            )
          })}
        </select>
      </div>
    )
  } else {
    return (
      <div className={`div-form-field ${isHalf ? "field-half" : "field-full"}`}>
        <label htmlFor={name}>{`${label} ${isMandatory ? "*" : ""}`}</label>
        {isTextArea ? (
          <textarea
            className={isError ? "input-error" : ""}
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={(event) => onChange(event)}
            value={value}
          />
        ) : (
          <input
            className={isError ? "input-error" : ""}
            type={type}
            name={name}
            id={name}
            value={value}
            placeholder={placeholder}
            onChange={(event) => onChange(event)}
            maxLength={maxLength}
          />
        )}
      </div>
    )
  }
}
