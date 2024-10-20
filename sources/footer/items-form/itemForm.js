
// Initialize a new ItemsController with currentId set to 0
const itemsController = new ItemsController(0);

// Select the New Item Form
const newItemForm = document.querySelector('#newItemForm');

// Add an 'onsubmit' event listener
newItemForm.addEventListener('submit', (event) => {
    // Prevent default action
    event.preventDefault();

    // Select the inputs
    const newItemCategory = document.querySelector('#newItemCategory');
    const newItemNAme = document.querySelector('#newItemName');
    const newItemDescription = document.querySelector('#newItemDescription');  
    const newItemPrice = document.querySelector('#newItemPrice');    
    const newItemSize = document.querySelector('#newItemSize');    
    const newItemColor = document.querySelector('#newItemColor');    
    const newItemWeight = document.querySelector('#newItemWeight');    
    const newItemStock = document.querySelector('#newItemStock');    
    const newItemURLImage = document.querySelector('#newItemURLImage');    
    const newItemID = document.querySelector('#newItemID');    

    // Get the values of the inputs
    const category = newItemCategory.value;
    const name = newItemNAme.value;
    const description = newItemDescription.value;
    const price = newItemPrice.value;
    const size = newItemSize.value;
    const color = newItemColor.value;
    const weight = newItemWeight.value;
    const stock = newItemStock.value;
    const URLImage = newItemURLImage.value;
    const ID = newItemID.value;

    /*
        Validation code here
    */

    // Add the item to the ItemsController
    itemsController.addItem(category, name, description, price, size, color, weight, stock, URLImage, ID);

    // Clear the form
    newItemName.value = '';
    newItemDescription.value = '';    
});
