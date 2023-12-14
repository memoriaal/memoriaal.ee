const get = document.getElementById.bind(document)
const query = document.querySelector.bind(document)
const queryAll = document.querySelectorAll.bind(document)

const copy2clipboard = function (DomE, transparentE = null) {
    if (!DomE) {
        console.error('copy2clipboard: missing DomE')
        return
    }
    const clip = DomE.getAttribute('clip')
    if (!clip) {
        console.error('copy2clipboard: missing clip')
        return
    }
    navigator.clipboard.writeText(clip)
    transparentE = transparentE || DomE.firstChild?.nextSibling
    if (transparentE) {
        transparentE.classList.remove('transparent')
        setTimeout(() => { transparentE.classList.add('transparent') }, 400)
    }
}

const qs = function (key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&")
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"))
    return match && decodeURIComponent(match[1].replace(/\+/g, " "))
}

const replaceLinebreaks = (text) => {
    const replaced = text.replace(/(\\n\\r|\\n|\\r)+/g, '<br/>')
    return replaced
}
