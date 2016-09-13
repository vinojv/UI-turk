import * as _ from "lodash";
const initialState = {
  visibilityFilter: "SHOW_ALL",
  todos: []
}

const normaliseForTable (data) {

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

    },{ }).value();
  
  }

}

const normalise = function(data) {
  if (!data) return;
  let result;
  try{
    result = JSON.parse(data);
  } catch (exception){
    
    alert("There is some issue in the data you have provided")
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
export default function reducer (state = initialState, action={}) {

  switch (action.type) {
    case "PUSH":
      return [
        ...state,
        action.data
      ]

    default:
      return state
  }
};