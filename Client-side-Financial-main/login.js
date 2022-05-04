const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');

openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-110%';
}

/* HashTable Class - 
The class is used to create a Hash Table to store 
Users Login/password pairs using Hashing
*/ 
class HashTable {
  //Constructor method to initialize the HashTable
  constructor() {
    this.table = new Array(50);
    this.size = 0;
  }
  //The primary hashing method, uses the charcode and modulus operations
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);}
    return hash % this.table.length;
  }
  //Setter method for the class
  set(key, value) {
    const index = this._hash(key);
    this.table[index] = [key, value];
    this.size++;}

  //Getter Method for the class
  get(key) {
    const target = this._hash(key);
    return this.table[target];}

  //Helper method to check for existing keys
  check_key(key){
    const target = this.get(key);
    if(target === undefined){return false;}
    else return true;
  }

  //Helper method to check for key/value pair used in login process
  check_key_value(key,val){
    const target = this.get(key);
    if(target!==undefined)
    {
      const pw = target[1];

      if(val == pw){
          return true;
      }
      else{
          return false;
      }
    
    }
    else{
        alert("No such username, Please create an account with us");
    }
}
}

//Creating new HashTable in the login screen.
const user_table = new HashTable();
//Creating an Admin user
user_table.set("Admin","HashPw");


/**
 * Validate - Used to validate the user login. 
 * The method checks the user inputs against HashTable 
 * and if the information is correct, redirects user to 
 * the after login page.
 */
function validate()
{
  var username=document.getElementById("username").value;
  var password=document.getElementById("password").value;

  if(username == null || username == "" || password == "" || password == null){
    alert("Username or Password cannot be empty!");
    return false;
  }

  if(user_table.check_key_value(username,password))
  {
      alert("login successful");
      localStorage.setItem('username',JSON.stringify(username))
      localStorage.setItem('table',JSON.stringify(user_table))
      location.href='Client-Side-Financial-After-Login.html';
      return false;

  }
  else
  {
      alert("login failed");
      return false;
  }

}

/**
 * Signup - Used to create a new user. 
 * The method checks if the user is present in the table.
 * If not, it adds a new entry to the HashTable. 
 */
function signup()
{


  var username=document.getElementById("username").value;
  var password=document.getElementById("password").value;

  if(username == null || username == "" || password == "" || password == null){
    alert("Username or Password cannot be empty!");
    return false;
  }

  if(user_table.check_key(username)){
      alert("user already created, please login");
      return false;
  }

  else{
  user_table.set(username,password);
  console.log(user_table.get(username));
  alert("user created, please login now");
  return false;
  }
}
