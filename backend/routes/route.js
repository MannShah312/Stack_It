import { signupUser, loginUser, logoutUser } from '../controller/user-controller.js';
import { authenticateToken ,createNewToken } from '../controller/jwt-controller.js';
import { uploadQuestion, lookupQuestion, oneQuestion, allQuestions, upvoteQuestion, downvoteQuestion } from '../controller/question-controller.js';
import express from 'express';
import { uploadAnswer } from '../controller/answer-controller.js';
import { uploadComment } from '../controller/comment-controller.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser); 
router.post('/token', createNewToken);
router.post('/question', authenticateUser, uploadQuestion);
router.post('/answer', authenticateUser, uploadAnswer);
router.post('/comment/:id', uploadComment);
router.get('/question/:id',lookupQuestion);
router.get('/allquestion',allQuestions);
router.patch('/question/:id/upvote', authenticateUser, upvoteQuestion);
router.patch('/question/:id/downvote', authenticateUser, downvoteQuestion);

export default router;