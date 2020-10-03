const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
         await mongoose.connect(
            process.env.DB_CNN, 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );

        console.log('DB up and running');


    } catch (error) {
        console.log(error);
        throw new Error('Error en conexión de BD');
    }
}

module.exports = {
    dbConnection
}