import {Expense} from "../model/expense.js";
import {Income} from "../model/income.js";

export class DataController {
    constructor() {
        console.log("constructor of DataController");
        this.data = {
            allItems: {
                expense: [],
                income: []
            },
            total: {
                income: 0,
                expense: 0
            },
            budget: 0,
            percentage: -1
        };

    }

    calculateTotal(type) {
        let sum = 0;
        this.data.allItems[type].forEach(cur => {
            sum = sum + cur.value;
        });
        this.data.total[type] = sum;
    }

    addItem(input, id) {
        const {type, description} = input;
        const value= parseFloat(input.value);
        let newItem;

        if (type === 'expense') {
            newItem = new Expense(id, description, value);
        } else if (type === 'income') {
            newItem = new Income(id, description, value);
        }
        this.data.allItems[type].push(newItem);

        return newItem;
    }

    calculateBudget() {
        //calculate the total income and expanse
        this.calculateTotal('expense');
        this.calculateTotal('income');

        //calculate budget
        let data = this.data;
        data.budget = data.total.income - data.total.expense;

        //calculate the percentage of income that we spent
        if (data.total.income > 0) {
            data.percentage = Math.round((data.total.expense / data.total.income) * 100);
        } else {
            data.percentage = -1;
        }
    }


    deleteItemFromBudget(type, id) {
        let index, ids;

        ids = this.data.allItems[type].map(cur => cur.id);

        index = ids.indexOf(id);
        if (index !== -1) {
            this.data.allItems[type].splice(index, 1);
        }

    }

    calculatePercentage() {
        this.data.allItems.expense.forEach(cur => {
            cur.calcPercentage(this.data.total.income);
        });
    }

    getPercentages() {
        return this.data.allItems.expense.map(cur => cur.getPercentage());
    }

    getBudget() {
        return {
            budget: this.data.budget,
            totalInc: this.data.total.income,
            totalExp: this.data.total.expense,
            percentage: this.data.percentage

        }
    }

    testItem() {
        console.log(this.data);
    }

}
