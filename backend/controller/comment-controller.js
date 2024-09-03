import comment from "../model/comment.js";

export const uploadComment = async (req,res) => {
    try {
        const commentData = new comment({
            question_id: req.params.id,
            comment: req.body.comment,
            user: req.body.user
        })

        await commentData.save();
        return res.status(201).json({msg:"Comment added successfully", data: doc});
    } catch (error) {
        return res.status(400).json({msg:"Error adding comment"})
    }

}