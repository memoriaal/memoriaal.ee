$(function () {
    $('#popup-close, #popup-background').click(function () {
        $('#popup-background, #popup-content').hide()
    })

    if (window.location.host === 'www.memoriaal.ee') {
        $('#popup-background, #popup-content').removeClass('d-none')
    }
})
