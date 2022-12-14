import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();
// this is a conveniense object that exposes the DynamoDB client methods
export default {
  get: (params) => client.get(params).promise(),
  put: (params) => client.put(params).promise(),
  query: (params) => client.query(params).promise(),
  update: (params) => client.update(params).promise(),
  delete: (params) => client.delete(params).promise(),
}