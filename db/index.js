const MongoClient = require('mongodb').MongoClient;

class DB {
  constructor() {
    this.db = null;
    this.client = null;
  }

  async connect() {
    const client = await MongoClient.connect(process.env.MONGO_URL, {
      keepAlive: true,
    });
    this.client = client;
    this.db = client.db(process.env.DATABASE_NAME);
    return this;
  };

  get() {
    if (this.db) {
      return this.db;
    }
    throw new Error('No database connection...');
  }
}

module.exports = new DB();