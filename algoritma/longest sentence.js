function longest(sentence) {
  let kata = sentence.split(" ");
  let kataTerpanjang = "";

  for (let i = 0; i < kata.length; i++) {
    if (kata[i].length > kataTerpanjang.length) {
      kataTerpanjang = kata[i];
    }
  }
  console.log(`${kataTerpanjang}: ${kataTerpanjang.length} character`);
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
longest(sentence);
// mengerjakan: 11 character
