const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");

//all listings route
router.get("/", wrapAsync(listingControllers.index));

//new route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

//show route
router.get("/:id", wrapAsync(listingControllers.show));

//create route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingControllers.create)
);

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.edit)
);

//Update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingControllers.update)
);

//delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControllers.delete)
);

module.exports = router;
