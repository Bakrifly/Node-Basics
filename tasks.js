
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
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
  console.log("type help to see availabe commands and get started")
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
    {Command: "quit",
    argument: "no argument available",
    description:  "quit the application"},
    3:
    {Command: "exit",
    argument: "no argument available",
    description:  "exit the application"},
    4:
    {Command: "help",
    argument: "no argument available",
    description: "Show available Commands"},
  }


  console.table(Commands_available, );
}
// console.log ( 
// `
// commands available
//  ----------------------------------------------------
// '                                                    '
// ' command--------------description                   '
// '                                                    '
// ' hello----------------say hello!                   '
// ' quit-----------------exit the application          '
// ' exit-----------------same effect as quit command   '
// ' help-----------------list available commands       '
// '----------------------------------------------------'
// `)
// }


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
