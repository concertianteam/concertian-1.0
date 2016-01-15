function initCalendar() {
    $.ajax({
        'url': 'https://api.concertian.com/agents/events',
        'method': 'GET',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", apiKey);
            request.withCredentials = true;
        },
        contentType: "application/x-www-form-urlencoded",
        success: function (json) {
            renderCalendar(json);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function renderCalendar(json){
    var eventsArr = [];
    json.events.forEach(function(data){
        var event = {};
        event.title = data.name;
        event.start = data.date + 'T' + data.time;
        event.status = data.status;
        event.visible = data.visible;
        eventsArr.push(event);
    });
    //idEvents, name, date, time, status, visible
    $('#myCalendar').fullCalendar({
        lang: 'sk',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: '2016-01-12',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: eventsArr
    });
}