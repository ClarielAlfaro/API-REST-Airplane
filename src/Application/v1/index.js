import express from 'express';
import planeRoutes from './plane/plane.route';
import companyRoutes from './company/company.route';
import personRoutes from './person/person.route';

const router = express.Router();

router.use('/planes', planeRoutes);
router.use('/companies', companyRoutes);
router.use('/persons', personRoutes);

export default router;
