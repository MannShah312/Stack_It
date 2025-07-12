import mongoose from "mongoose";

const answerScehma = mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions"
    },
    answer: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }
});

const answer  = mongoose.model('answer', answerScehma);
export default answer;