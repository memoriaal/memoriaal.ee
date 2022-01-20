function capitalize(sentence) {
    return sentence.toLowerCase().replace(/[^\s_\-/]*/g, function (word) {
        return word.replace(/./, function (ch) { return ch.toUpperCase() })
    })
}

$(function () {
    var qData = {
        query : {
            bool : {
                filter : { term: { tahvel: 'x' } }
            }
        },
        sort: { 'perenimi.raw': 'asc', 'eesnimi.raw': 'asc' },
        _source: [ 'id', 'perenimi', 'eesnimi', 'sünd', 'surm' ]
    }
    $.ajax('/.netlify/functions/search', {
        data : JSON.stringify(qData),
        contentType : 'application/json',
        type : 'POST',
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Basic cmVhZGVyOnJlYWRlcg==')
        },
        success: function (data) {

            var hits = data.hits.hits.map(function(hit) { return hit._source })
            //- console.log(hits)
            for (var i = 0; i < hits.length; i++) {
                var text = []
                var p = hits[i]

                text.push('<div id="' + p.id + '" class="row search-result pt-2">')

                text.push('<p class="col-12 mb-2 mb-1">#' + (i+1) + ' '
                          + (p.eesnimi ? capitalize(p.eesnimi) + ' ' : '')
                          + p.perenimi + ' '
                          + (p.sünd ? p.sünd : '?') + ' — '
                          + (p.surm ? p.surm : '✝') +  '</p>')
                text.push('</div>')

                $('#search-results').append(text.join(''))
            }
        },
        error: function( error) {
            console.log(error)
        }
    })

    $('input[type="radio"]').on('click', function () {
        query = $('input[name="q"]').val()
        idQuery = (query == Number(query) && query.length === 10)
        if (idQuery) {
            $('input[value="all"]').prop('checked', true)
            return
        }
        if ($(query && $(this).prop('value')) !== filter) {
            $('#searchform').submit()
        }
    })
    // $('#search-results').on('mouseenter', '.search-result', function () {
    //     $(this).find('.search-result-feedback').removeClass('d-none')
    // })

    // $('#search-results').on('mouseleave', '.search-result', function () {
    //     $(this).find('.search-result-feedback').addClass('d-none')
    // })
})
