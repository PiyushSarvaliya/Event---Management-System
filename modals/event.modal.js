const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    maxAttendees: { type: Number, required: true },
    imageUrl: { type: String },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'eventuser' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'eventuser'},
}, { timestamps: true });

const event = mongoose.model('Event', eventSchema);

module.exports = event