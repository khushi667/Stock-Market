import express from 'express';
import { getAllAlerts, addAlert, deleteAlert, clearAlerts } from '../controllers/alertController.js';

const router = express.Router();

router.get('/', getAllAlerts);
router.post('/', addAlert);
router.delete('/:id', deleteAlert);
router.delete('/clear', clearAlerts);

export default router;
