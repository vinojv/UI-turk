/**
 * Created by vinojv on 15/09/16.
 */
import _ from 'lodash';

const normaliseList = function (input) {
    if (Array.isArray(input))
        return {
            id: _.uniqueId(),
            type: "list",
            data: {
                values: input
            }
        }
    let title = _.findKey(input, item => typeof item == 'string')
    let values = _.findKey(input, item => Array.isArray(item))


    return {
        type: "list",
        id: _.uniqueId(),
        data: {
            title,
            values
        }
    }
};

const normaliseGraph = function (input) {

    return {
        id: _.uniqueId(),
        type: "graph",
        data: input
    }
};

const normaliseTable = function(input) {
    var getBody = function (values = [], headers = []){
        return _.map(values, value=>{
            return _.map(headers, header => value[header])
        })
    }
    var getHeaders = function (value = {}) {
        return Object.keys(value)
    }

    var generateHeadandBody = function (value){
        data.headers = getHeaders(value[0])
        data.values = getBody(value, data.headers)
    }

    let data = {
        id: _.uniqueId(),
        type: "table",
        data: {
            headers: undefined,
            values: undefined
        }
    }

    if (Array.isArray(input)){
        /* When receiving a list of objects
         table: [ {header: value, haedr2: value} ]

         */
        generateHeadandBody(input);
        return data;
    }

    if (_.has(input, 'headers'))
        data.data.headers = input.headers;

    if (_.has(input, 'body')) {
        if (input.body && input.body[0] && Array.isArray(input.body[0])){
            if (typeof input.body[0][0] == 'string') data.data.values = input.body;
            else if (data.data.headers) data.data.values = getBody(input.body, data.data.headers); // if input.body = [{ }]
            else {
                generateHeadandBody(input);
            }
        }
    }

    if (input.body && input.header) return data


    let singleDimensionArray = _.findKey(input, (val, key)=>(Array.isArray(val) && !Array.isArray(val[0])) );
    if (input[singleDimensionArray]) {
        if (typeof input[singleDimensionArray][0] == 'object'){
            generateHeadandBody(input[singleDimensionArray][0])
        }
        else data.data.headers = input[singleDimensionArray]
    }

    let twoDimensionArray = _.findKey(input, (val, key)=>(Array.isArray(val) && Array.isArray(val[0]) ));

    if (input[twoDimensionArray]) data.data.values = input[twoDimensionArray];

    return data;


};

const genericNormaliser = function (input) {
    if (!input) return;

    if (Array.isArray(input)){
        if (typeof input[0] == 'string') return normaliseList(input);
    }

    let findstring = _.findKey(input, typeof input == 'string');
    let singleDimArray = _.findKey(input, Array.isArray(input) && !Array.isArray(input[0]));
    let twoDimArray = _.findKey(input, Array.isArray(input) && !Array.isArray(input[0]));

    if (twoDimArray) return normaliseTable(input);
    if (singleDimArray && typeof singleDimArray[0] !== 'string') return normaliseTable(input);
    if (singleDimArray && typeof singleDimArray[0] === 'string') return normaliseList(input);


    return {
        id: _.uniqueId(),
        type: "",
        data: input
    }
};

export { normaliseTable, normaliseList, normaliseGraph, genericNormaliser };