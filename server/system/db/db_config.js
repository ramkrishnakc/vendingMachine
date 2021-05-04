import config from '../../config';

const {schemaDirectory, dbName} = config.app;
const mongohost = process.env.MONGO_HOSTNAME || 'localhost';

export default {
  mongodb: {
    url: `mongodb://${mongohost}:27017/${dbName}`,
    config: {autoIndex: false},
  },
  db: [
    {
      name: dbName,
      url: `mongodb://${mongohost}:27017/${dbName}`,
      schemaDirectory,
      options: {
        useNewUrlParser: true, // when true port must be specified in url
        useUnifiedTopology: true, // default: false, enable mongodb's connection management engine
        useCreateIndex: true, // default: false,
        useFindAndModify: false, // default: true, 'false' to make findOneAndUpdate() & findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
        autoIndex: true, // build indexes
        poolSize: 10, // default: 5, Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // default: 30000, Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
      },
    },
  ],
};
