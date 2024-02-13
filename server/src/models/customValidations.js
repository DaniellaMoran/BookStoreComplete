function notEmpty(value) {
    if (!value) {
      throw new Error('Field cannot be empty.');
    }
}
  
module.exports = {
    notEmpty,
};

// usage
// validate: {
//   customValidation(value) {
//       notEmpty(value);
//   },
// }
// const { notEmpty } = require('./customValidations');