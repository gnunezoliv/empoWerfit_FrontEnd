// Create a ItemsController class
class ItemsController {
    // Set up the items and currentId property in the contructor
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    // Create the addItem method
    addItem(category, name, description, price, size, color, weight, stock, URLImage, ID) {
        const item = {
            // Increment the currentId property
            id: this.currentId++,
            category: category,
            name: name,
            description: description,
            price: price,
            size: size,
            color: color,
            weight: weight,
            stock: stock,
            URLImage: URLImage,
            ID:ID

        };

        // Push the item to the items property
        this.items.push(item);

        //Save items to local storage
        localStorage.setItem("items", JSON.stringify(this.items));
    }
}
