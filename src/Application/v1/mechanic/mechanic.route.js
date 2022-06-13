import express from 'express';
import {
  getAllMechanics,
  getMechanicById,
  createMechanic,
  updateMechanic,
  deleteMechanic
} from './mechanic.controller';

const router = express.Router();

router.get('/', getAllMechanics);
router.get('/:idMechanic', getMechanicById);
router.post('/', createMechanic);
router.put('/:idMechanic', updateMechanic);
router.delete('/:idMechanic', deleteMechanic);

export default router;
