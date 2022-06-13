import express from 'express';
import taxiRoutes from './taxi/taxi.route';
import userRoutes from './user/user.route';
import mechanicRoutes from './mechanic/mechanic.route';
import subscriptionRoutes from './subscription/subscription.route';
import planRoutes from './plan/plan.route';

const router = express.Router();

router.use('/taxies', taxiRoutes);
router.use('/users', userRoutes);
router.use('/mechanics', mechanicRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/plans', planRoutes);

export default router;
