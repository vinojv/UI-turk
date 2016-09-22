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
            title: input[title],
            values: input[values]
        }
    }
};

const normaliseGraph = function (input) {

    var minmax = (array) => {
        return array.reduce((op,a)=>{
          op.minValue = op.minValue < a ? op.minValue : a;
          op.maxValue = op.maxValue > a ? op.maxValue : a;
          return op;
        },{minValue: Infinity, maxValue: -Infinity});
    }
    let data = {
        rows: [],
        columns: [],
        options:  {
          hAxis: {minValue: Infinity, maxValue:-Infinity},
          vAxis: {minValue: Infinity, maxValue:-Infinity}
        }
    }

    data.rows = input.map((plot) => {  
      return Object.keys(plot).map(key => plot[key]);  
    });
    console.log(data.rows);

    data.columns = Object.keys(input[0]).map(plot => {
      var p ={};
      p.label = plot;
      p.type = typeof(input[0][plot]);
      return p;
    });

    console.log(data.columns);   

    var values = data.columns.map(c => {
       return arr.map(a => a[c.label])
    });
      
    data.options.hAxis = minmax(values[0]);
    data.options.vAxis = minmax(values[1]);
      
    
    return {
        id: _.uniqueId(),
        type: "graph",
        data: data
    }
};

const normaliseTable = function(input) {
    var getBody = function (values = [], headers = []){
        return _.map(values, value=>{
            return _.map(headers, header => value[header])
        })
    }
    var getHeaders = function (value = { }) {
        return _.keys(value)
    }

    var generateHeadandBody = function (value){
        if (!data.data.headers)
            data.data.headers = getHeaders(value[0]);
        console.log("data.data.headers", data.data.headers, "value", value)
        data.data.values = getBody(value, data.data.headers)
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
            else generateHeadandBody(input.body);

        } else {
            generateHeadandBody(input.body)
        }
    }

    if (data.data.body && data.data.headers) return data;


    let singleDimensionArray = _.findKey(input, (val, key)=>(Array.isArray(val) && !Array.isArray(val[0])) );
    if (input[singleDimensionArray]) {
        if (typeof input[singleDimensionArray][0] == 'object'){
            generateHeadandBody(input[singleDimensionArray])
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

    let findstring = _.findKey(input, obj=>typeof obj == 'string');
    let singleDimArray = _.findKey(input, obj=>Array.isArray(obj) && !Array.isArray(obj[0]));
    let twoDimArray = _.findKey(input, obj=>Array.isArray(obj) && !Array.isArray(obj[0]));

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
