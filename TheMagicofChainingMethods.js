'use strict';

// const calcDisplaySummary = function (movements) {
//     const income = movements
//       .filter(mov => mov > 0)
//       .reduce((acc, mov) => acc + mov);
//     labelSumIn.textContent = `${income}€`;
  
//     const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
//     labelSumOut.textContent = `${Math.abs(out)}€`;
  
//     const interest = movements
//       .filter(mov => mov > 0)
//       .map(deposit => (deposit * 1.2) / 100)
//       .filter((int, i, arr) => {
//         console.log(arr);
//         return int >= 1;
//       })
//       .reduce((acc, int) => acc + int);
//     labelSumInterest.textContent = `${interest}€`;
//   };
  
//   calcDisplaySummary(account1.movements);