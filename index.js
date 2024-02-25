function getRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

console.log("Your number is: ", getRandomNumber());

module.exports = getRandomNumber;
