var var1 = 1;
let var2 = 2;
const var3 = 3;

// doubt puch  var jyada use kyu nhi karte
// var global scope follow karta hai hamesha isliye avoid
// const toh constant hi rehte hai lekin  let se acha kyu hai 

// cons ki value nhi badalti

const account_password = "khushiHate";
// badal jaye passwrd toh  -> chalega?nahi  isliye hi
// account_password = "chomu";     // error



let player = "Aditya";  // adi game khel rha hai
player = "khushi" // ab khushi game khel rhi hai
// ek game hi share ho rha hai



var name = "Aditya";
var name = "khushi";
// no err -> all correct
// makes sense ?ha lekin player 2 decalre nhi hai  --> same hi varable hai
// value update hui ek time pe ek hi use kar sakta hai// value badli ja sakti hai lekin const me badl nhi sakti



// console.log(chomu)          // OUTPUT : err- scope ke bahar hai
{}  // scope
{
    // var chomu = "khushi";
    // console.log(chomu)
}

// console.log(chomu) ? dekh kya rhi hai itna aur kya dekhu mujhe lga kar rha hia kuch waah chal de de
// kyasab kya sab sabaur bda l\kuch isse bda kya bahar se dekh lo de de aake le lo apka hi hia safely rakha hua hiadekh hi lu
// chupa ke dikha dono soye hai aue samne mummy hia bas  soyi?pehle open kar jacket me h co hvered rakh kaha yha dekh rha hai h dekhana  man nhi bharta photo rakha hua hai na oye mai 2 sec me aayi mera kambal lekeok dusra mil gya
//  phone se dikhau ok


// "use strict"  --var ko bina decalre kiye access nhi kar sakte
//var, globaly aceess kar sakte hai, value change kar sakte hai aur ye case-sensitive hote hai

var ghochu = "Aditya";
console.log(ghochu);

ghochu = "Rohan";
console.log(ghochu);


// let 
// let ke case me ham same variable dubara declare nhi kar sakte , value change kar sakte hai
let chomu = "Adi";
console.log(chomu);

// const 
//  value change nhi kar sakte, but aur operation perform kar sakte hai
const pi=3.14;
// pi=3.15;   -- this will give errorrrrrrrrrrr
console.log(pi)
console.log(pi*2*2)
