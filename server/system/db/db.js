import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

import Utils from '../../../common';

require('../global');

export default class Db {
  constructor(args) {
    this.args = args;
    this.connection = null;
    this.schemas = null;
  }

  static fileNameToModelName(filename) {
    return Utils.capitalizeFirstLetter(filename.split('.')[0]);
  }

  connect() {
    return new Promise(async (resolve, reject) => {
      try {
        this.connection = await mongoose.connect(
          this.args.url,
          this.args.options
        );
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }

  loadSchema() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.args.schemaDirectory, (err, files) => {
        if (err) {
          return reject(err);
        }

        const listOfSchema = files.map((file) => {
          const modelName = Db.fileNameToModelName(file);
          const mName = modelName.toLowerCase();
          return {
            modelName,
            model: this.connection.model(
              modelName,
              new mongoose.Schema(
                // eslint-disable-next-line global-require, import/no-dynamic-require
                require(path.join(this.args.schemaDirectory, mName)).default
              ),
              mName
            ),
          };
        });
        this.schemas = listOfSchema || [];
        return resolve();
      });
    });
  }
}
