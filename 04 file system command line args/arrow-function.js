// const square =(x)=>{
//     return x*x;
// }

const square =(x)=> x*x;

//console.log(square(4));
const dost={
 name:'atul',
 friends:['harsh','nitin','aryan','rahul'],
 printzone()
 {  const that =this
    console.log('friend list of '+ this.name);

 //   this.friends.forEach(function(friend){
    this.friends.forEach((friend)=>{    
        console.log(friend +' is friend of '+ that.name);  //we use that because we cant acess by using this.name inside loop but can access by using arrow function
        
    })    
    
 }
}
dost.printzone();