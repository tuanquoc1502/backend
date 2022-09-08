const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:aaaa1234@banhang.orb9s.mongodb.net/data?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect database success!!!')
    } catch (error) {
        console.log('Connect database failed' + error.message);
    }
}

module.exports = { connect };