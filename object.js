const obj = {
    name: 'John',
    age: 30}

    // console.log(obj.age)
    // //other way
    // console.log(obj['age'])     // preferred
    
// print age
const obj2 = {
    name: 'John',
    ages: [{
        age: 30,
        city: 'New York'}],
    '2':'Khushi',
    'you fool':'chomu'
}

// console.log(obj2.ages[0].age) // this is chaining
// console.log(obj2['2']); //??


// any question ? .wala jyada prefer kyu nhi karte burai kya hai usme// indexing works with json,array and object

// disadvantages
// .works with only object
// chaining cannot be done
// 'you fool' this cannot be done with .

// clear? ho jaye  new example

// .age  --> this still works but if the key changes to number then  --> err


const obj3 = {
    "Fools":[
        {
            'me':'Adi',
            'age':20
        },{
            'you':'Khushi',
            'age':30
        },
        {
            'both':[
                {
                    'me':'Adi',
                },
                {
                    'you':'Khushi',
                },
                {'ages':45}     // print 45
            ]
        }
    ]
}

// console.log(typeof obj3)        // guess  -> ye array hai kya?   output : false
// console.log(Array.isArray(obj3))        // guess  -> ye array hai kya? 

// console.log(obj3['Fools'])
// console.log(typeof obj3['Fools'])        // output: array (Array is object)        
// console.log(Array.isArray(obj3['Fools']))


// continue  --> properties of array --> length, indexing only by numbers
// console.log(obj3['Fools'][2])
// console.log(Object.keys(obj3['Fools'][2]))
// console.log(obj3['Fools'][2]['both'][2].ages)
// console.log(obj3['Fools'][2]['both'])


// tujhe ek aur question
 const obj4 = {
    'data':[
        [
          {
            "_id": "679b3ab38658ac704224dab1",
            "symbol": "IBM",
            "date": "2025-01-29",
            "close": 228.630004882813,
            "high": 229.470001220703,
            "low": 223.729995727539,
            "open": 225.619995117188,
            "volume": 7036100
          },
          {
            "_id": "679b3ab38658ac704224dab0",
            "symbol": "IBM",
            "date": "2025-01-28",
            "close": 225.660003662109,  // iska na
            "high": 225.770004272461,
            "low": 221.770004272461,
            "open": 224.320007324219,
            "volume": 4485400
          },
          {
            "_id": "679b3ab38658ac704224daaf",
            "symbol": "IBM",
            "date": "2025-01-27",
            "close": 224.130004882813,
            "high": 224.300003051758,
            "low": 219.839996337891,
            "open": 222.190002441406,
            "volume": 4898400
          },
        ]
    ]
 }

 // print "close": 225.660003662109,

console.log(obj4['data'][0][1]['close'])   