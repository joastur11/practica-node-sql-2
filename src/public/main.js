const loginView = document.querySelector('#login-view')
const profileView = document.querySelector('#profile-view')

const nameLabel = document.querySelector('#name-label')
const lastnameLabel = document.querySelector('#lastname-label')

const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const nameInput = document.querySelector('#name')
const lastnameInput = document.querySelector('#lastname')

const loginBtn = document.querySelector('#login-btn')
const registerBtn = document.querySelector('#register-btn')
const profileBtn = document.querySelector('#profile-btn')
const logoutBtn = document.querySelector('#logout-btn')
const createAccountBtn = document.querySelector('#create-account-btn')
const atrasBtn = document.querySelector('#atras-btn')

let isRegisterMode = false

let token = null

// register 

registerBtn.addEventListener('click', () => {
  isRegisterMode = !isRegisterMode

  if (isRegisterMode) {
    nameInput.classList.remove("hidden")
    lastnameInput.classList.remove("hidden")
    nameLabel.classList.remove("hidden")
    lastnameLabel.classList.remove("hidden")
    loginBtn.classList.add("hidden")
    registerBtn.classList.add('hidden')
    createAccountBtn.classList.remove("hidden")
    atrasBtn.classList.remove('hidden')
  } else {
    nameInput.classList.add("hidden")
    lastnameInput.classList.add("hidden")
    nameLabel.classList.add("hidden")
    lastnameLabel.classList.add("hidden")
    loginBtn.classList.remove("hidden")
    createAccountBtn.classList.add("hidden")
    atrasBtn.classList.add('hidden')
  }
})

atrasBtn.addEventListener('click', () => {
  isRegisterMode = !isRegisterMode

  if (!isRegisterMode) {
    nameInput.classList.add("hidden")
    lastnameInput.classList.add("hidden")
    nameLabel.classList.add("hidden")
    lastnameLabel.classList.add("hidden")
    loginBtn.classList.remove("hidden")
    createAccountBtn.classList.add("hidden")
    atrasBtn.classList.add('hidden')
    registerBtn.classList.remove('hidden')
  } else {
    nameInput.classList.remove("hidden")
    lastnameInput.classList.remove("hidden")
    nameLabel.classList.remove("hidden")
    lastnameLabel.classList.remove("hidden")
    loginBtn.classList.add("hidden")
    registerBtn.classList.add('hidden')
    createAccountBtn.classList.remove("hidden")
    atrasBtn.classList.remove('hidden')
  }
})

async function registerFetch(email, password, name, lastname) {
  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password, name, lastname
    })
  })

  if (!response.ok) {
    return console.log('registro incorrecto')
  }

  const data = await response.json()

  return console.log(`Registro exitoso, ID: ${data}`)
}

createAccountBtn.addEventListener('click', async () => {
  const name = nameInput.value
  const lastname = lastnameInput.value
  const email = emailInput.value
  const password = passwordInput.value

  await registerFetch(email, password, name, lastname)
})

// login

async function loginFetch(email, password) {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password
    })
  })

  if (!response.ok) {
    return console.log('credenciales incorrectas')
  }

  const data = await response.json()
  token = data.accessToken

  loginView.classList.add("hidden")
  profileView.classList.remove("hidden")

  return token// auth token y refresh token
}

loginBtn.addEventListener('click', async () => {
  const email = emailInput.value
  const password = passwordInput.value

  await loginFetch(email, password)
})
