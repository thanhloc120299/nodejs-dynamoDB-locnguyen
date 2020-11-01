const AWS = require('aws-sdk');
const config = require('./config');
const uuidv1 = require('uuid/v1');


const getBaiBao = function (req, res) {
    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name
    };
    
    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.send({
                students: Items
            });
        }
    });
}
const xoabao = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: config.aws_table_name,
        Key: {
            id: req.params.id
        }
    };
    docClient.delete(params, function(err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else {
            res.send({
                success: true,
                message: 'Xoa',
                movie: data
            });
        }
    } )
}
const addBaiBao = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
    Item.id = uuidv1();
    var params = {
        TableName: config.aws_table_name,
        Item: Item
    };
    console.log(req.body)
    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else {
            res.send({
                success: true,
                message: 'Add',
                movie: data
            });
        }
    });
}
module.exports = {
  getBaiBao,
  addBaiBao,
  xoabao
}
