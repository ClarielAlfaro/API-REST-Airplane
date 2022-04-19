import express from 'express';
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
} from './company.controller';

const router = express.Router();

router.get('/', getAllCompanies);
router.get('/:idCompany', getCompanyById);
router.post('/', createCompany);
router.put('/:idCompany', updateCompany);
router.delete('/:idCompany', deleteCompany);

export default router;
