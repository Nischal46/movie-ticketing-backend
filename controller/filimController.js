const filimDTO = require("./../model/filimModel");

const {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
} = require("./../reusable/handleFactoryFunction");

exports.createMovie = createDocument(filimDTO);
exports.getAllMovie = getDocument(filimDTO);
exports.getMovie = getDocument(filimDTO);
exports.updateMovie = updateDocument(filimDTO);
exports.deleteMovie = deleteDocument(filimDTO);
