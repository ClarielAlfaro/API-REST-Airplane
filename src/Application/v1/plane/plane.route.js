import express from 'express';
import {
  getAllPlanes,
  getPlaneById,
  createPlane,
  UpdatePlane,
  deletePlane,
} from './plane.controller';

const router = express.Router();

router.get('/', getAllPlanes);
router.get('/:idPlane', getPlaneById);
router.post('/', createPlane);
router.put('/:idPlane', UpdatePlane);
router.delete('/:idPlane', deletePlane);

export default router;
