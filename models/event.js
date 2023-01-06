const mongoose = require('mongoose');
const {Schema}=mongoose;
const eventSchema= mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    myusers:[
        {
            type:Schema.Types.ObjectId,
            ref: 'User'
        }

    ]
 
})
const Event = mongoose.model('Event',eventSchema);

module.exports = Event;