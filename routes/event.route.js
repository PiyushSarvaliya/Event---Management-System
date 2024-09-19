const {Router} = require("express")
const { eventform, homeui,  createvent, rsvpdata, deletedata, editdata, updatedata } = require("../controllers/evnt.controller")
const multer = require("multer");
const { Auth } = require("../middleware/auth");
const path = require("path")
const eventroute = Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + path.extname(file.originalname))
});
const upload = multer({ storage });

eventroute.get("/addevent" , Auth ,eventform)
eventroute.get("/home" , Auth,homeui)
eventroute.post("/addevent" ,upload.single('image'), Auth , createvent)
eventroute.post("/RSPV/:id", Auth, rsvpdata);
eventroute.delete("/:id",Auth,deletedata);
eventroute.get("/:id/edit",Auth,editdata);
eventroute.patch("/:id/",Auth,updatedata);

module.exports = eventroute