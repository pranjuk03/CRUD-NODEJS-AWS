/**Load ASS SDK */
const AWS = require('aws-sdk');
/*Update AWS Region to Deploy*/
AWS.config.update({region:'us-east-1'});
/**Import DynamoDn Using AWS SDK */
const dynamodb = new AWS.DynamoDB.DocumentClient();
/**Lambda Handler Function For Delete Program */
module.exports.deleteEmployee = async (event, context, callback) => {
    console.log(event);
    console.log(context);
    console.log(callback);
   /**Call the DynamoDb and use delete to delete the Data from the Table */
   await dynamodb.delete({
        TableName: "employee",
        Key : {
            employeeId : event.pathParameters.employeeId,
        }
    }).promise()
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: `Employee Deletion Successfull`,
        })
    }
    callback(null, response);
}