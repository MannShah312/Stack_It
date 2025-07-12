import mongoose from "mongoose";
import Question from "../model/question.js";

// Handler for uploading a question
export const uploadQuestion = async (req, res) => {
    try {
        const questionData = new Question({
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags, 
            user: req.body.username
        });
        await questionData.save();
        const response = { isFailure: false, msg: "Question uploaded successfully", questionId: questionData._id};
        console.log("Success response:", response);
        return res.status(201).json(response);
    } catch (error) {
        console.error("Error uploading question:", error);
        return res.status(400).json({ msg: "Error adding question" });
    }
};

export const lookupQuestion = async (req, res) => {
    const error = {
        message: "Error in retrieving questions",
        error: "Bad request",
    };

    try {
        const questionId = new mongoose.Types.ObjectId(req.params.id);  // Use `Types.ObjectId` directly for querying
        console.log(questionId);
        const questionDetails = await Question.aggregate([
            {
                $match: { _id: questionId }, 
            },
            {
                $lookup: {
                    from: "comments",
                    let: { question_id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$question_id", "$$question_id"],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                comment: 1,
                                created_at: 1,
                            },
                        },
                    ],
                    as: "comments",
                },
            },
            {
                $lookup: {
                    from: "answers",
                    let: { question_id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$question_id", "$$question_id"],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                answer: 1,
                                created_at: 1,
                                user: 1,
                            },
                        },
                    ],
                    as: "answerDetails",
                },
            },
            {
                $project: {
                    __v: 0,
                },
            },
        ]).exec();

        res.status(200).send(questionDetails);
    } catch (e) {
        console.error("Error retrieving questions:", e);
        res.status(400).send(error);
    }
};

export const oneQuestion = async (req, res) => {
    const error = {
        message: "Error in retrieving questions",
        error: "Bad request",
    };

    try {
        const questionId = new mongoose.Types.ObjectId(req.params.id);
        console.log("Requested ID:", req.params.id);  // Log before the aggregation
        const questionDetails = await Question.aggregate([
            {
                $match: { _id: questionId },
            },
            {
                $lookup: {
                    from: "comments",
                    let: { question_id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$question_id", "$$question_id"],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                comment: 1,
                                created_at: 1,
                            },
                        },
                    ],
                    as: "comments",
                },
            },
            {
                $lookup: {
                    from: "answers",
                    let: { question_id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$question_id", "$$question_id"],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                answer: 1,
                                created_at: 1,
                                user: 1,
                            },
                        },
                    ],
                    as: "answerDetails",
                },
            },
            {
                $project: {
                    __v: 0,
                },
            },
        ]).exec();

        res.status(200).send(questionDetails);
    } catch (e) {
        console.error("Error retrieving questions:", e);
        res.status(400).send(error);
    }
};
