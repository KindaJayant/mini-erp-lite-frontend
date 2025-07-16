import express from 'express';
import { getReorderSuggestion } from '../controllers/aiController.js';

const router = express.Router();

router.post('/reorder-suggestion', getReorderSuggestion);

export default router;
