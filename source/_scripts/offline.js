if (window.applicationCache) {
    window.applicationCache.addEventListener('cached', function () {
        console.log('First cache of the manifest')
    }, false)

    window.applicationCache.addEventListener('checking', function () {
        console.log('Checking for an update')
    }, false)

    window.applicationCache.addEventListener('downloading', function () {
        console.log('An update was found')
    }, false)

    window.applicationCache.addEventListener('noupdate', function () {
        console.log('First download of the manifest')
    }, false)

    window.applicationCache.addEventListener('obsolete', function () {
        console.log('Application cache deleted')
    }, false)

    window.applicationCache.addEventListener('progress', function () {
        console.log('Resource fetched')
    }, false)

    window.applicationCache.addEventListener('updateready', function () {
        console.log('Resources redownloaded')
    }, false)

    window.applicationCache.addEventListener('error', function () {
        console.error('Cache failed to update')
    }, false)
}
