import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions"
    },
    comment: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    }
});

const comment = mongoose.model('comment', commentSchema);
export default comment;
