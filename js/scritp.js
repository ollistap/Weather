$(document).ready(function () {
    $.getJSON('city.list.json', function (data) {
        $('select').on('change', function () {
            var out = '';
            for (var key in data) {
                if (data[key].country == $('select option:selected').val()) {
                    out += `<input value="${data[key].name}">${data[key].name}</input>`;
                }
            }
            $('#city').html(out);
                $('#city').on('input', function () {
                    $.get(
                        "http://api.openweathermap.org/data/2.5/weather",
                        {
                            "q": $(this).prop('value'),
                            "appid": "e70c4582b3055105ef0525d7adf3ed50"
                        },
                        function (data) {
                            let out = '';
                            out += `Погода: <b>` + data.weather[0].main + `</b>`;
                            out += `<b style="text-align: center"><img src="https://openweathermap.org/img/w/` + data.weather[0].icon + `.png"></b></br>`;
                            out += `Температура: <b>` + Math.round(data.main.temp - 273) + `&#176;C</b><br>`;
                            out += `Мінімальна температура: <b>` + Math.round(data.main.temp_min - 283.164) + `&#176;C</b><br>`;
                            out += `Волога: <b>` + data.main.humidity + `%</b><br>`;
                            out += `Тиск: <b>` + Math.round(data.main.pressure * 0.00750063755419211 * 100) + ` мм.рт.ст</b><br>`;
                            out += `Швидкість вітру: <b>` + Math.round(data.wind.speed) + ` метр/сек</b><br>`;
                            console.log(data.main);
                            $('#weather').html(out);
                        }
                    );
                });
            })
    });
});

var options = {
    url: "city.list.json",

    getValue: "name",

    list: {
        match: {
            enabled: true,
        }
    }
};

$("#city").easyAutocomplete(options);