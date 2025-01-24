const Home=require('../models/home')
exports.getAddHome =(req,res,next)=>{
  res.render('host/edit-home',{pageTitle:'addHome',currentPage:'addHome',editing:false,})

}
exports.getEditHome=(req,res,next)=>{
  const homeId=req.params.homeId
  const editing =req.query.editing==='true'

  Home.findById(homeId,home=>{
    if(!home){
      console.log("Home not found for editing")
      return res.redirect("/host/host-home-list")
    }
    console.log(homeId,editing,home)
    res.render('host/edit-home',{home:home,pageTitle:'Edit your Home',currentPage:'host-Homes',editing:editing,})

  })

  
}
exports.getHostHomes=(req,res,next)=>{
  // const registeredHomes=Home.fetchAll()
  // link
  Home.fetchAll((registeredHomes)=>res.render('host/host-home-list',{registeredHomes:registeredHomes ,pageTitle:'Host Homes List',currentPage:'host-Homes'}))
  // console.log(registeredHomes)
  
  // ejs file objectpass
}
exports.postAddHome=(req,res,next)=>{
  // console.log("Home Registration Successful for:",req.body)
  const {houseName,price,location,rating,photoUrl}=req.body
  const home=new Home(houseName,price,location,rating,photoUrl)
  home.save()
  res.redirect('/host/host-home-list') 
  // registeredHomes.push(req.body)
  // res.sendFile(path.join(rootDir,'views','homeAdded.html'))
  // res.render('host/home-added',{pageTitle:'Home Added',currentPage:'Home Added'})   
}
exports.postEditHome=(req,res,next)=>{
  // console.log("Home Registration Successful for:",req.body)
  const {id,houseName,price,location,rating,photoUrl}=req.body
  const home=new Home(houseName,price,location,rating,photoUrl)
  home.id=id
  home.save()
  // registeredHomes.push(req.body)
  // res.sendFile(path.join(rootDir,'views','homeAdded.html'))
  res.redirect('/host/host-home-list')   
}
// exports.registeredHomes=registeredHomes


exports.postDeleteHome=(req,res,next)=>{
  const homeId=req.params.homeId
  console.log('Came to delete homeId',homeId)
  Home.deleteById(homeId,error=>{
    if(error){
      console.log('Error while deleting',error)
    }
    res.redirect('/host/host-home-list') 
  })
  
   
}