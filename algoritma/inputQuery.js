let INPUT = ["xc", "dz", "bbb", "dz"];
let QUERY = ["bbb", "ac", "dz"];

let array = [];

for (let i = 0; i < QUERY.length; i++) {
  let jumlah = 0;
  const elQUERY = QUERY[i];
  console.log(elQUERY);
  for (let j = 0; j < INPUT.length; j++) {
    const elINPUT = INPUT[j];
    if (elQUERY === elINPUT) {
      jumlah++;
    }
  }
  array.push(jumlah);
}

console.log(array);
// OUTPUT = [1, 0, 2] karena kata 'bbb' terdapat 1 pada INPUT, kata 'ac' tidak ada pada INPUT, dan kata 'dz' terdapat 2 pada INPUT
