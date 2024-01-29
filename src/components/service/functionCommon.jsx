import moment from "moment";

// function to change date from server to moment client
export function fixDate(date){
    if(date != undefined)
    {   
        if(date[3] == undefined)
            return moment([date[0], date[1] - 1, date[2]]);
        else return moment([date[0], date[1] - 1, date[2], date[3], date[4], date[5]]);
    }
    return moment(date);
}