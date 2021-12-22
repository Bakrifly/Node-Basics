
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
  process.stdin.on('data', onDataReceived);
  console.log(`\n\nWelcome to ${name}'s application!`)
  console.log("--------------------")
  console.log("type help to see availabe commands and get started\n")
}


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
  console.log('unknown command: "'+c.trim()+'"')
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
  console.log(name + "!")
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
    {Command: "quit",
    argument: "no argument available",
    description:  "quit the application"},
    6:
    {Command: "exit",
    argument: "no argument available",
    description:  "exit the application"},
    7:
    {Command: "clear",
    argument: "no argument availabe" ,
    description: "clear the console"},
    8:
    {Command: "help",
    argument: "no argument available",
    description: "Show available Commands"},
  }


  console.table(Commands_available, );
}


const list = ["buy milk", "get car from repair", "get some stuff from the super market"]

/** 
*
*list function
* @returns {void}
*/
function listItems(){
  if(list.length == 0){console.log('Warning: list is empty!');}
  else{
  for (i=0; i< list.length; i++)
  console.log((i+1)+":"+list[i]+".")
 }
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
   list.push(item)
   console.log("'"+item+"'" + " was added to the list!")}

}
// -------------------------------
/*
*
*remove last item in list function
*/
function removeItem(arg){
  index = parseInt(arg.split(" ")[1])-1

  if(arg === "remove")
  { if(list.length === 0){console.log("Nothing to Remove!")}
  else 
  {console.log("'"+list.at(-1)+"'"+" was Removed from the list")
  list.pop();}

  }
  else{
  if(isNaN(index)){console.log("argumnt is not a Number")}
  else{list.splice(index, 1);
  console.log("list item number '"+ (index + 1) + "' was removed from the list!")}
 }

}



/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Bakri Hmouda")
