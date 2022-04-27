let response;

/**Load ASS SDK */

const AWS = require("aws-sdk");

/*Update AWS Region to Deploy*/

AWS.config.update({ region: "us-east-1" });

/**Import DynamoDn Using AWS SDK */
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**Lambda Handler Function For Create Program */

exports.createEmployee = async (event, context, callback) => {

    /**For Getting Date & Time */

    const datetime = new Date().toISOString();

    /**To Convert string into Object */

    const {  employeeId,employeeName,employeeAge } = JSON.parse(event.body);

    /**Call the DynamoDb and use Put to add the Data to the Table */

    await dynamodb

        .put({

            TableName: "employee",

            Item: {

                employeeId,

                employeeName,

                employeeAge,

                createdAt: datetime,

                updatedAt: datetime

            },

        }).promise();

    response = {

        statusCode: 200,

        body: JSON.stringify({

            message: `Employee Created Successfully`,

        }),

    };

    callback(null, response);

};