const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtil')
const homeDataPath=path.join(rootDir,'data','homes.json')
const Favourite = require('./favourite'); // Adjust the path based on your project structure

//fake database
let registeredHomes=[]
module.exports=class Home{
  constructor(houseName,price,location,rating ,photoUrl){
    this.houseName=houseName
    this.price=price
    this.location=location
    this.rating=rating
    this.photoUrl=photoUrl
  }
  save(){
    
    // saving the data in the file 
    Home.fetchAll((registeredHomes)=>{
      if(this.id){// edit home case
     registeredHomes=registeredHomes.map(home =>
       home.id === this.id ?this : home
    )
      }else{ // add home case 
        this.id=Math.random().toString();
        registeredHomes.push(this)
      }
      
      fs.writeFile(homeDataPath,JSON.stringify(registeredHomes),error=>{
        console.log("File Writing Concluded",error)
      })
    })
    

  }
  static fetchAll(callback){
    const homeDataPath=path.join(rootDir,'data','homes.json') 
    fs.readFile(homeDataPath,(error,data)=>{
      // agr file nhi mili toh 
     callback(!error?JSON.parse(data):[])
     
    //  return registeredHomes
    })
  }
  static findById(homeId,callback){
    this.fetchAll(homes=>{
      const homeFound=homes.find(home=>home.id===homeId);
      callback(homeFound)
    })
    
  }
  
    
  static deleteById(homeId, callback) {
    this.fetchAll(homes => {
      homes = homes.filter(home => home.id !== homeId); 
      // Filter out the home
      
      fs.writeFile(homeDataPath, JSON.stringify(homes), error=>{
        Favourite.deleteById(homeId,callback)
      }); // Write back updated data
    });
  }
};