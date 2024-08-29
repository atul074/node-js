const yargs = require('yargs') 
const notes=require('./notes.js')

yargs.command({
    command: 'add',
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
    command: 'remove',
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
yargs.parse()