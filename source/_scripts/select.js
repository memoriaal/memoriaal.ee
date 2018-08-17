$(function () {
    if (window.location.host !== 'www.memoriaal.ee') {
        $('body').css({
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            '-o-user-select': 'none',
            '-webkit-user-select': 'none',
            'user-select': 'none'
        })
    }
})
