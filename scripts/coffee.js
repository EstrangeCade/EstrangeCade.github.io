//Listen for add order
var addOrder = document.getElementById("addOrder");
addOrder.addEventListener("click", add);

//Listen for place order
var placeOrder = document.getElementById("placeOrder");
placeOrder.addEventListener("click", place);

//Listen for add favourite
var addFav = document.getElementById("addFav");
addFav.addEventListener("click", addEntry);

//Listen for order favourite
var orderFav = document.getElementById("orderFav");
orderFav.addEventListener("click", getEntry);

//Get elements by id
var cform = document.getElementById("coffeeForm");

var americano = document.getElementById("americano");
var espresso = document.getElementById("espresso");

var milkSection = document.getElementById("milkSection");
var coffeeDisplay = document.getElementById("outCoffee");
var sizeDisplay = document.getElementById("outSize");
var milkDisplay = document.getElementById("outMilk");
var extrasDisplay = document.getElementById("displayExtras");
var shotsDisplay = document.getElementById("outShots");

var syrupShots = document.getElementById("syrupShots");
var totalOrder = document.getElementById("totalOrder");


var syrup = document.getElementById("Syrup");
var sugar = document.getElementById("Sugar");
var cream = document.getElementById("Cream");
var grandTotal = document.getElementById("grandTotal");

//Get total number of drinks
var totalDrinks = 0;
localStorage.setItem("Number of Drinks", 0);

//Pass values to current order
function outputSelection() {
    var coffeeSelect = cform.querySelector("input[name='coffee']:checked");
    var sizeSelect = cform.querySelector("input[name='size']:checked");
    var milkSelect = cform.querySelector("input[name='milk']:checked");
    var extrasSelect = cform.querySelector("input[name='extras']:checked");

    //Add output details to page
    outCoffee.innerText = "Coffee: " + coffeeSelect.value;
    outCoffee.value = coffeeSelect.value;
    outSize.innerText = "Size: " + sizeSelect.id;
    outSize.value = sizeSelect.id;
    outMilk.innerText = "Milk: " + milkSelect.value;
    outMilk.value = milkSelect.value;

    //If syrup shots checked then display syrup shot selection
    if (syrup.checked) {
        syrupShots.style.display = "block";
        let shotNo = cform.querySelector("input[name='shot']");
        outShots.innerText = "Syrup Shots: " + shotNo.value;
        outShots.value = shotNo.value + " Shots of ";

    } else {
        syrupShots.style.display = "none";
        outShots.value = "";
    }

    //Add output of selected extras to page
    if (sugar.checked && cream.checked && syrup.checked) {
        displayExtras.innerText = "Extras: " + sugar.id + " | " + cream.id + " | " + syrup.id;
        displayExtras.value = outShots.value + syrup.id + " | " + cream.id + " | " + sugar.id;

    } else if (sugar.checked && syrup.checked) {
        displayExtras.innerText = "Extras: " + sugar.id + " | " + syrup.id;
        displayExtras.value = outShots.value + syrup.id + " | " + sugar.id;

    } else if (cream.checked && syrup.checked) {
        displayExtras.innerText = "Extras: " + cream.id + " | " + syrup.id;
        displayExtras.value = outShots.value + syrup.id + " | " + cream.id;

    } else if (sugar.checked && cream.checked) {
        displayExtras.innerText = "Extras: " + sugar.id + " | " + cream.id;
        displayExtras.value = sugar.id + " | " + cream.id;
        outShots.innerText = "";

    } else if (syrup.checked) {
        displayExtras.innerText = "Extras: " + syrup.id;
        displayExtras.value = outShots.value + syrup.id;

    } else if (extrasSelect = cform.querySelector("input[name='extras']:checked")) {
        displayExtras.innerText = "Extras: " + extrasSelect.id;
        displayExtras.value = extrasSelect.id;

    } else {
        displayExtras.innerText = "";
        displayExtras.value = "";
        outShots.innerText = "";
    }

    //If espresso or americano is checked then no milk is required
    if (americano.checked || espresso.checked) {
        milkSection.style.display = "none";
        outMilk.style.display = "none";
        outMilk.value = "";

    } else {
        milkSection.style.display = "block";
        outMilk.style.display = "block";
    }
    //Display total order
    totalOutput();
}

//Get total price and display total order
function totalOutput() {
    let sizeSelect = cform.querySelector("input[name='size']:checked");
    let shotNo = cform.querySelector("input[name='shot']");
    var sum = 0;
    sum = sizeSelect.value * 1;
    if (cream.checked) {
        sum += cream.value * 1;
    }

    if (syrup.checked) {
        sum += (syrup.value * shotNo.value);

    }
    totalOrder.innerText = "Current Order Total: £" + sum.toFixed(2);
    totalOrder.value = sum.toFixed(2);
}
grandTotal.value = 0;

//Place order
function place() {
    if (confirm("Finalise Order?")) {
        localStorage.setItem("Amount of Drinks", totalDrinks);
        var numberOfDrinks = parseInt(localStorage.getItem("Number of Drinks")) + totalDrinks;

        //Clear all   
        cform.reset();
        outCoffee.innerText = "";
        outCoffee.value = "";
        outSize.value = "";
        outSize.innerText = "";
        outMilk.innerText = "";
        outMilk.value = "";
        displayExtras.innerText = "";
        displayExtras.value = "";
        totalOrder.innerText = "";
        totalOrder.value = "";
        outShots.innerText = "";
        outShots.value = "";
        syrupShots.style.display = "none";
        grandTotal.innerText = "";
        grandTotal.value = "";
        alert("Order Placed!");
        var list = document.getElementById("outputTotal");
    } else {
        alert("Canceled!");
    }

    //Remove created elements
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

//Add to order
function add() {
    //Work out total price
    if (outSize.value == "Small" || outSize.value == "Medium" || outSize.value == "Large") {

        if (totalDrinks < 10) {
            totalDrinks += 1;
            localStorage.setItem("Amount of Drinks", totalDrinks);

        } else {
            var details = localStorage.getItem("Cost");
            totalOrder.value = "0";
            totalOrder.innerText = 0;
            totalDrinks -= 11;
            totalDrinks += 1;
            localStorage.setItem("Number of Drinks", totalDrinks);
        }
        grandTotal.value = grandTotal.value * 1 + totalOrder.value * 1;
        grandTotal.innerHTML = "Overall Price Paid = £" + grandTotal.value.toFixed(2);

        //Create the order summary
        var newOrder = document.createElement("fieldset");
        newOrder.innerHTML = "Order Details: " + outSize.value + " | " + outCoffee.value + " | " + outMilk.value + " | " + displayExtras.value + "<br>Price Paid = £" + totalOrder.value;
        document.getElementById("outputTotal").appendChild(newOrder);
    }
    clear();
}

//Clear all
function clear() {
    outCoffee.innerText = "";
    outCoffee.value = "";
    outSize.value = "";
    outSize.innerText = "";
    outMilk.innerText = "";
    outMilk.value = "";
    displayExtras.innerText = "";
    displayExtras.value = "";
    totalOrder.innerText = "";
    totalOrder.value = "";
    outShots.innerText = "";
    outShots.value = "";
    syrupShots.style.display = "none";
    cform.reset();
}

//Set elements into local storage
function addEntry() {
    localStorage.setItem("Coffee", outCoffee.value);
    localStorage.setItem("Size", outSize.value);
    localStorage.setItem("Milk", outMilk.value);
    localStorage.setItem("Extras", displayExtras.value);
    localStorage.setItem("Cost", totalOrder.value);
    var details = outSize.value;

    if (details == "Small" || details == "Medium" || details == "Large") {
        orderFav.style.display = "inline-block";

    } else {
        localStorage.setItem("Coffee", "");
        localStorage.setItem("Size", "");
        localStorage.setItem("Milk", "");
        localStorage.setItem("Extras", "");
        localStorage.setItem("Cost", "");

        alert("You Must Select a Favourite First!");
    }
}

//Get elements from local storage
function getEntry() {
    var newOrder = document.createElement("fieldset");
    if (localStorage.getItem("Number of Drinks") < 10) {
        totalDrinks += 1;
        localStorage.setItem("Number of Drinks", totalDrinks);

    } else {
        var details = localStorage.getItem("Cost");
        localStorage.setItem("Cost", 0);
        totalDrinks -= 11;
        totalDrinks += 1;
        localStorage.setItem("Number of Drinks", 0);
    }

    totalOrder = localStorage.getItem("Cost");

    newOrder.innerHTML = "Order Details: " + localStorage.getItem("Size") + " | " + localStorage.getItem("Coffee") + " | " + localStorage.getItem("Milk") + " | " + localStorage.getItem("Extras") + "<br>Price Paid = £" + localStorage.getItem("Cost");
    document.getElementById("outputTotal").appendChild(newOrder);

    grandTotal.value = grandTotal.value * 1 + localStorage.getItem("Cost") * 1;
    grandTotal.innerText = "£" + grandTotal.value.toFixed(2);
    //Clear all
    clear();
    if (localStorage.getItem("Cost") == 0) {
        localStorage.setItem("Cost", details);
    }
}