const Database = require('../index');

class Base {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.db = Database.get();
  }

  updateOne(id, updates) {
    return this.collection.updateOne(
      { _id: id },
      { $set: updates }
    )
  };

  get collection() {
    if (this.db) {
      return this.db.collection(this.collectionName);
    } 
    throw new Error('No database connection in Base:collection');
  };
};

module.exports = Base;