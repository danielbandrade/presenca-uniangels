const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add a name"]
    },
    status: {
        type: Boolean,
        require: [true, "Please add a status"],
        default: true,
    }

},{
    timestamps: true
}
)



const Member = mongoose.model("Member", memberSchema);
module.exports = Member;