const multer = require("multer");
const event = require("../modals/event.modal");
const fs = require("fs")

const homeui = async (req, res) => {
    let data = await event.find()
    res.render("home", { data })
}
const eventform = (req, res) => {
    res.render("addevent")
}


const createvent = async (req, res) => {
    const { title, description, date, location, maxAttendees } = req.body;
    const events = new event({
        title,
        description,
        date,
        location,
        maxAttendees,
        imageUrl : req.file.originalname,
        createdBy: req.body.userID,
        attendees: req.body.userID
    });
    await events.save();
    res.redirect("/event/home");

};

const rsvpdata = async (req,res)=>{
    let {id} = req.params
    const events = await event.findById(id);
  if (events.attendees.length >= events.maxAttendees) return res.send('Event is full.');
  
  events.attendees.push(req.body.userID);
  await events.save();
  res.redirect('/event/home');
}

const deletedata = async (req, res) => {
    let { id } = req.params;
    await event.findByIdAndDelete(id);
    res.redirect("/event/home");
  };


  const editdata = async (req, res) => {
    let { id } = req.params;
    const events = await event.findById(id);
  
    res.render("edit", { events });
  };


  
  const updatedata = async (req, res) => {
    let { id } = req.params;
    let listing = await event.findByIdAndUpdate(id, req.body);
    console.log(listing);
    
    res.redirect("/event/home");
  };

  // search and filter

const allData = async (req,res)=>{

    const { date, location, eventType } = req.query;  // Get query parameters

    let filter = {};
  
    // Add filters if they exist
    if (date) filter.date = { $gte: new Date(date) };  // Filter by upcoming date
    if (location) filter.location = location;
  
    const data = await event.find(filter);  // Apply the filters
    res.render("home", { data });

}

module.exports = {
    eventform,
    createvent,
    homeui,
    rsvpdata,
    deletedata,
    editdata,
    updatedata
}