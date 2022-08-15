const router = require('express').Router();
const { Category, Product } = require('../../models');
const express = require('express');
const path = require('path');
const axios = require("axios");
const { update } = require('../../models/Category');
const app = express();
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    console.log("finding")
    const cateData = await Category.findAll({ include: [{ model: Product }],})
    console.log(cateData)
    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!catData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const catData = Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
  const update = await Category.update(req.body,{
    where: {id: req.params.id,}
    });
      res.status(200).json(update)
    } catch (err) {
      res.status(400).json(err);}
    });

router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy({where: {id: req.params.id,}}
    );
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
