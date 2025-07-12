import { signupUser, loginUser } from '../controller/user-controller.js';
import { authenticateToken ,createNewToken } from '../controller/jwt-controller.js';
import { uploadQuestion, lookupQuestion, oneQuestion, allQuestions } from '../controller/question-controller.js';
import express from 'express';
import { uploadAnswer } from '../controller/answer-controller.js';
import { uploadComment } from '../controller/comment-controller.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/token', createNewToken);
router.post('/question', uploadQuestion);
router.post('/answer', uploadAnswer);
router.post('/comment/:id', uploadComment);
router.get('/question/:id',lookupQuestion);
router.get('/allquestion',allQuestions);

export default router;