import moment from "moment";

//convert MySQL DateTime to a date object and then to a formated date string 'MMM Do YYYY, h:mm:ss a'
const datetimeConversion = (datetime)=>{
    //datetime: 2020-09-08T23:52:18.000Z

    // Split timestamp into [ Y, M, D, h, m, s ]
    //2020-09-08 23:52:18
    const reformated = datetime.slice(0,10) + " " + datetime.slice(11,19);

    //2020,09,08,23,52,18
    const splited = reformated.split(/[- :]/);

    //construct a date object
    const date = new Date(Date.UTC(splited[0], splited[1]-1, splited[2], splited[3], splited[4], splited[5]));

    //reformat using moment.js
    const result = moment(date).format('MMM Do YYYY, h:mm:ss a');
    
    return result;
}

export default datetimeConversion;