//Loops

// for loop
for (var i = 1; i <= 5; i++) {
  console.log("i equals " + i);
}

// while loop
index = 0;
while (index <= 5) {
  console.log("index = " + index);
  index++;
}

// do while loop
counter = 0;
do {
  console.log(counter);
  counter++;
} while (counter <= 5);

const consoles = ["ps5", "meta", "xbox", "nintendo"];

//for of loop
for (const gameconsole of consoles) {
  console.log(gameconsole);
}

//for each loop
cars.forEach((car) => {
  console.log(car);
});

const jairo = {
  smart: false,
  tall: false,
  rich: false,
};

// for in
for (const key in jairo) {
  console.log(key + ": " + jairo[key]);
}
