
import mongoose from "mongoose";

const taskDataSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    startDate: {
        type: String,
        require: true
    },
    endDate: {
        type: String,
        require: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}
)

export default mongoose.model("task", taskDataSchema)