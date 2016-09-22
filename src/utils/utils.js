/**
 * Created by vinojv on 15/09/16.
 */
const normaliseList = function (input) {
    if (Array.isArray(input))
        return {
            type: "list",
            list: input
        }
    let heading = _.findKey(input, item => typeof item == 'string')
    let list = _.findKey(input, item => Array.isArray(item))


    return {
        type: "list",
        heading,
        list
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
        };
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
    var getHeaders = function (value = {}) {
        return Object.keys(value)
    }

    var generateHeadandBody = function (value){
        data.headers = getHeaders(value[0])
        data.values = getBody(value, data.headers)
    }

    let data = {
        type: "table",
        headers: undefined,
        values: undefined
    }

    if (Array.isArray(input)){
        /* When receiving a list of objects
         table: [ {header: value, haedr2: value} ]

         */
        generateHeadandBody(input);
        return data;
    }

    if (_.has(input, 'headers'))
        data.headers = input.headers;

    if (_.has(input, 'body')) {
        if (input.body && input.body[0] && Array.isArray(input.body[0])){
            if (typeof input.body[0][0] == 'string') data.values = input.body;
            else if (data.headers) data.values = getBody(input.body, data.headers); // if input.body = [{ }]
            else {
                generateHeadandBody(input);
            }
        }
    }
    if (input.body && input.header) return data


    let singleDimensionArray = _.findKey(input, (val, key)=>(Array.isArray(value) && !Array.isArray(value[0])) );
    if (input[singleDimensionArray]) {
        if (typeof input[singleDimensionArray][0] == 'object'){
            generateHeadandBody(input[singleDimensionArray][0])
        }
        else data.headers = input[singleDimensionArray]
    }

    let twoDimensionArray = _.findKey(input, (val, key)=>(Array.isArray(value) && Array.isArray(value[0]) ));

    if (input[twoDimensionArray]) data.values = input[twoDimensionArray];

    return data;


};

const genericNormaliser = function (input) {
    if (!input) return {};

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
        type: "",
        data
    }
};

export default { normaliseTable, normaliseList, normaliseGraph, genericNormaliser };