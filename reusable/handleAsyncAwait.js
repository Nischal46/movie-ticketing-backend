module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      res.status(400).json({
        status: "fail",
        message: "Bad Request",
        error: err.message,
      });
    });
  };
};
