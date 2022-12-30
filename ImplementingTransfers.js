'use strit';


// btnTransfer.addEventListener('click', function (e) {
//     e.preventDefault();
  
//     const amount = Number(inputTransferAmount.value);
//     const receiverAcc = accounts.find(
//       acc => acc.username === inputTransferTo.value
//     );
//     console.log(amount, receiverAcc);
  
//     if (
//       amount > 0 &&
//       receiverAcc &&
//       currentAcount.balance >= amount &&
//       receiverAcc?.username !== currentAcount.username
//     ) {
//       //Update the transfer
//       currentAcount.movements.push(-amount);
//       receiverAcc.movements.push(amount);
  
//       // updateUI
//       updateUI(currentAcount);
//     }
  
//     inputTransferTo.value = inputTransferAmount.value = '';
//       // inputLoginPin.blur();
//   });