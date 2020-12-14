import { Question } from './question'
import { createModal, isValid } from './utils'
import { authWithEmailAndPassword, getAuthForm } from './auth'
import './styles.css'

const form = document.getElementById('form')
const modalBtn = document.getElementById('modal-btn')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')


window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault()

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true
            // Async request to server to save question
        Question.create(question).then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = false
        })
    }
}

function openModal() {
    createModal('Авторизация', getAuthForm())
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector('button')
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    btn.disabled = true
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Ошибка!', content)
    } else {
        createModal('Список вопросов', Question.listToHTML(content))
    }
}


// find elements
let showPrveBtn = document.getElementById('show-prev-btn')
let showNextBtn = document.getElementById('show-next-btn')
let slideImage = document.getElementById('slide-img')


// create images array 
let imageUrls = []
imageUrls.push('https://st2.depositphotos.com/1174436/10192/i/950/depositphotos_101926626-stock-photo-a-business-woman-touches-a.jpg')
imageUrls.push('https://st4.depositphotos.com/14431644/38305/i/1600/depositphotos_383056196-stock-photo-web-search-data-information-futuristic.jpg')
imageUrls.push('https://st.depositphotos.com/1665366/3969/i/950/depositphotos_39699713-stock-photo-vector-web-template-button-ui.jpg')
imageUrls.push('https://st4.depositphotos.com/1021180/20383/i/1600/depositphotos_203836850-stock-photo-illustration-tech-eye-pupil.jpg')

let currentImageIndex = 0

slideImage.src = imageUrls[currentImageIndex]

// subscribe to events
showPrveBtn.addEventListener('click', onShowPrevBtnClick)
showNextBtn.addEventListener('click', onShowNextBtnClick)
showNextBtn.addEventListener("load", function(event) {
    console.log("test!!!!");
});

// functions difinitions
function onShowPrevBtnClick() {
    currentImageIndex--
    slideImage.src = imageUrls[currentImageIndex]
}

function onShowNextBtnClick() {
    currentImageIndex++
    if (currentImageIndex === (imageUrls.length - 1)) {
        showNextBtn.disabled = true
    }
    slideImage.src = imageUrls[currentImageIndex]

}