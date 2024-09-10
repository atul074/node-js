const yargs = require('yargs') 
const notes=require('./notes.js')

yargs.command({
    command: 'add',                     //node app2.js add --title="abc" --body="xyz"
    describe:'add a new note',
    builder: {
        title:{
            describe:'note title',
            demandOption: true,     //by default false
            type:'string'
        },
        body:{
            describe: 'note body',
            demandOption : true,
            type :'string'
        }
    },
    handler: function(argv){
        // console.log("hii");
        // console.log('title',argv.title);
        // console.log('body',argv.body);
       notes.addnotes(argv.title,argv.body)
    }
})

//remove command
yargs.command({
    command: 'remove',           //node app2.js remove --title="abc"
    describe:'remove a note',
    builder:{
        title:{
            describe:'note title',
            demandOption: true,
            type:'string'
        }
    },
    handler:function(argv){
        notes.removenotes(argv.title)

    }
})

//list command
yargs.command({
    command:'list',
    describe:'list your notes',
    handler(){
        notes.listnotes()
    }
})

//read command
yargs.command({
    command:'read',
    describe:'read a notes',
    builder:{
        title:{
            describe:'note title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
      notes.readnote(argv.title)
       
    }
})
yargs.parse()