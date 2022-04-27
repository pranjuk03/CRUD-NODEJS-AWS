let response;
/**Load ASS SDK */
const AWS = require('aws-sdk');
/*Update AWS Region to Deploy*/
AWS.config.update({region:'us-east-1'});
/**Import DynamoDn Using AWS SDK */
const dynamodb = new AWS.DynamoDB.DocumentClient();
/**Lambda Handler Function For Get All Program */
exports.getAllEmployee = async (event, context, callback) => {
   /**Call the DynamoDb and use scan to get all the Data from the Table */
  const data = await dynamodb.scan({
      TableName: "employee",
    }).promise();

  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: data.Items,
    }),
  };

  callback(null,response);
};