const helper = (Model) => ({
  // Get list of items matching params.query from Collection
  find: (params) =>
    new Promise((resolve, reject) => {
      Model.find(params.query)
        .select(params.select)
        // .sort({s_username: 1})
        .sort(params.sort)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    }),

  // Get a single item matching params.query form Collection
  findOne: (params) =>
    new Promise((resolve, reject) => {
      Model.findOne(params.query)
        .select(params.select)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    }),

  // Create a new item in Collection
  create: (params) =>
    new Promise((resolve, reject) =>
      Model.create(params.data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    ),

  // Insert list of items into the Collection
  insert: (params) =>
    new Promise((resolve, reject) =>
      Model.insert(params.data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    ),

  // Remove single item matching params.query from collection
  deleteOne: (params) =>
    new Promise((resolve, reject) =>
      Model.deleteOne(params.query)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    ),

  // Remove multiple items matching params.query from collection
  deleteMany: (params) =>
    new Promise((resolve, reject) =>
      Model.deleteMany(params.query)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    ),

  // Update single item in collection
  update: (params) =>
    new Promise((resolve, reject) =>
      Model.updateOne(params.query, params.data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    ),

  // Update multiple items in collection
  updateMany: (params) =>
    new Promise((resolve, reject) =>
      Model.updateMany(params.query, params.data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    ),

  // Update single item if it exists otherwise create new item in collection
  upsert: (params) =>
    new Promise((resolve, reject) =>
      Model.update(params.query, params.data, {upsert: true, multi: false})
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    ),

  // Update multiple items if they exist otherwise create new item in collection
  upsertMultiple: (params) =>
    new Promise((resolve, reject) =>
      Model.update(params.query, params.data, {upsert: true, multi: true})
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    ),
});

export default helper;
