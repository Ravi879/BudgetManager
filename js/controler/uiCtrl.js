import {formatNumber} from "../helper/numbers.js";

export const DOMStrings = {
    inputType: '#add__type',
    inputDescription: '#add__description',
    inputValue: '#add__value',
    inputBtn: '#add__btn',
    incomeContainer: '#card_income_container',
    expanseContainer: '#card_expense_container',
    budgetLabel: '#budget__value',
    incomeLabel: '#budget__income__value',
    expenseLabel: '#budget__expenses__value',
    percentageLabel: '#budget__expenses__percentage',
    container: '#card_container',
    expensesPercentageLabel: '#item__percentage',
    dateLabel: '#budget__title__month',
};

function setTextContent(htmlEle, value) {
    document.querySelector(htmlEle).textContent = value;
}

function getValue(htmlEle) {
    return document.querySelector(htmlEle).value;
}

export class UIController {

    static getInput() {
        return {
            type: getValue(DOMStrings.inputType),
            description: getValue(DOMStrings.inputDescription),
            value: parseFloat(getValue(DOMStrings.inputValue))
        };
    }

    static addListItem(item, type) {
        let html, newHtml, element;

        if (type === 'income') {
            element = DOMStrings.incomeContainer;
            html = getIncomeCard();
        } else if (type === 'expense') {
            element = DOMStrings.expanseContainer;
            html = getExpenseCard();
        }

        newHtml = html.replace("%id%", item.id);
        newHtml = newHtml.replace("%description%", item.description);
        newHtml = newHtml.replace("%value%", formatNumber(item.value, type));

        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    }

    static displayBudget(obj) {
        setTextContent(DOMStrings.budgetLabel, formatNumber(obj.budget));
        setTextContent(DOMStrings.incomeLabel, formatNumber(obj.totalInc));
        setTextContent(DOMStrings.expenseLabel, formatNumber(obj.totalExp));

        if (obj.percentage > 0) {
            const percentage = (obj.percentage > 200) ? (200 + "+") : (obj.percentage);
            setTextContent(DOMStrings.percentageLabel, percentage);
        } else {
            setTextContent(DOMStrings.percentageLabel, "----");
        }
    }

    static displayExpenseItemPercentage(percentage) {
        const fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel);

        for (let i = 0; i < fields.length; i++) {
            if (percentage[i] > 0) {
                fields[i].textContent = (percentage[i] > 200) ? (200 + "+ %") : (percentage[i] + "%");
            } else {
                setTextContent(fields[i], "----");
            }
        }
    }

     static deleteListItem(selectorId) {
        const el = document.getElementById(selectorId);
        el.parentNode.removeChild(el);
    }

    static clearFields() {
        let fields, ary;

        fields = document.querySelectorAll(DOMStrings.inputDescription + "," + DOMStrings.inputValue);
        ary = Array.prototype.slice.call(fields);

        ary.forEach((current) => current.value = "");

        ary[0].focus();
    }

    static displayMonth() {
        const today = new Date();
        const monthAry = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        const [month, year] = [ monthAry[today.getMonth()], today.getFullYear()];
        setTextContent(DOMStrings.dateLabel, month + ', ' + year);
    }

    static loadingAddItem(){
        $(DOMStrings.inputBtn).html(`<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw check-back py-sm-2 py-md-1" style="color: white;font-size: x-large"></i>`);
    }

    static loadingCompleteAddItem(){
        $(DOMStrings.inputBtn).html(`                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="mt-1 logo">
                        <path class="check-back"
                              d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z">
                        </path>
                    </svg>`);
    }


}

function getIncomeCard() {
    return `<div class='row mb-2 ' id='income_%id%'>   
                        <div class='col card text-dark px-1 pt-lg-1 '>
                            <div class="p-0 card-title m-0 text-right item-title btn-item-delete" style="height: 12px;display:none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-110 -80 675 675" class=" border-danger "  style="background-color: #fff1f2; height: 16px; width: 18px;">
                                    <path class="btn-delete-item" d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z">
                                </path>
                                </svg>                                                                                                  
                            </div>
                           
                            <div class='card-body form-row px-3 py-2 item-body'>                    
                                <h4 class='col-8 h5 card-text pr-1 pl-0 pb-1 pb-md-2 pb-lg-1 my-0 item-description'>%description%</h4>                    
                                <p class='col-4 font-weight-bold text-right my-auto pr-1 item-value' style='color:#28B9B5;'>%value%</p>
                            </div>            
                        </div> 
                    </div>`
}

function getExpenseCard() {
    return `<div class='row mb-2 ' id='expense_%id%'>
                        <div class='col card text-dark px-1 pt-lg-1'>  
                            <div class="p-0 card-title m-0 text-right item-title btn-item-delete" style="height: 12px;display:none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-110 -80 675 675" class=" border-danger "  style="background-color: #fff1f2; height: 16px; width: 18px;">
                                    <path class="btn-delete-item" d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z">
                                </path>
                                </svg>                                                                                                  
                            </div>
                           
                            <div class='card-body form-row pr-2 py-2 pl-3 item-body'>                
                                <h4 class='col-7 h5 card-text pr-0 pb-0 mb-0 item-description'>%description%</h4>
                                <p class='col-3 font-weight-bold text-right pr-0 my-auto item-value'>%value%</p>                
                                <p class='col-2 mb-0 my-auto text-center' ><mark class='item-percentage' id='item__percentage'>--%</mark>  </p>            
                            </div>        
                        </div>    
                    </div> `;
}
