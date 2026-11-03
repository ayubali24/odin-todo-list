import { todos } from "./todos-tracker.js";
import { removeObjectWithId } from "./todos-tracker.js";

const myTable = document.getElementById("myTable");
const tbody = myTable.createTBody();

export function displayToDoItems() {
    tbody.replaceChildren();

    for (const item of todos) {
        console.log('hey this is due', item);
        const row = document.createElement("tr");

        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");

        cell1.textContent = item.title;
        cell2.textContent = item.description;
        cell3.textContent = item.dueDate;
        cell4.textContent = item.priority;


        // 4. Append row to tbody
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        const myDeleteButton = document.createElement('button');

        myDeleteButton.innerText = "Delete Item";

        const cell5 = document.createElement("td");
        cell5.appendChild(myDeleteButton);


        myDeleteButton.addEventListener('click', () => {
            console.log('u have entered me');
            removeObjectWithId(todos, item.id)
            displayToDoItems();
        });

        // row.appendChild(myDeleteButton);
        // row.appendChild(changeReadStatusButton);
        row.appendChild(cell5);
        tbody.appendChild(row);
    }
}