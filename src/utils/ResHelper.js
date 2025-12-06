const codeMap = {
  200: 'Success',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server Error',
};

const ResHelper = (req, res, next) => {
  res.success = (data = null, code = 200, message = codeMap[code]) => {
    return res.json({
      code,
      message,
      data,
    });
  };

  res.error = (code = 500, message = codeMap[code]) => {
    return res.json({
      code,
      message,
    });
  };

  next();
};

module.exports = ResHelper;
