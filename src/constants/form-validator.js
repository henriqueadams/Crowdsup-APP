export const FORM_REGISTER_VALIDATOR = {
  Email: (value) => value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  Nome: (value) => value.length > 1 && value.length <= 70,
  Senha: (value) => value.length > 6 && value.length <= 30,
  DataNascimento: (value) => value,
  Estado: (value) => value.length > 1,
  Cidade: (value) => value.length > 1,
  Telefone: (value) => value,
  Sexo: (value) => value === 1 || value === 2,
}

export const FORM_LOGIN_VALIDATOR = {
  Email: (value) => value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  Senha: (value) => value.length > 0,
}

export const FORM_EDIT_VALIDATOR = {
  Estado: (value) => value.length > 1,
  Cidade: (value) => value.length > 1,
  Telefone: (value) => value,
  FotoPerfil: (value) => value.length >= 0,
}

export const FORM_CREATE_EVENT_VALIDATOR = {
  Titulo: (value) => value.length > 1 && value.length < 200,
  Descricao: (value) => value.length > 5 && value.length < 500,
  Estado: (value) => value.length > 1,
  Cidade: (value) => value.length > 1,
  Bairro: (value) => value.length > 1,
  Rua: (value) => value.length > 1,
  Numero: (value) => value.length > 0,
  DataEvento: (value) => value,
  QuantidadeVoluntariosNecessarios: (value) => parseInt(value) > 1,
}
