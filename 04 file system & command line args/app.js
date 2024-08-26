const yargs = require('yargs')   //npm i yargs

console.log(process.argv);
//node app.js atul     when we run this atul is print 


//yargs.version('69.69')   //customize yargs version

//create add command
//node app.js add      run to use

// yargs.command({
//     command: 'add',
//     describe:'add a new note',
//     handler: function(){
//         console.log('adding a new note!');
        
//     }
// })

//node app.js add --title="shopping list"    run to use
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
       // console.log('adding a new note!',argv);
       console.log('title',argv.title);
       console.log('body',argv.body);
    }
})
//console.log(yargs.argv);
yargs.parse() //use this insteed of above for more formatted way
//node app.js add --title="things to buy"     when we run this { _: [ 'add' ], title: 'things to buy', '$0': 'app.js' } is printed 
//node app.js --help
//node app.js --version

