import answer from "../model/answer.js";

export const uploadAnswer = async (req,res) => {
    try {
        const answerData = new answer({
            question_id: req.body.question_id,
            answer: req.body.answer,
            user: req.body.user
        })

        await answerData.save();
        return res.status(201).json({msg:"Answer uploaded successfully", data: doc});
    } catch (error) {
        return res.status(400).json({msg:"Error adding answer"})
    }

}

