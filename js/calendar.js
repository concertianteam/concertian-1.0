function initCalendar(calendarLanguage) {
    $.ajax({
        'url': 'https://api.concertian.com/agents/events',
        'method': 'GET',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", apiKey);
            request.withCredentials = true;
        },
        contentType: "application/x-www-form-urlencoded",
        success: function (json) {
            renderCalendar(json, calendarLanguage);
        },
        error: function (error) {
            renderCalendar(false, calendarLanguage);
        }
    });

    $("#contentPanel #createConcertForm").load("concertForm.html", null, function() {
        $("#date").datepicker($.datepicker.regional[ calendarLanguage ], {dateFormat: "yy-mm-dd"});
        $("#time").timepicker();

        $('#deleteEvent').on('click', function(){
            $.ajax({
                url: 'https://api.concertian.com/agents/events/' + $("#idEvent").val(),
                method: 'DELETE',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", apiKey);
                    request.withCredentials = true;
                },
                contentType: "application/x-www-form-urlencoded",
                success: function (json) {
                    alert('zmazane');
                    $("#mycalendar").trigger( "click" );
                },
                error: function (error) {
                    alert('chyba');
                }
            });
        });

        $('#saveEvent').on('click', function(){
            var continueSave = true;
            $('#eventEditForm').find('input').each(function(){
                if($(this).prop('required') && $(this).val() == ''){
                    continueSave = false;
                }
            });
            if(continueSave){
                var eventId = $("#idEvent").val();
                $.ajax({
                    url: 'https://api.concertian.com/agents/events' + (eventId ? '/' + eventId : ''),
                    method: eventId ? 'PUT' : 'POST',
                    data:{
                        idVenue: idVenue,
                        name: $("#name").val(),
                        date: $("#date").val(),
                        time: $("#time").val(),
                        detail: $("#detail").val(),
                        entry: $("#entry").val(),
                        status: $('input[name=status]:checked').val() ,
                        visible: $('input[name=visible]:checked').val()
                    },
                    beforeSend: function (request) {
                        request.setRequestHeader("Authorization", apiKey);
                        request.withCredentials = true;
                    },
                    contentType: "application/x-www-form-urlencoded",
                    success: function (json) {
                        alert('ulozene');
                        $("#mycalendar").trigger( "click" );
                    },
                    error: function (error) {
                        alert('chyba');
                    }
                });
            }
        });

    });
}

function renderCalendar(json, calendarLanguage){
    var eventsArr = [];
    if(json) {
        json.events.forEach(function (data) {
            var event = {};
            event.id = data.idEvent;
            event.title = data.name;
            event.start = data.date + 'T' + data.time;
            event.status = data.status;
            event.visible = data.visible;
            eventsArr.push(event);
        });
    }

    $('#myCalendar').fullCalendar({
        lang: calendarLanguage,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultDate: '2016-01-12',
        eventLimit: true,
        events: eventsArr,
        eventClick: function(event) {
            renderEdit(event.id);
        }
    });
}

function renderEdit(eventId){
    var dataEvent;
    if(eventId){
        $.ajax({
            url: 'https://api.concertian.com/agents/events/' + eventId,
            method: 'GET',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", apiKey);
                request.withCredentials = true;
            },
            success: function (json) {
                var data = json.events[0];
                $("#idEvent").val(data.idEvent);
                $("#name").val(data.name);
                $("#date").val(data.date);
                $("#time").val(data.time);
                $("#detail").val(data.detail);
                $("#entry").val(data.entry);
                $("#status_" + data.status).attr('checked', 'checked');
                $("#visible_" + data.visible).attr('checked', 'checked');
            },
            contentType: "application/x-www-form-urlencoded"
        });
    }
    else{
        $("#deleteEvent").hide();
    }
}

$(function(){
    $('#eventEditForm').submit(function(sub){
        sub.preventDefault();
        return false;
    });
});