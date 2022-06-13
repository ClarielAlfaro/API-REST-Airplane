import express from 'express';
import {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
} from './plan.controller';

const router = express.Router();

router.get('/', getAllPlans);
router.get('/:idPlan', getPlanById);
router.post('/', createPlan);
router.put('/:idPlan', updatePlan);
router.delete('/:idPlan', deletePlan);

export default router;
