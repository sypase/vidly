const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Genre, validate } = require('../models/genre');
////////////
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});
///////////Post//////////////
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});
///////Put///////
router.put('/:id', async (req, res) => {
  // console.log('here');
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  console.log('here');
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  // ).catch((err) =>
  //   res.status(404).send('THe genere with the given id was not found..')
  // );
  if (!genre)
    return res.status(404).send('THe genere with the given id was not found..');

  res.send(genre);
});
///////////////Delete
router.delete('/:id', async (req, res) => {
  const genere = await Genre.findByIdAndRemove(req.params.id);
  if (!genere) {
    return res.status(404).send('THe genere with the given id was not found..');
  }
  res.send(genere);
});
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send('The genre with the given id was not found');
  res.send(genre);
});
///Validation Function

module.exports = router;
