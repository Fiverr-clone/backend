const Category = require('../models/category');

exports.createCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const category = new Category({
      categoryName,
    });

    await category.save();

    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to create category',
      error: error.message,
    });
  }
};


// Get all categories
exports.getAllCategories = (req, res) => {
  Category.find()
    .then((categories) => {
      res.status(200).json(categories);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message
      });
    });
};
exports.onlineCourses = (req, res) => {
  res.redirect('/online-courses');
};
exports.digitalMarketing = (req, res) => {
  res.redirect('/digital-marketing');
};
exports.writingTranslation = (req, res) => {
  res.redirect('/writing-translation');
};
exports.design = (req, res) => {
  res.redirect('/design');
};
exports.programmingDevelopment = (req, res) => {
  res.redirect('/programming-development');
};


// Get a single category by ID
exports.getCategoryById = (req, res) => {
  Category.findById(req.params.categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({
          message: 'Category not found'
        });
      }
      res.status(200).json(category);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message
      });
    });
};