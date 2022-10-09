export default function handler(lambda) {
  return async function (event, context) {
    let body, statusCode;
    try {
      //this runs the lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e) {
      console.error(e);
      body = { error: e.message };
      statusCode = 500;
    }
    // This return the HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
    };
  };
}