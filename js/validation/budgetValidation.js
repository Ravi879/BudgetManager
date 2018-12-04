import {DOMStrings} from "../controler/uiCtrl.js";

export class BudgetValidation {
    static validation(input) {
        const input_map = new Map();
        input_map.set(DOMStrings.inputType, input.type);
        input_map.set(DOMStrings.inputDescription, input.description);

        input_map.forEach((inp, id) => {
            if (inp === "")
                classToggleOn(document.querySelector(id).classList);
            else
                classToggleOff(document.querySelector(id).classList);
        });

        if (isNaN(input.value)) {
            classToggleOn(document.querySelector(DOMStrings.inputValue).classList);
        } else {
            classToggleOff(document.querySelector(DOMStrings.inputValue).classList);
        }
    }
}

function classToggleOn(class_list) {
    if (!class_list.contains("is-invalid")) {
        class_list.toggle("is-invalid");
    }
}

function classToggleOff(class_list) {
    if (class_list.contains("is-invalid")) {
        class_list.toggle("is-invalid");
    }
}
