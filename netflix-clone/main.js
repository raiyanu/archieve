function toggleBody(element) {
    var body = element.nextElementSibling;
    body.classList.toggle('view');
    element.children[1].classList.toggle('rotate');
}
