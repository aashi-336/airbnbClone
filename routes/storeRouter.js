// //Core Module
// const path=require('path')

// // External Module
// const express=require('express')
// const storeRouter=express.Router()

// // Local Module 
// const homesController=require('../controllers/storeController')

// storeRouter.get("/",homesController.getIndex)
// storeRouter.get("/homes",homesController.getHomes)
// storeRouter.get("/bookings",homesController.getBookings)

// storeRouter.get("/favourites",homesController.getFavouriteList)
// storeRouter.get("/homes/:homeId",homesController.getHomeDetails)
// storeRouter.post("/favourites",homesController.postAddToFavourite)
// module.exports=storeRouter
// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);

storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
storeRouter.post("/favourites", storeController.postAddToFavourite);
storeRouter.post("/favourites/delete/:homeId", storeController.postRemoveFromFavourite);

module.exports = storeRouter;