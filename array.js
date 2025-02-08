// const arr1 = [1, 2, 3, 4, 5];
// const arr2 = [6, 7, 8, 9, 10];
// const arr3 = [...arr1, ...arr2];
// const arr4 = [[arr1], [arr2]];
// const arr5= [[...arr1], [...arr2]];

// // console.log(arr4); 
// // console.log(arr4[1]);
// // console.log(arr4[1][0]);
// // console.log(arr4[1][0][3]);
// // [ [ [ 1, 2, 3, 4, 5 ] ], [ [ 6, 7, 8, 9, 10 ] ] ] 
// // [ [ 1, 2, 3, 4, 5 ] ] --> 0
// //  [ [ 6, 7, 8, 9, 10 ] ]


// // console.log(arr1);
// // console.log(arr5[1][1]);





// // console.log(arr3);
// // console.log(typeof arr3);
// // console.log(typeof arr2);
// // console.log(Array.isArray (arr1));
// // console.log(Array.isArray (arr3));

// // console.log(arr1[3]);

// // console.log(arr3[8]);


// const arr6 = [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[10, [11], 12], [13, 14, 15], [16, 17, 18]]];     // 11
// // console.log(arr6.length);
// // console.log(arr6[1][0][1][0]);

// const arr7 = [[[[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]],[2,5,78,],[4,8,9,[65,89,9,6,3,[77]]]]]];
// //77

// // console.log(arr7.length);
// // console.log(arr7)     // --> [ [ [ [Array], [Array], [Array] ] ] ] --> 1
// // console.log(arr7[0])   // --> [ [ [ [Array] ], [ 2, 5, 78 ], [ 4, 8, 9, [Array] ] ] ] -->  length 1
// // console.log(arr7[0][0])   // --> [ [ [Array] ], [ 2, 5, 78 ], [ 4, 8, 9, [Array] ] ] --> lenght 3
// // console.log(arr7[0][0][2].length) // --> [ 4, 8, 9, [Array] ] --> 4
// // console.log(arr7[0][0][2][3])  // --> [Array] --> 6
// // console.log(arr7[0][0][2][3][5])  // --> [77]  -->1
// // console.log(arr7[0][0][2][3][5][0]);  // --> 77


// const arr8 = [[[[1,2,3,[4,6,7,[8,9,0,11,[12,15],[16,18,20,[77]]]]]]]];// 77

// // console.log(arr8)
// // console.log(arr8.length)
// console.log(arr8[0][0][0][3][3][5][3][0])       // PASS -- arey thankyou   thank you se kya hoga
















// data.forEach(item => {
//     // console.log('Item:', item);
//     const formattedDate = new Date(item.date).getTime();
//     categories.push(formattedDate);

//     if (item[0]['symbol'] === 'IBM') {
//       ibmItem.push(parseFloat(item[9]['close']).toFixed(2));
//     }

//     if (item[1].symbol === 'TCS.NS') {
//       tcsItem.push(parseFloat(item[9].close).toFixed(2)); 

//     }});
//   console.log('IBM Close:', ibmItem);
//   console.log('TCS Close:', tcsItem);  



const numbers = [1,2,10,7,8,9,6,7];

for(let i=2;i<=6;i++){
  console.log(numbers[i])
}

// console.log(numbers[2])
// console.log(numbers[5])