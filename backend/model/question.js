import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    body: {
        type: String,
        trim: true
    },
    tags: {
        type: [],
        default: []
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
        ref: 'Comments'
    }
});

const Question = mongoose.model('question', questionSchema);
export default Question;
