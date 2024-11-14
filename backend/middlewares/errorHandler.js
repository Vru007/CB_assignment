const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Prisma error handling
    if (err.code) {
      switch (err.code) {
        case 'P2002':
          return res.status(400).json({
            message: 'Unique constraint failed',
            field: err.meta?.target?.[0]
          });
        case 'P2025':
          return res.status(404).json({
            message: 'Record not found'
          });
      }
    }
  
    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  };
  
//   export default errorHandler;
  module.exports=errorHandler