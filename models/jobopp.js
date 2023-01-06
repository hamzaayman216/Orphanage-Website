const mongoose = require('mongoose');
const {Schema}=mongoose;
const joboppSchema= mongoose.Schema({
    jobName: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    qualifications: {
        type: String,
        required: true
    },
    users:[
        {
            type:Schema.Types.ObjectId,
            ref: 'User'
        }

    ]
})
const Job = mongoose.model('Job',joboppSchema);

module.exports = Job;