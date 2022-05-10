import express from 'express';
import {
  getAllPlanes,
  getPlaneById,
  createPlane,
  updatePlane,
  deletePlane,
} from './plane.controller';

const router = express.Router();

router.get('/', getAllPlanes);
router.get('/:idPlane', getPlaneById);
router.post('/', createPlane);
router.put('/:idPlane', updatePlane);
router.delete('/:idPlane', deletePlane);

export default router;
