import express from 'express';
import {
  getAllTaxies,
  getTaxiById,
  createTaxi,
  updateTaxi,
  deleteTaxi,
} from './taxi.controller';

const router = express.Router();

router.get('/', getAllTaxies);
router.get('/:idTaxi', getTaxiById);
router.post('/', createTaxi);
router.put('/:idTaxi', updateTaxi);
router.delete('/:idTaxi', deleteTaxi);

export default router;
