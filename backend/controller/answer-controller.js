// import answer from "../model/answer.js";

// export const uploadAnswer = async (req,res) => {
//     try {
//         const answerData = new answer({
//             question_id: req.body.question_id,
//             answer: req.body.answer,
//             user: req.user.username,
//         })

//         await answerData.save();
//         return res.status(201).json({msg:"Answer uploaded successfully", data: doc});
//     } catch (error) {
//         return res.status(400).json({msg:"Error adding answer"})
//     }
// }


import answer from "../model/answer.js";

export const uploadAnswer = async (req, res) => {
    try {
        const answerData = new answer({
            question_id: req.body.question_id,
            answer: req.body.answer,
            user: req.user.username,  // taken from authMiddleware
        });

        const doc = await answerData.save();

        return res.status(201).json({
            msg: "Answer uploaded successfully",
            data: doc
        });
    } catch (error) {
        console.error("❌ Error in uploadAnswer:");
        console.error("Message:", error.message);
        console.error("Stack:", error.stack);
        return res.status(400).json({
            msg: "Error adding answer",
            error: error.message
        });
    }
};