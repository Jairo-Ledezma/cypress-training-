//objects

var customer = {
  firstName: "Jhon",
  lastName: "Smith",
  car: ["neon", "march", "xtrail", "journey", "susuki"],
};

console.log(customer);
console.log(customer.firstName); // accessing properties with the dot notation
console.log(customer.lastName); // accessing properties with the dot notation
console.log(customer.car[0]);

console.log(customer["firstName"]); // accessing properties with the square bracket notation
console.log(customer["lastName"]); // accessing properties with the square bracket notation

//changing values on the object

customer.firstName = "Jairo"; //reasign value with dot notation
customer["lastName"] = "Ledezma"; //reasing value with square bracket notation

console.log(customer);

//Arrays

var cars = ["neon", "march", "xtrail", "journey", "susuki"];

console.log(cars);
console.log(cars[0]);
console.log(cars[1]);
console.log(cars[2]);
console.log(cars[3]);
console.log(cars[4]);

cars[4] = "BMW";

console.log(cars[4]);
