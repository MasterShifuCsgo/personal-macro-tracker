import isMongooseModel from "./helpers/isMongooseModel.js";

/**
 * 
 * @param {Mongoose Model} model - mongoose model to search
 * @param {Object} filter - filter mongoose uses to find the document
 * @param {Object} contents - (optional) what to receive from the document
 * @returns found list of data matching the filter
 * @throws when function is used wrong.
 */
export default async function getDocument(model, filter, contents = {}) {
  
  // Type checks
  if (typeof filter !== 'object' || filter === null) {
    throw new Error('getDocument(model, filter, contents): invalid type for filter parameter');
  }

  if (!isMongooseModel(model)) {
    throw new Error('getDocument(model, filter, contents): invalid model parameter');
  }

  if(typeof contents != "object" || Array.isArray(contents)){
    throw new Error("getDocument(model, filter, contents): invalid contents parameter")
  }
  ///


  return await model.find(filter).select(contents); // returns list because using .find()
}
