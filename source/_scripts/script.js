$(function () {
    $('#text').css('padding-bottom', $('#navigation').outerHeight(true) + 'px')

    var tallest = 0
    $('.nav-title').each(function () {
        var eleHeight = $(this).outerHeight(true)
        tallest = eleHeight > tallest ? eleHeight : tallest
    })
    $('.nav-title').css('height', tallest + 'px')

    $(window).on('hashchange', function () {
        if (location.hash) {
            $('.text-link').removeClass('active')
            $('.text-link[href="' + location.hash + '"]').addClass('active')

            $('.text-block').addClass('d-none')
            $(location.hash).removeClass('d-none')
        } else {
            $('.text-block').first().removeClass('d-none')
        }
    })
    $(window).trigger('hashchange')
})
