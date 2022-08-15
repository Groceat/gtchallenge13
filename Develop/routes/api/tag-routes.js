const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const cateData =  await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as :"products"}],
    });
    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const catData =  await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as :"products"}],
    });

    if (!catData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const catData = await Tag.create({
      location_name: req.body.location_name
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const update = await Tag.update(req.body,{
      where: {id: req.params.id,}
      });
        res.status(200).json(update)
      } catch (err) {
        res.status(400).json(err);}
      });

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const pData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!pData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(pData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router
