import jwt from 'jsonwebtoken'
let users = []

const SECRET = process.env.TOKEN_SECRET

function generateToken(user) {
  return jwt.sign({ name: user.name, email: user.email }, SECRET)
}

function readToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    throw new ('token invalido')
  }
}

export function cadastro(body) {
  const user = users.find(({ email }) => email === body.email)
  if (user) throw new Error('usuario já cadastrado')

  users.push(body)

  const token = generateToken(body)
  return token
}

export function login(body) {
  const user = users.find(({ email }) => email === body.email)
  if (!user) throw new Error('usuario não encontrado')
  if (user.password !== body.password) throw new Error('senha incorreta')

  const token = generateToken(user)
  return token
}

export function verifica(token) {
  return readToken(token)
}