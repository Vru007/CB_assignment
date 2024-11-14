const { z } =require('zod');

const candidateSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  position: z.string().min(2).max(100),
  experience: z.string(),
  status: z.enum(['pending', 'interviewed', 'accepted', 'rejected']).optional()
});

const statusSchema = z.object({
  status: z.enum(['pending', 'interviewed', 'accepted', 'rejected'])
});

const validateCandidate = (req, res, next) => {
  try {
    candidateSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: 'Validation failed',
      errors: error.errors
    });
  }
};

const validateStatus = (req, res, next) => {
  try {
    statusSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: 'Invalid status',
      errors: error.errors
    });
  }
};

module.exports={
    validateCandidate,
    validateStatus
}