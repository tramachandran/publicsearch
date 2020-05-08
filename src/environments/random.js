function permAlone(str) {
  let strArray = str.split('');
  let temp, dest = strArray.splice(0, 1);
  for (const char of strArray) {
    const arr = dest.splice(0, dest.length);
    for (const item of arr) {
      const itemArr = item.split('');
      for (let item = 0; item <= itemArr.length; item++) {
        let newItem = itemArr.slice(0);
        newItem.splice(item , 0, char);
        dest.push(newItem.join(''));
      }
    }
    
  }
 let regEx = /(.)\1+/;
 return dest.filter((str) => {
   return !str.match(regEx)
 }).length;
}

console.log(permAlone('aab'))

function sym(...args) {
  let symArr = [... new Set(args[0])];
  args.splice(0,1);
  for (const eachArg of args ) {
    for (const item of [... new Set(eachArg)]) {
      const index = symArr.indexOf(item);
      if (index >= 0) {
        symArr.splice(index, 1);
      } else {
        symArr.push(item);
      }
    }
  }
  return symArr;
}
console.log(sym([1, 2, 3, 3], [5, 2, 1, 4]));

function updateInventory(arr1, arr2) {
    let obj2 = {};
    for(const item of arr2) {
        if (item[0] || item[1])
            obj2[item[1]] = item[0];
    }
    let obj1 = {};
    for(const item of arr1) {
        if (item[0] || item[1])
            obj1[item[1]] = item[0];
    }
    for (const item in obj2) {
        if (obj1[item]) {
            obj1[item] = obj1[item] + obj2[item];
        } else {
            obj1[item] = obj2[item];
        }
    }
    let arrOutput = []
    for (const item in obj1) {
        arrOutput.push([obj1[item], item]) ;
    }
    arrOutput.sort((a, b) => {
        if (a[1] < b[1]) {
            return -1;
        }
        if (b[1] < a[1]) {
            return 1;
        }
        return 0;
    })
    return arrOutput;
}

// Example inventory lists
var curInv = [[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]];

var newInv = [[1, "Bowling Ball"], [1, "Toothpaste"]];

console.log(updateInventory(curInv, newInv));
