const FORM_REGISTER_VALIDATOR = {
  Email: (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  Nome: (value) => value.length > 1 && value.length <= 70,
  Senha: (value) => value.length > 6 && value.length <= 30,
  DataNascimento: (value) => value instanceof Date && !isNaN(value),
  Estado: (value) => value.length > 1,
  Cidade: (value) => value.length > 1,
  Telefone: (value) => value,
  Sexo: (value) => value === 1 || value === 2,
}
