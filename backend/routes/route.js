import { signupUser, loginUser, logoutUser } from '../controller/user-controller.js';
import { createNewToken } from '../controller/jwt-controller.js';
import { uploadQuestion, lookupQuestion, allQuestions, upvoteQuestion, downvoteQuestion, getUnansweredQuestions } from '../controller/question-controller.js';
import express from 'express';
import { uploadAnswer } from '../controller/answer-controller.js';
import { uploadComment } from '../controller/comment-controller.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/unanswered-questions', getUnansweredQuestions);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser);
router.post('/token', createNewToken);
router.post('/question', authenticateUser, uploadQuestion);
router.post('/answer', uploadAnswer);
router.post('/comment/:id', uploadComment);
router.get('/question/:id',lookupQuestion);
router.get('/allquestion',allQuestions);
router.patch('/question/:id/upvote', authenticateUser, upvoteQuestion);
router.patch('/question/:id/downvote', authenticateUser, downvoteQuestion);

export default router;