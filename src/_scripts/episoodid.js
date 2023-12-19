const gscriptBase = 'https://script.google.com/macros/s'
const feedbackApiId =
    'AKfycbzVtTRjfZxD-U5wrzQ-OrcupXY_3W19cOay6632XK-jJcxhLyY6tSwKiraAgDTYUCBRsA'
const feedbackApi = `${gscriptBase}/${feedbackApiId}/exec`
const episodesApiId =
    'AKfycbzVtTRjfZxD-U5wrzQ-OrcupXY_3W19cOay6632XK-jJcxhLyY6tSwKiraAgDTYUCBRsA'
const episodesApi = `${gscriptBase}/${episodesApiId}/exec?Episoodid`


document.addEventListener('DOMContentLoaded', function () {
    populateEpisodes()
    prefillFromLocalstorage()
    const submitE = get('db-feedback-submit')
    submitE.addEventListener('click', submitEpisode)
})
document.onkeydown = function (evnt) {
    if (evnt.key === "Escape") {
        closeModal()
    }
}

closeModal = () => {
    get('popup-content').classList.add('d-none')
    get('popup-background').classList.add('d-none')
}

const populateEpisodes = async () => {
    const episodes = await getEpisodes()
    const select = document.getElementById('db-feedback-episode-select')
    episodes.forEach(episode => {
        const option = document.createElement('option')
        option.value = episode.id
        option.text = `${episode.Nimetus} (${episode.Allikas})`
        select.appendChild(option)
    })
}

const prefillFromLocalstorage = () => {
    // if selected episode in local storage, set it
    const episodeSelect = document.getElementById('db-feedback-episode-select')
    const selectedEpisode = localStorage.getItem('selectedEpisode')
    if (selectedEpisode) {
        episodeSelect.value = selectedEpisode
    }
    // if email in local storage, set it
    const emailInput = document.getElementById('db-feedback-email')
    const email = localStorage.getItem('email')
    if (email) {
        emailInput.value = email
    }
}


const getEpisodes = async () => {
    try {
        const response = await fetch(episodesApi)
        return await response.json()
    } catch (err) {
        throw err
    }
}

const submitEpisode = (evnt) => {
    // if email is not valid, do not submit
    if (!validateEmail()) {
        return
    }

    // save selected episode to local storage
    const episodeId = get('db-feedback-episode-select').value
    localStorage.setItem('selectedEpisode', episodeId)

    // save email to local storage
    const email = get('db-feedback-email').value
    localStorage.setItem('email', email)

    const xhr2 = new XMLHttpRequest()
    xhr2.open('POST', feedbackApi, true)

    xhr2.onload = function () { // request successful
        console.log('response', xhr2.responseText)
        closeModal()
    }

    xhr2.onerror = function () {
        console.log('Error:', xhr2.status)
    }

    const formE = get('db-feedback')
    const formData = new FormData(formE)
    // add current url to form data
    formData.append('url', window.location.href)
    // add user language to form data
    formData.append('nav_lang', navigator.language)
    // get html lang property
    formData.append('locale', document.documentElement.lang)

    xhr2.send(formData)
    evnt.preventDefault()
}

const validateEmail = () => {
    const emailInput = get('db-feedback-email')
    const email = emailInput.value
    if (!email || email.length === 0) {
        emailInput.classList.add('is-invalid')
        alert('Palun sisesta e-posti aadress')
        return false
    }
    if (!email.includes('@')) {
        emailInput.classList.add('is-invalid')
        alert('Palun sisesta korrektne e-posti aadress')
        return false
    }
    const emailRe = /\S+@\S+\.\S+/
    if (!emailRe.test(email)) {
        emailInput.classList.add('is-invalid')
        alert('Palun sisesta korrektne e-posti aadress')
        return false
    }
    emailInput.classList.remove('is-invalid')
    return true
}
