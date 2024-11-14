const express = require('express');
const candidateController =require( '../controllers/candidateController.js');
const { validateCandidate, validateStatus } =require('../middlewares/validator.js');

const router = express.Router();

// Get all candidates
router.get('/', candidateController.getAllCandidates);

// Get single candidate
router.get('/:id', candidateController.getCandidate);

// Create new candidate
router.post('/', validateCandidate, candidateController.createCandidate);

// Update candidate
router.put('/:id', validateCandidate, candidateController.updateCandidate);

// Update candidate status
router.patch('/:id/status', validateStatus, candidateController.updateStatus);

// Delete candidate
router.delete('/:id', candidateController.deleteCandidate);


module.exports=router;