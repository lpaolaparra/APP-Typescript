"use strict";
/*
Va a ser la clase donde se maneja toda la funcionalidad o definiciones de los gastos
*/
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var ArrayList = /** @class */ (function () {
    function ArrayList() {
        this.items = [];
    }
    // mi clase de arrayList me va a permite agregar un elemento del tipo que le estoy especificando
    ArrayList.prototype.add = function (item) {
        this.items.push(item); // con push se agregan a la cola
    };
    ArrayList.prototype.get = function (index) {
        // como regresar el elemento de un arreglo
        var item = this.items.filter(function (x, i) {
            // devuelvame lo que usted encuentra en la posicion index como un arreglo de una 
            // unica poisición
            return i === index;
        });
        // validamos si existe
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    };
    ArrayList.prototype.createFrom = function (value) {
        /**
         * funcion que permitira crear un arreglo basado en otro
         * quiero que this.items ahora sea igual a lo que le estoy pasando con [...value]
         */
        this.items = __spreadArrays(value);
    };
    ArrayList.prototype.getAll = function () {
        return this.items;
    };
    return ArrayList;
}());
var Expenses = /** @class */ (function () {
    function Expenses(currency) {
        this.count = 0; // para implementar los id
        this.finalCurrency = currency,
            this.expenses = new ArrayList();
    }
    Expenses.prototype.add = function (item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true; // con el fin de validar que esta operacion fue exitosa
    };
    Expenses.prototype.get = function (index) {
        return this.expenses.get(index);
    };
    Expenses.prototype.getItems = function () {
        /**
         * Metodo que solo le corresponde a expenses
         */
        return this.expenses.getAll();
    };
    Expenses.prototype.getTotal = function () {
        var _this = this;
        /**
         * Va a regresar el total de la suma con el tipo de moneda ya formateado
         */
        var total = this.getItems().reduce(function (acc, currentValue) {
            return acc += _this.convertCurrency(currentValue, _this.finalCurrency);
        }, 0);
        return this.finalCurrency + " $" + total.toFixed(2).toString();
    };
    Expenses.prototype.remove = function (id) {
        var items = this.getItems().filter(function (item) {
            return item.id != id;
        });
        this.expenses.createFrom(items);
        return true;
    };
    Expenses.prototype.convertCurrency = function (item, currency) {
        switch (item.cost.currency) {
            case 'USD':
                switch (currency) {
                    case 'COP':
                        return item.cost.number * 3800;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case 'COP':
                switch (currency) {
                    case 'USD':
                        return item.cost.number / 3800;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            default:
                return 0;
        }
    };
    return Expenses;
}());
