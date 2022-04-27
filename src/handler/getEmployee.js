/**Load ASS SDK */
const AWS = require('aws-sdk');
/*Update AWS Region to Deploy*/
AWS.config.update({region:'us-east-1'});
/**Import DynamoDn Using AWS SDK */
const dynamodb = new AWS.DynamoDB.DocumentClient();
/*Lambda Handler Function For Get Program By Id*/
module.exports.getEmployee = (event, context, callback) => {
  const params = {
    TableName: "employee",
    Key: {
        employeeId: event.pathParameters.employeeId,
    },
  };
  /**Call the DynamoDb and use get to get  the Data By Id from the Table */
  dynamodb.get(params, (error, data) => {
    if (error) {
      console.error(error);
      callback(new Error(error));
      return;
    }

    const response = data.Item
      ? {
          statusCode: 200,
          body: JSON.stringify(data.Item),
        }
      : {
          statusCode: 404,
          body: JSON.stringify({ message: "Employee Not Found" }),
        };

    callback(null, response);
  });
};