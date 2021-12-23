let list = []

  const processArg = (process.argv)
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
 
  console.log(`\x1b[44m\n\nWelcome to ${name}'s ToDO application! --v1.0.0`)
  console.log("====================================================\n\x1b[0m")
  console.log("\x1b[2mtype help to see availabe commands and get started\x1b[0m")
 
  // get data
    if(processArg.length === 2)
     {try 
      {const getSavedData = JSON.parse(fs.readFileSync("./database.json", "utf8")); list = getSavedData} catch(err){console.log(err)}} 
    
      else if(processArg.length === 3) {
        const [command, appName, fileName] = processArg;
      try {const getSavedData = JSON.parse(fs.readFileSync(`./${fileName}.json`, "utf8")); list = getSavedData; console.log(`\n\x1b[34m${fileName}.json\x1b[32m was loaded successfully!\x1b[0m\n`)} catch(err){console.log(`\n !---${fileName}.json does not exist so it was created--- \n`)}
      }
 
  process.stdin.on('data', onDataReceived);


}
const fs = require('fs');

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  text = text.trim()
  if (text === 'quit' || text === 'exit') {
    quit();
  }
  else if(text.split(" ")[0] === 'hello' || text.split(" ")[0] === 'Hello' || text === 'hello' || text === 'Hello'){
    hello(text);
  }
  else if(text === 'help'){
    help();
  }
  else if (text === "ls" || text === "list"){
    listItems()
  }
  else if (text.split(" ")[0] === 'add'){
    addItems(text)
  }
  else if (text.split(" ")[0] === "remove"){
    removeItem(text)
  }
  else if (text.split(" ")[0] === "edit"){
    editItem(text)
  }
  else if(text.split(" ")[0] === "check") {
    check(text)
  }
  else if(text.split(" ")[0] === "uncheck") {
    uncheck(text)
  }
  else if (text === "clear"){
    console.clear();
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log(`unknown command: "${c.trim()}"`)
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(name){
  if(name === "hello" || name === "Hello"){
    console.log("Hello!")
  } else {
  console.log(`${name}!`)
  }
}

/**
 * Show help
 * 
 * @returns {void}
 */
function help(){

   const Commands_available = { 
    1:
    {Command: "hello",
    argument: "[your name]",
    description:  "output: Hello [your name]!"},
    2:
    {Command: "ls",
    argument: "no argument available",
    description:  "list all items in the list"},
    3:
    {Command: "add",
    argument: "[item]",
    description: "add [item] to the list"},
    4:
    {Command: "remove",
    argument: "[index]",
    description: "remove alone will remove the last item! or remove item at [index]"},
    5:
    {Command: "edit",
    argument: "[index]",
    description:"edit last item or edit item at [index]"},
    6:
    {Command: "check",
    argument: "[index]",
    description:"mark item at [index] as done"},
    7:
    {Command: "uncheck",
    argument: "[index]",
    description:"mark item at [index] as not done"},
    8:
    {Command: "quit",
    argument: "no argument available",
    description:  "quit the application"},
    9:
    {Command: "exit",
    argument: "no argument available",
    description:  "exit the application"},
    10:
    {Command: "clear",
    argument: "no argument availabe" ,
    description: "clear the console"},
    11:
    {Command: "help",
    argument: "no argument available",
    description: "Show available Commands"},
  }


  console.table(Commands_available, );
}



/** 
*
*list function
* @returns {void}
*/
function listItems(){
  if(list.length == 0){console.log('\nWarning: list is empty!\n');}
  else{
    console.log(`\nitem list`)
    console.log('-----------------------------')
  for (i=0; i< list.length; i++)
  if (list[i].done === true)
  {console.log(`${i + 1}: [\x1b[32m✓\x1b[0m]\x1b[32m${list[i].item}\x1b[0m`)}
  else {console.log(`${i + 1}: [ ]${list[i].item}`)}
 }
 console.log('-----------------------------\n')
}

/*
*
*add function
*/
function addItems(item){

  if(item === "add"){
    console.log("no item specified with the add command!")
  }
  else {
   item= item.substring(4);
   list.push({item: item, done: false})
   console.log(`'${item}' was added to the list!`)}

}
// -------------------------------

/*
*
*remove last item in list function
*/
function removeItem(arg){
  index = parseInt(arg.split(" ")[1])-1;
  if(arg === "remove")
  { if(list.length === 0){console.log("Nothing to Remove!")}
  else 
  {console.log(`'${list.at(-1).item}' was Removed from the list!`);
  list.pop();}

  }
  else{
  if(isNaN(index)){console.log("argumnt is not a Number!")}
  else{
    if(list.length < (index+1)){
      console.log( `the item with index '${index+1}' does not exist!`)
    }else{console.log(`'${list[index].item}' was removed from the list!`);
    list.splice(index, 1);}}
 }
}
// -----------------------------------------------

/*
*
*edit items in the list function
*/
function editItem(arg){
const input = arg.split(" ");

// check if there is a index number or text after edit command
  if(input.length === 1){console.log("\n-please input a text or number to update the last item in the list!")}

  else if(isNaN(parseInt(input[1])) && input.length >= 2){
    const [edit, ...newItem] = input;
    list[list.length -1].item = newItem.join(' ');
    console.log("last item in the list was modified!")
  }

  // check if there is input after index
  else if (input.length >= 2){
    if (!isNaN(parseInt(input[1])) && input.length <= 2)
   {console.log(`no input provided to edit list item at index '${input[1]}'!`)}
   
  //  will edit the index specified line
  // check if index has item
   else if (!isNaN(parseInt(input[1])) && input.length >= 2)
    { if(parseInt(input[1]) > list.length ){console.log(`no item at index '${input[1]}'!`)}
    else {const [edit, index, ...newItem] = input;
    list[index-1].item = newItem.join(' ')
    console.log(`item '${index}' was modified!` )}
  }
 }
}
// --------------------------

/**
 * 
 * 
 * check  function
 * 
 */
function check(arg){
 const input = arg.split(' ');
 let index = parseInt(arg.split(" ")[1])-1;

  if( input.length === 1 ) {console.log('please input an index!')}

   else if( input.length === 2){
  
   if(isNaN(index)){console.log('please only input a number as the index!')} else if (list.length < (index +1)) {console.log("no item at specified location!")}
 
   else { 
     if(list[index].done === true){console.log('this item is already checked!')} else{
     list[index].done = true;
     console.log( `'${list[index].item}' got checked as done!`)
     }  
    }
  } 
}
//------------------

/**
 * 
 * 
 * uncheck function
 * 
 */
 function uncheck(arg){
  const input = arg.split(' ');
  let index = parseInt(arg.split(" ")[1])-1;
 
   if( input.length === 1 ) {console.log('please input an index!')}
 
    else if( input.length === 2){
   
    if(isNaN(index)){console.log('please only input a number as the index!')} else if (list.length < (index +1)) {console.log("no item at specified location!")}
  
    else { 
      if(list[index].done === false){console.log('this item is already unchecked!')} else{
      list[index].done = false;
      console.log( `'${list[index].item}' got unchecked!`)
      }  
     }
   } 
 }


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){

  //save data to file
if (processArg.length === 2){ 
fs.writeFileSync("database.json", JSON.stringify(list, null, 4,),);
console.log("\n \x1b[32mData was saved to \x1b[34mdatabase.json\x1b[32m successfully\x1b[0m\n")} 

else {
  const [command, appName, fileName] = processArg;
  fs.writeFileSync(`${fileName}.json`, JSON.stringify(list, null, 4,),);
  console.log(`\n\x1b[32mData was saved to \x1b[34m${fileName}.json\x1b[32m successfully\x1b[0m\n`)
}
console.log('Quitting now, goodbye!')
  process.exit();
}



// The following line starts the application
startApp("Bakri Hmouda")
