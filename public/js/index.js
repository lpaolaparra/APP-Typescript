"use strict";
/** va a manejar la parte grafica o la parte de mi objeto de la app */
var bAdd = document.querySelector('#bAdd');
var inputTitle = document.querySelector('#title');
var inputCost = document.querySelector('#cost');
var Inputcurrency = document.querySelector('#currency');
var expenses = new Expenses('USD');
render();
// empezamos con nuestro eventos
bAdd.addEventListener('click', function (e) {
    /**
     * Voy a validar los datos que voy a recibir
     */
    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) {
        var title = inputTitle.value;
        var cost = parseFloat(inputCost.value);
        var currency = Inputcurrency.value;
        expenses.add({ title: title, cost: { number: cost, currency: currency } });
        render(); // actualiza la interfaz grafica
    }
    else {
        alert('Completa los datos correctamente');
    }
});
function render() {
    var html = '';
    expenses.getItems().forEach(function (item) {
        var id = item.id, title = item.title, cost = item.cost;
        var number = cost.number, currency = cost.currency;
        html += "\n            <div class=\"item\">\n                <div><span class=\"currency\"> " + currency + "</span> " + number + "</div>\n                <div>" + title + "</div>\n                <div><button class=\"bEliminar\" data-id=\"" + id + "\">Eliminar</button> </div>\n            </div>\n        \n        ";
    });
    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();
    $$('.bEliminar').forEach(function (bEliminar) {
        bEliminar.addEventListener('click', function (e) {
            var id = e.target.getAttribute('data-id');
            expenses.remove(parseInt(id));
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
