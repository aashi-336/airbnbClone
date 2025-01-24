// const Home=require('../models/home')
// const Favourite=require('../models/favourite')
// // exports.registeredHomes=registeredHomes

// exports.getHomes=(req,res,next)=>{
//   // const registeredHomes=Home.fetchAll()
//   Home.fetchAll((registeredHomes)=>res.render('store/home-list',{registeredHomes:registeredHomes ,pageTitle:'Homes List',currentPage:'Home'}))
//   // console.log(registeredHomes)
  
//   // ejs file objectpass
// }
// exports.getIndex=(req,res,next)=>{
//   // const registeredHomes=Home.fetchAll()
//   Home.fetchAll((registeredHomes)=>res.render('store/index',{registeredHomes:registeredHomes ,pageTitle:'airbnb Home',currentPage:'index'}))
//   // console.log(registeredHomes)
  
//   // ejs file objectpass
// }
// exports.getBookings=(req,res,next)=>{
//   // Home.fetchAll((registeredHomes)=>res.render('store/bookings',{registeredHomes:registeredHomes ,pageTitle:'My Bookings',currentPage:'bookings'}))
//   res.render('store/bookings',{ pageTitle:'My Bookings',currentPage:'bookings'})

// }

// exports.getFavouriteList=(req,res,next)=>{
//   // res.render('store/favourite-list',
//   //   {registeredHomes:registeredHomes ,pageTitle:'My Favourites',currentPage:'favourites'})
//   Favourite.getFavourites(favourites=>{
//     Home.fetchAll((registeredHomes)=>{
//       const favouriteHomes=registeredHomes.filter(home=>favourites.includes(home.id))
//       res.render('store/favourite-list',{ favouriteHomes:favouriteHomes,pageTitle:'My Favourites',currentPage:'favourites'})})
//   })
    
// }
// exports.postAddToFavourite=(req,res,next)=>{
//   //  console.log("Came to add to favourite",req.body)
//    Favourite.addToFavourite(req.body.id,error=>{
//     if(error){
//       console.log("Error while marking favourite",error) 
//     }
//     res.redirect('/favourites')  
//    })
  
// }
// exports.getHomeDetails=(req,res,next)=>{
//   const homeId=req.params.homeId
//   console.log("At home details page ",homeId)
//   Home.findById(homeId,home=>{
//     if(!home){
//       console.log("Home not found")
//       res.redirect('/homes')
//     }
//     else{
//       // console.log("Home Details Found",home)
//     res.render("store/home-detail",{home: home,pageTitle:"Home Detail",currentPage:"Home"})
//     }
    
//   })
  
// }
const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites(favourites => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter(home => favourites.includes(home.id));
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      })
    });
  })

};

exports.postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, error => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favourites");
  })
}

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    }
    res.redirect("/favourites");
  })
}

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, home => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  })
};
