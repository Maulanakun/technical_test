let string = "NEGIE1";
let arrayOfString = string.split("");

let angka = [];
let huruf = [];

for (let i = 0; i < arrayOfString.length; i++) {
  if (isNaN(arrayOfString[i])) {
    huruf.push(arrayOfString[i]);
  } else {
    angka.push(arrayOfString[i]);
  }
}
huruf.reverse();

let result = huruf.join("") + angka.join("");

console.log(result);
