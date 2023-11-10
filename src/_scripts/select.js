$(function () {
    hosts = ['www.memoriaal.ee', 'memoriaal.ee', 'localhost:4000']
    if (hosts.indexOf(window.location.host) === -1) {
        $('body').css({
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            '-o-user-select': 'none',
            '-webkit-user-select': 'none',
            'user-select': 'none'
        })
    }
})
