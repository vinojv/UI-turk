import * as _ from "lodash";

const initialState = [ ]

const normaliseForTable = function (data) {

  let group = _.groupBy(temp, function(value, key){
    return Array.isArray(value)
  })

  if (group[true] === 2) {
    
    return _(group[true]).map(function (item){
      if (typeof item[0] == 'string')
       return { headers: item}

      if (Array.isArray(item[0]))
       return { body: item}

    }).reduce(function(acc, item=[]){
     return {...acc, ...item}

    }, { }).value();
  
  }

}

const normalise = function(data) {
  if (!data) return;
  let result;
  try{
    result = JSON.parse(data);
  } catch (exception){
    
    alert("There is some issue in the data you have provided")
    return;
    // return {
    //   type: "text",
    //   content: data
    // }
  }

  if (Array.isArray(data)){
    if (typeof data[0] === 'string')
      return {
        type: "list",
        data
     }
    if (typeof data[0] === 'number')
     return {
      type: "graph",
      data
     }
  }


  let normalised = normaliseForTable(data);


  if (normalised && normalised.body){
    return {
      type: "table",
      data: normalised
    }
  }

}

function main () {
    return _.map(data, function (value, key) {
        return { type: key, data: value }
    })
}
export default function reducer (state = initialState, action={}) {

  switch (action.type) {
    case "PUSH":
      var data = normalise(action.data);
      if (!data) return state;
      
      return [
        ...state,
        data
      ]

    default:
      return state
  }
};