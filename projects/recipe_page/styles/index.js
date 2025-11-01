// Add Conent 
let newListItem = document.createElement('li');

newListItem.textContent = 'Salted duck egg yolk';
newListItem.style.color = "#6c584c"
document.getElementById('filling_list').appendChild(newListItem);


//
const doughIngredients = document.getElementById("dough_list");
const doughItems = doughIngredients.getElementsByTagName("li");

Array.from(doughItems).forEach((item, idx) => {

    let checkbox = document.createElement("input");
    // Assign checkbox attributes
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = "value";
    checkbox.id = `dough-${idx}`;

    // Create label for the checkbox
    let label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = item.textContent;
    item.textContent = " ";
    item.appendChild(checkbox);
    item.appendChild(label);
  }
)

