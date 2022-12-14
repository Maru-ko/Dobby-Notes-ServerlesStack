import * as uuid from "uuid";
import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
// import * as uuid from "uuid";
// import AWS from "aws-sdk";

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// export async function main(event) {
//   // Request body is passed in as a JSON encoded string in 'event.body'
//   const data = JSON.parse(event.body);

//   const params = {
//     TableName: process.env.TABLE_NAME,
//     Item: {
//       // The attributes of the item to be created
//       userId: event.requestContext.authorizer.iam.cognitoIdentity.indetityId, // The id of the author
//       noteId: uuid.v1(), // A unique uuid
//       content: data.content, // Parsed from request body
//       attachment: data.attachment, // Parsed from request body
//       createdAt: Date.now(), // Current Unix timestamp
//     },
//   };

//   try {
//     await dynamoDb.put(params).promise();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(params.Item),
//     };
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: e.message }),
//     };
//   }
// }

// import * as uuid from "uuid";
// import handler from "../util/handler";// must be imported b4 anything else
// import dynamoDB from "../util/dynamodb";

// // import AWS from "aws-sdk";
// // const dynamoDb = new AWS.DynamoDB.DocumentClient();
// const main = handler(async (event) => {
//   // Request body is passed in as a JSON encoded string in 'event.body'
//   const data = JSON.parse(event.body);
//   const params = {
//     TableName: process.env.TABLE_NAME,
//     Item: {
//       userId: "123",
//       noteId: uuid.v1(),
//       content: data.content,
//       attachment: data.attachment,
//       createdAt: Date.now(),
//     },
//   }
//     await dynamoDB.put(params);

//   return params.Item;
//   // const params = {
//   //   TableName: process.env.TABLE_NAME,
//   //   Item: {
//   //     // The attributes of the item to be created
//   //     userId: "123", // The id of the author
//   //     noteId: uuid.v1(), // A unique uuid
//   //     content: data.content, // Parsed from request body
//   //     attachment: data.attachment, // Parsed from request body
//   //     createdAt: Date.now(), // Current Unix timestamp
//   //   },
//   // };

//   // try {
//   //   await dynamoDb.put(params).promise();

//   //   return {
//   //     statusCode: 200,
//   //     body: JSON.stringify(params.Item),
//   //   };
//   // } catch (e) {
//   //   return {
//   //     statusCode: 500,
//   //     body: JSON.stringify({ error: e.message }),
//   //   };
//   // }
// });