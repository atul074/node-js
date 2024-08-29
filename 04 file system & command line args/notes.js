const fs=require('fs')
const getnotes=function(){
    return 'your notes...'
}

const addnotes=function(title,body){
    const notes=loadnotes()
   const duplicatenote=notes.filter(function(note){
     return note.title===title
   })

   if(duplicatenote.length===0)
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
}
module.exports={
    getnotes:getnotes,
    addnotes:addnotes,
    removenotes:removenotes
}