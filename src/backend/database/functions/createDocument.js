import isMongooseModel from "./helpers/isMongooseModel.js";

/*
 * @param {MongooseModel} model - Mongoose model to create document in
 * @param {Object} data - Data to create document with. Data must have at least 1 field to be created.
 * @returns {Object} - Created document
 * @throws {Object} - returns error string if there was an error creating the document
 */
export default async function createDocument(model, data) {
  if (!isMongooseModel(model)) {
    throw "createDocument(model, data): call does not have valid type for model parameter";
  }

  //check if foods is an array and has at least one element
  if (typeof data !== "object") {
    throw "createDocument(model, data): call does not have valid type for data parameter";
  }

  //create day document
  const day = await model.create(data).catch((err) => {
    throw "createDocument(model, data): error creating document: " + err;
  });

  return day;
}
