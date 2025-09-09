import isMongooseModel from "./helpers/isMongooseModel.js";

export default async function getDocument(model, filter) {
  
  /// Type checks

  if (typeof filter !== "object" || filter === null) {
    throw {
      error:
        "getDocument(model, filter): call does not have valid type for filter parameter",
      result: null,
    };
  }

  if (isMongooseModel(model)) {
    throw {
      error:
        "getDocument(model, filter): call does not have valid type for filter parameter",
      result: null,
    };
  }

  return await model.find(filter).select(); // return selection
}
