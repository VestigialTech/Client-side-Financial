/*
const user_form = document.getElementById("form-for-login")
const submit_button = document.getElementById("submit_button")



submit_button.addEventListener("click", (e) => {
    e.preventDefault();
    const username = user_form.u.value;
    const password = user_form.p.value;

    if (username === "user" && password === "web_dev") {
        print("hello")
        alert("You have successfully logged in.");
        location.reload();
    } else {
        print("nothello")
        alert("failed!")
    }
})


//overall app logic and loader...
function login() {
    "use strict";

  //handle user event for `add` button click
  $(".note-input button").on("click", function(e) {
    //object for wrapper html for note
    var $note = $("<p>");
    //get value from input field
    var note_text = $(".note-input input").val();
    //set content for note
    $note.html(note_text);
    //append note text to note-output
    $(".note-output").append($note);
  });

};

$(document).ready(login);
/*/

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

class HashTable {
  constructor() {
    this.table = new Array(50);
    this.size = 0;
  }
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);}
    return hash % this.table.length;
  }

  set(key, value) {
    const index = this._hash(key);
    this.table[index] = [key, value];
    this.size++;}

  get(key) {
    const target = this._hash(key);
    return this.table[target];}

  check_key(key){
    const target = this.get(key);
    if(target === undefined){return false;}
    else return true;
  }
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
const user_table = new HashTable();
user_table.set("Admin","HashPw");


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
    location.href='Client-Side-Financial-After-Login.html';
    return false;

}
else
{
    alert("login failed");
    return false;
}

}

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
