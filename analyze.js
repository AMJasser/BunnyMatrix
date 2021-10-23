var dummyData = [
    {
        x: new Date("01/01/2012"),
        y: 2004.52,
    },
    {
        x: new Date("02/01/2012"),
        y: 2499.5255,
    },
];

/*dummyData.forEach(function (set) {
    set.x = new Date(set.x).getTime();
});*/

console.log(dummyData);

const data = {
    datasets: [
        {
            label: "Scatter Dataset",
            data: dummyData,
            backgroundColor: "rgb(255, 99, 132)",
        },
    ],
};

const config = {
    type: "scatter",
    data: data,
    options: {
        responsive: true,
        scales: {
            /*xAxes: [
                {
                    ticks: {
                        callback: function (value, index, values) {
                            return "$";
                        },
                    },
                },
            ],*/
            x: {
                ticks: {
                    callback: (value, index, values) => {
                        return new Date(value);
                    },
                },
            },
        },
    },
};

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content)], {
        type: contentType,
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
//download(dummyData, "json.txt", "text/plain");

window.onload = function () {
    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, config);
};