

export default function isMongooseModel(obj){
  return (
    typeof obj === "function" &&
    typeof obj.find === "function" &&
    typeof obj.modelName === "string"
  );
}