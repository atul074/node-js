const fs=require('fs')

const cycle={
    model:'stryder',
    brand:'tata'
}
const cycleJSON=JSON.stringify(cycle)   //object to string
console.log(cycleJSON);

const parseddata=JSON.parse(cycleJSON)   //string to object
console.log(parseddata.brand);

fs.writeFileSync('1-json.json',cycleJSON)

const databuffer =fs.readFileSync('1-json.json')
const datajson=databuffer.toString()            //json to string
const data=JSON.parse(datajson)                 //string to object
console.log(data.brand);

//updating data
data.brand='tata cycles'
const datajson2=JSON.stringify(data)     //object to string
fs.writeFileSync('1-json.json',datajson2)
