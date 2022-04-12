const Base = require('./base');

class Users extends Base {
  constructor() {
    super('users');
  }

  findUser(ip) {
    return this.collection.findOne({
      ip
    });
  };

  async updateBalance(ip, payAmount) {
    const existingUser = await this.findUser(ip);
    if (existingUser) {
      const balance = await this.collection.findOneAndUpdate({
        ip
      }, {
        $inc: {
          balance: payAmount
        }
      });
      console.log(`User ${ip} balance updated by ${payAmount}.`);
      return balance;
    }
  }

  async registerUser(ip) {
    const existingUser = await this.findUser(ip);
    if (!existingUser) {
      await this.collection.insertOne({
        ip,
        balance: 0
      });
      console.log(`User ${ip} registered.`);
    }
  }
}

module.exports = Users;