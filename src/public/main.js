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

let token = null

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


