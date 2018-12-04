import {BudgetController} from "./controler/budgetCtrl.js";
import {DOMStrings} from "./controler/uiCtrl.js";

const ctrl = new BudgetController();
setupEventListener(ctrl);
ctrl.init();

function setupEventListener(budgetCtrl) {

    $(DOMStrings.inputBtn).on("mouseenter", () => {
        $(".check-back").css("fill", "#fff");
    });

    $(DOMStrings.inputBtn).on("mouseleave", () => {
        $(".check-back").css("fill", "rgb(11, 149, 108)");
    });

    $(document).ready(() => {
        const container = $('.item-card-container');
        container.on('click', '.item-body', function () {
            const id = "#" + $(this).parent().parent().attr('id') + "  .item-title";
            $(id).toggle();
        });

        container.on('click', '.btn-item-delete', function () {
            budgetCtrl.deleteItem($(this));
        });

    });

    document.querySelector(DOMStrings.inputBtn).addEventListener('click', budgetCtrl.ctrlAddItem.bind(budgetCtrl));

    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            budgetCtrl.ctrlAddItem(event);
        }
    });
}



