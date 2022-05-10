import express from 'express';
import {
  getAllPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
} from './person.controller';

const router = express.Router();

router.get('/', getAllPeople);
router.get('/:idPerson', getPersonById);
router.post('/', createPerson);
router.put('/:idPerson', updatePerson);
router.delete('/:idPerson', deletePerson);

export default router;
