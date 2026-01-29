

// functions

const welcomePage = (req,res)=>{
    res.render("index")
}
const aboutPage = (req,res)=>{
    res.render("about")
}
const newsPage = (req,res)=>{
    res.render("news")
}
const news1 = (req,res)=>{
    res.render("news1")
}
const newsDated = (req,res)=>{
    res.render("dated")
}
const galleryPage = (req,res)=>{
    res.render("gallery")
}
const contactPage = (req,res)=>{
    res.render("contact")
}


module.exports = {welcomePage, aboutPage, newsPage, galleryPage , contactPage, news1, newsDated}