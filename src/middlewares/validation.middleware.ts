export const validateRequest = (req, res, next) => {
  const token = req.headers['token'];
  if (token === process.env.VALID_TOKEN) {
    next();
  } else {
    res.status(401).send({ message: 'Can not process the request.' });
  }
};
