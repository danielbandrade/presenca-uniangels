const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
    member: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Member', 
        required: true },
    date: { 
        type: Date, 
        required: true },
    isPresent: { 
        type: Boolean, 
        default: false },
},{
    timestamps: true
}
)

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance; 