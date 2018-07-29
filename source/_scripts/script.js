function load () {
    document.getElementById('text').style['padding-bottom'] = document.getElementById('navigation').offsetHeight + 'px'

    var findClass = document.getElementsByClassName('nav-title')
    var tallest = 0

    for(i = 0; i < findClass.length; i++) {
        var ele = findClass[i]
        var eleHeight = ele.offsetHeight
        tallest = eleHeight > tallest ? eleHeight : tallest
    }

    for(i = 0; i < findClass.length; i++) {
        findClass[i].style.height = tallest + 'px'
    }

    hashChange()
}

function hashChange () {
    var textBlocs = document.getElementsByClassName('text-block')
    var textLinks = document.getElementsByClassName('text-link')
    var hash = location.hash.replace('#', '')

    for(i = 0; i < textBlocs.length; i++) {
        textBlocs[i].classList.add('d-none')
    }

    for(i = 0; i < textLinks.length; i++) {
        if (textLinks[i].getAttribute('href') === '#' + hash) {
            textLinks[i].classList.add('active')
        } else {
            textLinks[i].classList.remove('active')
        }
    }

    if (hash) {
        var findId = document.getElementById(hash)
        findId.classList.remove('d-none')
    } else {
        textBlocs[0].classList.remove('d-none')
    }
}

window.onhashchange = hashChange
window.onload = load
