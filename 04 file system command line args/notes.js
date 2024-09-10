const fs=require('fs')
//const chalk=require('chalk')
//import chalk from "chalk";

// const getnotes=function(){
//     return 'your notes...'
// }  

const addnotes=function(title,body){
    const notes=loadnotes()
//    const duplicatenote=notes.filter(function(note){
//      return note.title===title
//    })
    const duplicatenote=notes.find((note)=>note.title===title)

   //if(duplicatenote.length===0) //for filter 
   if(duplicatenote===undefined) //for find
   {
        notes.push({
            title:title,
            body:body
        })
        savenotes(notes)
        console.log("new note added!");
        
   }
   else{
            console.log("note title is used ");
            

   }
    
}
const savenotes=function(notes){

    const datajson=JSON.stringify(notes)
    fs.writeFileSync('notes.json',datajson);
}
const loadnotes=function(){
    try{
        const databuffer=fs.readFileSync('notes.json')
        const datajson=databuffer.toString();
        return JSON.parse(datajson);
    
    }catch(e){
        return[]
    }
   

}

const removenotes=function(title){
    const notes=loadnotes()
    const notestokeep=notes.filter(function(note){
        return note.title !=title
    })
    if(notes.length>notestokeep.length)
    {
        console.log('note removed');
        savenotes(notestokeep);
    }
    else{
        console.log('no note found!');
        
    }
}

const listnotes=()=>{
    const notes=loadnotes()
    console.log('your notes');
    notes.forEach((note)=>{
        console.log(note.title);
        
    })
    
}

const readnote=(title)=>{
    const notes=loadnotes()
    const note=notes.find((note)=> note.title===title)
    if(note)
    {
        console.log(note.title);
        console.log(note.body);
        
    }
    else
     console.log('note not found!');
     
}
module.exports={
    getnotes:getnotes,
    addnotes:addnotes,
    removenotes:removenotes,
    listnotes:listnotes,
    readnote:readnote
}