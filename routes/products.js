var express = require('express');
var router = express.Router();

let data = [
  {
    "id": 3,
    "title": "Classic Heather Gray Hoodie",
    "slug": "classic-heather-gray-hoodie",
    "price": 69,
    "description": "Stay cozy and stylish with our Classic Heather Gray Hoodie.",
    "category": { "id": 1, "name": "Clothes", "slug": "clothes" },
    "images": ["https://i.imgur.com/cHddUCu.jpeg"]
  },
  {
    "id": 6,
    "title": "Classic Comfort Fit Joggers",
    "slug": "classic-comfort-fit-joggers",
    "price": 25,
    "description": "Discover the perfect blend of style and comfort with our Classic Comfort Fit Joggers.",
    "category": { "id": 1, "name": "Clothes", "slug": "clothes" },
    "images": ["https://i.imgur.com/ZKGofuB.jpeg"]
  },
  {
    "id": 7,
    "title": "Classic Comfort Drawstring Joggers",
    "slug": "classic-comfort-drawstring-joggers",
    "price": 79,
    "description": "Experience the perfect blend of comfort and style with our Classic Comfort Drawstring Joggers.",
    "category": { "id": 1, "name": "Clothes", "slug": "clothes" },
    "images": ["https://i.imgur.com/axsyGpD.jpeg"]
  }
];

/* GET products listing với filter */
router.get('/', function(req, res, next) {
  let { title, maxPrice, minPrice, slug } = req.query;
  
  let result = data;
  
  // Filter theo title (includes)
  if (title) {
    result = result.filter(p => p.title.toLowerCase().includes(title.toLowerCase()));
  }
  
  // Filter theo maxPrice
  if (maxPrice) {
    result = result.filter(p => p.price <= parseFloat(maxPrice));
  }
  
  // Filter theo minPrice
  if (minPrice) {
    result = result.filter(p => p.price >= parseFloat(minPrice));
  }
  
  // Filter theo slug (equal)
  if (slug) {
    result = result.filter(p => p.slug === slug);
  }
  
  res.json({
    success: true,
    data: result,
    total: result.length
  });
});

/* GET product by id */
router.get('/:id', function(req, res, next) {
  let productId = parseInt(req.params.id);
  let product = data.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

module.exports = router;
