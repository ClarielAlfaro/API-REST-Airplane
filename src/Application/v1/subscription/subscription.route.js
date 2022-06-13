import express from 'express';
import {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription
} from './subscription.controller';

const router = express.Router();

router.get('/', getAllSubscriptions);
router.get('/:idSubs', getSubscriptionById);
router.post('/', createSubscription);
router.put('/:idSubs', updateSubscription);
router.delete('/:idSubs', deleteSubscription);

export default router;
