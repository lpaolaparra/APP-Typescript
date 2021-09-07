/* 
Va a ser la clase donde se maneja toda la funcionalidad o definiciones de los gastos
*/

/**
 * Vamos a empezar a manejar interfaces, es una estructura que nos permite definir algunos tipos de dato
 * que cuando creemos algun tipo de dato, tenga esos mismo tipos de sub tipos de datos
 */

/**
 * Defino tipos de datos explicitos
 */

type Currency = 'COP' | 'USD';

/**
 * Estamos creando tipos de datos que no son primitivos, por ejemplo como price que se define como
 * interface el cual tiene varios subdatos adicionales
 */

interface Price {
    // tipo personalizado baso en una interface
    number: number,
    currency: Currency // lo que quiero con currency es limitar mi moneda a dos tipos en especifico
}

interface ExpenseItem {
    id?: number,
    title: string,
    cost: Price // tiene un tipo de dato que se define a partir de una interface
}

interface IExpenses {
    /**
     * Interface que va a implementar algunas variables y metodos
     * vamos a realizar todas las operaciones
     */
    expenses: ArrayList<ExpenseItem> // variable que va almacenar un arreglo de expenses Items

    // variable que sirva para especificar en que tipo de moneda quiero mostrar el resultado 
    //de la suma de todas mis transacciones, usamos USD para que siempre muestre en dolares 
    //el resultado de la suma de nuestras transacciones
    finalCurrency: Currency

    add(item: ExpenseItem): boolean,
    get(index: number): ExpenseItem | null,
    getTotal(): string,
    remove(id: number): boolean

}

class ArrayList<T>{

    // es una clase que maneja un arreglo
    private items: T[];

    constructor() {
        this.items = [];
    }

    // mi clase de arrayList me va a permite agregar un elemento del tipo que le estoy especificando
    add(item: T): void {
        this.items.push(item); // con push se agregan a la cola
    }

    get(index: number): T | null {
        // como regresar el elemento de un arreglo
        const item: T[] = this.items.filter((x: T, i: number) => {
            // devuelvame lo que usted encuentra en la posicion index como un arreglo de una 
            // unica poisición
            return i === index;
        });

        // validamos si existe
        if (item.length === 0) {
            return null;
        } else {
            return item[0];
        }
    }

    createFrom(value: T[]): void {
        /**
         * funcion que permitira crear un arreglo basado en otro
         * quiero que this.items ahora sea igual a lo que le estoy pasando con [...value]
         */

        this.items = [...value];
    }

    getAll(): T[] {
        return this.items;
    }

}

class Expenses implements IExpenses {

    /**
     * Solo va a sevir para darle respuesta a nuestro index.ts
     */

    expenses: ArrayList<ExpenseItem>;
    finalCurrency: Currency;
    private count = 0; // para implementar los id

    constructor(currency: Currency) {
        this.finalCurrency = currency,
            this.expenses = new ArrayList<ExpenseItem>();

    }
    add(item: ExpenseItem): boolean {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);

        return true; // con el fin de validar que esta operacion fue exitosa
    }
    get(index: number): ExpenseItem | null {
        return this.expenses.get(index)
    }
    getItems(): ExpenseItem[] {
        /**
         * Metodo que solo le corresponde a expenses
         */
        return this.expenses.getAll();
    }
    getTotal(): string {
        /**
         * Va a regresar el total de la suma con el tipo de moneda ya formateado
         */
        const total = this.getItems().reduce((acc, currentValue) => {
            return acc += this.convertCurrency(currentValue, this.finalCurrency);
        }, 0);

        return `${this.finalCurrency} $${total.toFixed(2).toString()}`;
    }
    remove(id: number): boolean {
        const items:ExpenseItem[] = this.getItems().filter(item => {
            return item.id != id
        });

        this.expenses.createFrom(items);
        return true;
    }

    private convertCurrency(item: ExpenseItem, currency: Currency): number {
        switch (item.cost.currency) {
            case 'USD':
                switch (currency) {
                    case 'COP':
                        return item.cost.number * 3800;
                        break;

                    default:
                        return item.cost.number
                }
                break;
            case 'COP':
                switch (currency) {
                    case 'USD':
                        return item.cost.number / 3800
                        break
                    default:
                        return item.cost.number
                }
                break;
            default:
                return 0;


        }
    }



}