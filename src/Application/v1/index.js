import express from 'express';
import planeRoutes from './plane/plane.route';
import companyRoutes from './company/company.route';

const router = express.Router();

router.use('/planes', planeRoutes);
router.use('/companies', companyRoutes);

export default router;
