/** va a manejar la parte grafica o la parte de mi objeto de la app */

const bAdd = <HTMLButtonElement>document.querySelector('#bAdd') as HTMLButtonElement;
const inputTitle = <HTMLInputElement>document.querySelector('#title') as HTMLInputElement;
const inputCost = <HTMLInputElement>document.querySelector('#cost') as HTMLInputElement;
const Inputcurrency = <HTMLSelectElement>document.querySelector('#currency') as HTMLSelectElement;

const expenses = new Expenses('USD');
render();

// empezamos con nuestro eventos

bAdd!.addEventListener('click', e => {
    /**
     * Voy a validar los datos que voy a recibir
     */

    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle!.value;
        const cost: number = parseFloat(inputCost!.value);
        const currency: Currency = <Currency>Inputcurrency!.value;

        expenses.add({ title: title, cost: { number: cost, currency: currency } });

        render(); // actualiza la interfaz grafica

    } else {
        alert('Completa los datos correctamente');
    }
});

function render() {
    let html = '';

    expenses.getItems().forEach(item => {
        const { id, title, cost } = item;
        const { number, currency } = cost;

        html += `
            <div class="item">
                <div><span class="currency"> ${currency}</span> ${number}</div>
                <div>${title}</div>
                <div><button class="bEliminar" data-id="${id}">Eliminar</button> </div>
            </div>
        
        `;
    });

    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();

    $$('.bEliminar').forEach(bEliminar => {
        bEliminar.addEventListener('click', e => {
            const id = (e.target as HTMLButtonElement).getAttribute('data-id');
            expenses.remove(parseInt(id!));

            render();
        });
    });
}

function $(selector: string): HTMLElement {
    return document.querySelector(selector) as HTMLElement;
}

function $$(selector: string): NodeListOf<Element> {
    return document.querySelectorAll(selector) as NodeListOf<Element>;
}