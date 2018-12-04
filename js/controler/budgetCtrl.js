import {DataController} from "./dataCtrl.js";
import {UIController} from "./uiCtrl.js";
import {Item} from "../network/item.js";
import {BudgetValidation} from "../validation/budgetValidation.js";

export class BudgetController {
    constructor() {
        console.log("constructor of BudgetController");
        this.dataCtrl = new DataController();
    }

    ctrlAddItem(e) {

        //Get the Input Values from fields
        const input = UIController.getInput();

        e.preventDefault();
        //console.log(input);

        BudgetValidation.validation(input);

        //---------------------------------------add the item to database ---------------------------------------
        if (input.description !== "" && !isNaN(input.value) && input.value !== "") {

            this.insertData(input);
        }

    }

    insertData(input) {
        UIController.loadingAddItem();
        Item.insertDataToDB(input)
            .then(itemId => {
                //Add Item
                const newItem = this.dataCtrl.addItem(input, itemId);
                this.updateUI(newItem, input.type, /* isAddToList = */ true);
                UIController.clearFields();
                UIController.loadingCompleteAddItem();
                console.log(`${input.type} ,  entry is inserted`);
            })
            .catch(err => {
                alert(err);
                UIController.loadingCompleteAddItem();
            });
    }

    getData() {
        const ref = this;

        Item.getDataFromDB()
            .then(data => {
                data.forEach(el => {
                    let type;
                    if (el.hasOwnProperty('income')) {
                        type = el.income;
                    } else if (el.hasOwnProperty('expense')) {
                        type = el.expense;
                    }
                    if (type !== undefined) {
                        type.forEach(item => {
                            const newItem = ref.dataCtrl.addItem(item, item.custom_id);
                            //Display the Item to Html
                            ref.updateUI(newItem, item.type, /* isAddToList = */ true);
                        });
                    }
                })
            }).catch(err => {
            alert(err);
        });
    }

    deleteItem(ele) {

        const itemId = ele.parent().parent().attr('id');
        if (itemId) {
            const idAry = itemId.split("_"); // idAry = ["income" or "expense" , 2]
            const [type, id] = idAry;
            const context = this;
            Item.deleteItem(id, type)
                .then(response => {
                    if (response === "ok") {
                        //delete the item from the data structure
                        context.dataCtrl.deleteItemFromBudget(type, parseInt(id));
                        context.updateUI({id: itemId}, type, false);

                        console.log(`${type} entry is deleted having id ${id}`);
                    }
                })
                .catch(err => {
                    alert(err);
                })
        }
    };

    updateUI(newItem, type, isAddToList) {
        //Add or Delete  item  to Or from  list
        isAddToList ? UIController.addListItem(newItem, type) : UIController.deleteListItem(newItem.id);
        this.updateBudget();
        this.updatePercentage();
    }

    updateBudget() {
        //calculate budget
        this.dataCtrl.calculateBudget();

        //Return Budget
        const budget = this.dataCtrl.getBudget();

        //Display the budget on UI
        UIController.displayBudget(budget);
    }

    updatePercentage() {
        //calculate percentage
        this.dataCtrl.calculatePercentage();

        //read  percentage from budget BudgetController
        const percentages = this.dataCtrl.getPercentages();

        //update percentage to UI
        UIController.displayExpenseItemPercentage(percentages);
    }


    init() {
        console.log("Application has started.");

        UIController.displayMonth();

        this.getData();

        UIController.displayBudget({
            budget: 0,
            totalInc: 0,
            totalExp: 0,
            percentage: 0
        })
    }


}
