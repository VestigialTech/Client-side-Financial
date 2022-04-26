
var table = JSON.parse(localStorage.getItem('table'));
var username = localStorage.getItem('username');
username = username.replace(/['"]+/g, '');
document.getElementById("user").innerHTML = username;
console.log(typeof(table));
console.log(table);
console.log(username);
/*

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

    make_Hash_Table(arr){
        
        
        var atb = arr['table'];
        console.log(atb);
        //tab = new HashTable();
        Object.keys(atb).forEach(key => {
            if(atb[key]!= null){
            console.log(atb[key])
            this.set(atb[key][0],atb[key][1])} 
          });
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
*/


var HashTab = new HashTable();
//HashTab = table;
console.log(HashTab);
HashTab.make_Hash_Table(table);

console.log(HashTab);
console.log(HashTab.check_key('user1'));
var cityname = "chicago"
//console.log(cityname);
localStorage.setItem('cityinput',JSON.stringify(cityname));
localStorage.setItem('table1',JSON.stringify(HashTab));