// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)


Category.hasMany(Product, {
  onDelete: 'SET NULL',
  foreignKey: {
  name:'category_id',
  allowNull: true
}});
Product.belongsTo(Category);

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    as: 'Products'
  }
  // Define an alias for when data is retrieved
  
});

Product.belongsToMany(Tag, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    as: 'Tags'
  },
  // Define an alias for when data is retrieved

});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};