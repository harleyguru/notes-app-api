var uuid = require('uuid');
var dynamoDbLib = require('./libs/dynamodb-lib');
var success = require('./libs/response-lib').success;
var failure = require('./libs/response-lib').failure;

exports.main = function (event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "notes",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime()
    }
  };

  dynamoDbLib.call("put", params).then((result) => {
    callback(null, success(params.Item));
  }).catch((error) => {
    callback(null, failure({ status: false }));
  });
};
