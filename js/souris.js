// MOUSE POSITION FOR LITTLE CLOUD LAYOUT
function souris(event) {
    var x = event.clientX;
    var y = event.clientY;
    document.getElementById('coordonnes').value = x + ', ' + y;

    var element = document.getElementById('center-mouse');
    element.style.position = 'absolute';
    element.style.left = x + 'px';
    element.style.top = y + 'px';
}