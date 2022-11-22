import "./Form.component.styles.css"

export function Form({ onSubmit, children, name }) {
  return <form action={() => onSubmit()}>{children}</form>
}
