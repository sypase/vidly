const mongoose = require('mongoose');const Joi = require('joi');
const genreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  });
  const Genre = mongoose.model('Genra', genreSchema);


  function validateGenere(genere) {
    const schema = {
      name: Joi.string().min(3).required(),
    };
    return Joi.validate(genere, schema);
  }

  module.exports.Genre=Genre;
  module.exports.validate=validateGenere;