import isMongooseModel from "./helpers/isMongooseModel.js";

export default async function getDocument(model, filter) {
  /// Type checks

  if (typeof filter !== "object" || filter === null) {
    throw "getDocument(model, filter): call does not have valid type for filter parameter";
  }

  if (!isMongooseModel(model)) {
    throw "getDocument(model, filter): call does not have valid model parameter";
  }

  return await model.find(filter).select().result; // return selection
}
