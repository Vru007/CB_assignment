
// import prisma from '../db/databse.js';
const prisma=require('../db/databse.js')
const candidateController = {
  // Get all candidates
  getAllCandidates: async (req, res, next) => {
    try {
      const candidates = await prisma.candidate.findMany({
        orderBy: {
          appliedDate: 'desc'
        }
      });
      res.json(candidates);
    } catch (error) {
      next(error);
    }
  },

  // Get single candidate
  getCandidate: async (req, res, next) => {
    try {
      const { id } = req.params;
      const candidate = await prisma.candidate.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      
      res.json(candidate);
    } catch (error) {
      next(error);
    }
  },

  // Create new candidate
  createCandidate: async (req, res, next) => {
    try {
      const { name, email, phone, position, experience } = req.body;
      
      const candidate = await prisma.candidate.create({
        data: {
          name,
          email,
          phone,
          position,
          experience,
          // status will default to 'pending'
          // appliedDate will default to now()
        }
      });
      
      res.status(201).json(candidate);
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      next(error);
    }
  },

  // Update candidate
  updateCandidate: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, phone, status, position, experience } = req.body;
      
      const candidate = await prisma.candidate.update({
        where: { id: parseInt(id) },
        data: {
          name,
          email,
          phone,
          status,
          position,
          experience
        }
      });
      
      res.json(candidate);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      next(error);
    }
  },

  // Update candidate status
  updateStatus: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const candidate = await prisma.candidate.update({
        where: { id: parseInt(id) },
        data: { status }
      });
      
      res.json(candidate);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      next(error);
    }
  },

  // Delete candidate
  deleteCandidate: async (req, res, next) => {
    try {
      const { id } = req.params;
      
      await prisma.candidate.delete({
        where: { id: parseInt(id) }
      });
      
      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      next(error);
    }
  }
};

module.exports=candidateController
// export default candidateController;