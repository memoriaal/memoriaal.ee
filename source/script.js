window.onload = function () {
    console.log('vvvvvvvv')
    var findClass = document.getElementsByClassName('nav-title')
    var tallest = 0

    for(i = 0; i < findClass.length; i++) {
        console.log(i);
        var ele = findClass[i]
        var eleHeight = ele.offsetHeight
        tallest = eleHeight > tallest ? eleHeight : tallest
    }

    for(i = 0; i < findClass.length; i++) {
        findClass[i].style.height = tallest + "px"
    }
}
