import * as _ from "lodash";
import * as utils from "../utils/utils";

const convertToJson = function (stream){
    try {
        console.log(stream)
        var data = JSON.parse(stream);
        if (Array.isArray(data))
            return data;
        else return [ data ];
    }catch (e){
        console.log(e)
        alert("something is wrong with given data")
    }
}

export default function reducer (state = [], action={}) {

    switch (action.type) {
        case "PUSH":
            console.log(action)
            let parsedData = convertToJson(action.data)
            if (!parsedData) return state;


            let data = _.map(parsedData, function (value2, index) {
                return _.map(value2, function(value, key){

                    let normalisefunc;
                    try{
                        normalisefunc = utils["normalise" + _.startCase(key)]
                    }catch (e){
                        normalisefunc = undefined;
                    }
                    if (normalisefunc) return normalisefunc(value)

                    return utils.genericNormaliser(value)
                })
            })
            if (!data) return state;
            return _.flatten([
                ...state,
                ...data
            ])

        default:
            return state
    }
};