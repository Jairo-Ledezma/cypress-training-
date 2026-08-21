// functions

//declarative function can be called at the begining of the script even though it was declared at a later point in the code 
helloOne() // this will work 

function helloOne() {
  console.log("hello one!");
}

helloOne();

//anonymus function // can only be called after its declaration 
//helloTwo() // this breaks the code
var helloTwo= function (){
    console.log('hello two!')
}

helloTwo()

//ES6 syntax Arrow function 

const arrow = ()=>{
    console.log('hello from arrow')
}

arrow()

//function with arguments 

function multiplePrint(printTimes , name){
    for(let i=1 ; i<=printTimes; i++){
        console.log(name + ' ' + i)
    }
}

multiplePrint(10, 'Leslie')

//function with return statement 

function multiplyByTwo(num){
    return num *2
}

let result = multiplyByTwo(10)
console.log (result)

//importing functions
import {printAge} from '../helpers/printHelper.js'
printAge(5)

//import everything 
import * as helper from '../helpers/printHelper.js'

helper.printAge(10)