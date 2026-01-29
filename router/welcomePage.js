

// requring modules
const express = require("express")
const router = express.Router()
const {welcomePage, aboutPage, contactPage, newsPage, galleryPage, news1, newsDated} = require("../controller/welcomePage")

router.get("/" ,welcomePage)
router.get("/about", aboutPage)
router.get("/contact", contactPage)
router.get("/news", newsPage)
router.get("/gallery", galleryPage)
router.get("/news1", news1)
router.get("/newsDated", newsDated)

module.exports = router