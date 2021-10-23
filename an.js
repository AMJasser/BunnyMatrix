var csvParsed;

// data processing to make referecing values in dataset easier
function dataPreprocessor(row) {
    // function to convert string to date
    //var parseTime = d3.timeParse("%B %d, %Y");
    //parseTime("June 30, 2015"); // Tue Jun 30 2015 00:00:00 GMT-0700 (PDT)
    
    //Citation: https://github.com/d3/d3-time-format
    
    var parseDate = d3.timeParse("%m/%d/%Y");

    return {
        date: parseDate(row["Date"]),
        weekly_sales: +row["Weekly_Sales"],
        isHoliday: row["IsHoliday"],
    };
}
d3.csv("./datasets/walmart/full_walmart_2010-2013.csv", dataPreprocessor).then(function (
    dataset
) {
    csvParsed = dataset;
    run();
});

function run() {
    console.log("Hello");
}