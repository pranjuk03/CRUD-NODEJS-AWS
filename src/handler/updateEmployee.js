/**Load ASS SDK */
const AWS = require('aws-sdk');
/*Update AWS Region to Deploy*/
AWS.config.update({region:'us-east-1'});
/**Import DynamoDn Using AWS SDK */
const dynamodb = new AWS.DynamoDB.DocumentClient();
/*Lambda Handler Function For Update By Id*/
module.exports.updateEmployee = (event, context, callback) => {
   /**For Getting Date & Time */
  const datetime = new Date().toISOString();
  /**To Convert string into Object */
  let data = JSON.parse(event.body);
  
  const params = {
    TableName: "employee",
    Key: {
      employeeId: event.pathParameters.employeeId,
    },
    ExpressionAttributeValues: {
      ":en": data.employeeName,
      ":ea": data.employeeAge,
      ":t": datetime
    },
    UpdateExpression: "set employeeName = :en, employeeAge = :ea, updatedAt = :t",
  };
  
  /**Call the DynamoDb and use update to Update the Data in the Table */
  dynamodb.update(params, (error, data) => {
    if (error) {
      console.error(error);
      callback(new Error(error));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };

    callback(null, response);
  });
};