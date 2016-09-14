import * as _ from "lodash";
import {normaliseTable, normaliseList, normaliseGraph, genericNormaliser} from "../utils/utils";

convertToJson = function (stream){
    try {
        var data = JSON.parse(stream);
        if (Array.isArray(data))
            return data;
        else [ data ];
    }catch (e){
        alert("something is wrong with given data")
    }
}

export default function reducer (state = [], action={}) {

    switch (action.type) {
        case "PUSH":
            let parsedData = convertToJson(action.data)
            if (!parsedData) return state;

            let data = _.map(data, function (value, key) {
                let normalisefunc;
                try{
                    normalisefunc = eval (normalise + key)
                }catch (e){
                    normalisefunc = undefined;
                }

                if (normalisefunc) return normalisefunc(value)
                return genericNormaliser(value)
            })

            return [
                ...state,
                ...data
            ]

        default:
            return state
    }
};