/**Function to clear terminal when called. */
const clear = () => {
  process.stdout.write("\x1Bc");
};

clear();

const sourceJSON = `{"data":[10,45,81,90,82,6,29,31,22,5,99,27,55,68,17,88,14,47,50,67]}`;

const convertedToJSON = JSON.parse(sourceJSON);
console.log(convertedToJSON);

function showData(data) {
  return new Promise((resolve, reject) => {
    resolve(data.data);
  });
}

function sortData(data) {
  return new Promise((resolve, reject) => {
    resolve(data.sort((a, b) => a - b));
  });
}

function sumofData(data) {
  return new Promise((resolve, reject) => {
    resolve(data.reduce((prev, next) => prev + next, 0));
  });
}

function isEven(sum) {
  return new Promise((resolve, reject) => {
    if (sum % 2 === 0) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

function pipeline(data) {
  return new Promise(async (resolve, reject) => {
    let showedData = await showData(data);
    let sortedData = await sortData(showedData);
    let totalData = await sumofData(sortedData);
    let evenOrOdd = await isEven(totalData);
    resolve(evenOrOdd);
  });
}

class Data {
  static process(data) {
    return pipeline(data);
  }
  static getEven(sortedData) {
    return new Promise((resolve, reject) => {
      resolve(sortedData.filter((el) => el % 2 === 0));
    });
  }

  static getOdd(sortedData) {
    return new Promise((resolve, reject) => {
      resolve(sortedData.filter((el) => el % 2 === 1));
    });
  }

  static getBiggestSumArray(evenNums, oddNums) {
    let sumEvens = evenNums.reduce((prev, next) => prev + next, 0);
    let sumOdds = oddNums.reduce((prev, next) => prev + next, 0);
    console.log(sumEvens, sumOdds);
    return new Promise((resolve, reject) => {
      if (sumEvens > sumOdds) {
        resolve(evenNums);
      } else {
        resolve(oddNums);
      }
    });
  }
}

// function evenNumbers(sortedData) {
//   return new Promise((resolve, reject) => {
//     resolve(sortedData.filter((el) => el % 2 === 0));
//   });
// }

// function oddNumbers(sortedData) {
//   return new Promise((resolve, reject) => {
//     resolve(sortedData.filter((el) => el % 2 === 1));
//   });
// }

// function isGreater(evenNums, oddNums) {
//   let sumEvens = evenNums.reduce((prev, next) => prev + next, 0);
//   let sumOdds = oddNums.reduce((prev, next) => prev + next, 0);
//   console.log(sumEvens, sumOdds);
//   return new Promise((resolve, reject) => {
//     if (sumEvens > sumOdds) {
//       resolve(evenNums);
//     } else {
//       resolve(oddNums);
//     }
//   });
// }

let showedData = await showData(convertedToJSON);
let sortedData = await sortData(showedData);
// let totalData = await sumofData(sortedData);
// let evenOrOdd = await isEven(totalData);

// console.log(showedData);
// console.log(sortedData);
// console.log(totalData);
// console.log(evenOrOdd);

// console.log(await pipeline(convertedToJSON));
console.log(await Data.process(convertedToJSON));
// console.log(await oddNumbers(sortedData)); // without "await" in this way --> Promise {  [
// console.log(await evenNumbers(sortedData));
// console.log(await isGreater(await evenNumbers(sortedData), await oddNumbers(sortedData)));
console.log(await Data.getOdd(sortedData)); // without "await" in this way --> Promise {  [
console.log(await Data.getEven(sortedData));
console.log(
  await Data.getBiggestSumArray(
    await Data.getEven(sortedData),
    await Data.getOdd(sortedData)
  )
);
