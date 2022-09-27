



const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (request, response) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }
    ]
  })

  .then(dbTagData => response.json(dbTagData))
  .catch(error => {
    console.log(error);
    response.status(500).json(error);
  });
});


router.get('/:id', (request, response) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: request.params.id
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }
    ]
  })

  .then(dbTagData => {
    if (!dbTagData) {
      response.status(404).json({ message: "Sorry, no tag found with this id"});
      return;
    }
    response.json(dbTagData);
  })

  .catch(error => {
    console.log(error);
    response.status(500).json(error);
  });
});


router.post('/', (request, response) => {
  // create a new tag
  Tag.create({
    tag_name: request.body.tag_name
  })

  .then(dbTagData => response.json(dbTagData))
  .catch(error => {
    console.log(error);
    response.status(500).json(error);
  });
});


router.put('/:id', (request, response) => {
  // update a tag's name by its `id` value
  Tag.update(request.body, {
    where: {
      id: request.params.id
    }
  })

  .then(dbTagData => {
    if (!dbTagData[0]) {
      response.status(404).json({ message: "Sorry, no tag found with this id"});
      return;
    }
    response.json(dbTagData);
  })

  .catch(error => {
    console.log(error);
    response.status(500).json(error);
  });
});


router.delete('/:id', (request, response) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: request.params.id
    }
  })

  .then(dbTagData => {
    if (!dbTagData) {
      response.status(404).json({ message: "Sorry. no tag found with this id"});
      return;
    }
    response.json(dbTagData);
  })

  .catch(error => {
    console.log(error);
    response.status(500).json(error);
  });
});

module.exports = router;
