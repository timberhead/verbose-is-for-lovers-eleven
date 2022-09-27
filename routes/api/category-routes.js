



const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (request, response) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
  })

    .then(dbCategoryData => response.json(dbCategoryData))
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
});


router.get('/:id', (request, response) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: request.params.id
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
  })

    .then(dbCategoryData => {
      if (!dbCategoryData) {
        response.status(404).json({ message: "Sorry, no category found with this id" });
        return;
      }
      response.json(dbCategoryData);
    })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
});


router.post('/', (request, response) => {
  // create a new category
  Category.create({
    category_name: request.body.category_name
  })

    .then(dbCategoryData => response.json(dbCategoryData))
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
});

router.put('/:id', (request, response) => {
  // update a category by its `id` value
  Category.update(request.body, {
    where: {
      id: request.params.id
    }
  })

  .then(dbCategoryData => {
    if (!dbCategoryData[0]) {
      response.status(404).json({ message: "Sorry, no category found with this id" });
      return;
    }
    response.json(dbCategoryData);
  })
  .catch(error => {
    console.log(error);
    response.status(500).json(error);
  });
});
 

router.delete('/:id', (request, response) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: request.params.id
    }
  })

  .then(dbCategoryData => {
    if (!dbCategoryData) {
      response.status(404).json({ message: "Sorry, no category found with this id" });
      return;
    }
    response.json(dbCategoryData);
  })
    .catch(error => {
      console.log(error);
      response.status(500).json(error);
    });
});


module.exports = router;
