//backend logic
function PizzaOrder(name, price=0, size, toppings){ //constructor
  this.name = name;
  this.price = price;
  this.size = size;
  this.toppings = toppings;
}

PizzaOrder.prototype.pizzaCalculation = function(){ //create a prototype method to calculate the price
  debugger;
  if (this.size === "Small") {
    debugger;
    this.price += 5;
  } else if (this.size === "Medium") {
    this.price += 7;
  } else if (this.size === "Large") {
    this.price += 10;
  } else if (this.size === "Extra Large") {
    this.price += 12;
    // console.log(this.price);
  }

  for (var i=0; i<=this.toppings.length;i++) {
    if (this.toppings[i] === " Sausage" || this.toppings[i] === " Pepperoni") {
    this.price += 2;
    } else if (this.toppings[i] === " Mushrooms" || this.toppings[i] === " Green Peppers" || this.toppings[i] === " Olives") {
    this.price += 1; //need to convert the parseint to decimals?
    } else if (this.toppings[i] === " Extra Cheese") {
    this.price += 1;
    // console.log(this.toppings[i]);
    }
  }
}

function resetFields() {
  $("#order-name").val("");
  $("#size").val("");
  $('input[type=checkbox]').prop('checked', false);
}

// frontend logic
$(document).ready(function(){
  $("form#pizza-form").submit(function(e){
    e.preventDefault();

    var orderName = $("#order-name").val();
    var size = $("#size").val();
    var toppingChoiceArray = [];
    var price = 0;

    var checkToppings = $(".toppings:checked");
    checkToppings.each(function(){
      var toppingSeleted = $(this).val();
      toppingChoiceArray.push(toppingSeleted);
      console.log($(this));
    });
    var newPizzaOrder = new PizzaOrder(orderName, price, size, toppingChoiceArray); //instance that holds the values for each item
    newPizzaOrder.pizzaCalculation();  //create a variable to run a method to calculate the price - running the backend logic

    $("#order-output").append("<li><span class='pizzaOrderName'>" + newPizzaOrder.name + ", click here for your order details" + "</span></li>"); //listing name for order details

    $(".pizzaOrderName").last().click(function(){
      var orderInformation = `<img src='img/pizza.png' alt='image of pizza'>
                              <div class="flex output-styling" id="output-styling">
                                <h3>Order Details:</h3>
                                <hr>
                                <p class='lead outputDisplay'> ${newPizzaOrder.name}, here's what you ordered:</p>
                                <p class='lead outputDisplay'><span class="bold-output-text">Pizza Size:</span> ${newPizzaOrder.size}</p>
                                <p class='lead outputDisplay'><span class="bold-output-text">Pizza Toppings:</span> ${newPizzaOrder.toppings}</p>
                                <p class='lead outputDisplay'><span class="bold-output-text">Total Price:</span> $ ${newPizzaOrder.price}</p>
                              </div>`;

      $(".show-order").html(orderInformation);
    });
    resetFields();
  });
});
