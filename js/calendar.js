function initCalendar(language) {
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
            renderCalendar(false);
        }
    });

    $("#contentPanel #createConcertForm").load("concertForm.html", null, function() {
        $(".deleteEventiconText").text(window.language["deleteEventiconText"]);
        $("#createEventName").text(window.language["createEventName"]);
        $("#createEventDate").text(window.language["createEventDate"]);
        $("#createEventTime").text(window.language["createEventTime"]);
        $("#createEventDetails").text(window.language["createEventDetails"]);
        $("#createEventEntry").text(window.language["createEventEntry"]);
        $("#createEventNotes").text(window.language["createEventNotes"]);
        $("#createEventEmail").text(window.language["createEventEmail"]);
        $("#createEventPhone").text(window.language["createEventPhone"]);
        $("#status").text(window.language["status"]);
        $("#status1").text(window.language["status_1"]);
        $("#status2").text(window.language["status_2"]);
        $("#visible").text(window.language["visible"]);
        $("#visible1").text(window.language["visible_1"]);
        $("#visible0").text(window.language["visible_2"]);
    //propagation.html
        $(".eventformInputs").perfectScrollbar();
        $("#date").datepicker($.datepicker.regional[ window.language["calendarLang"]]);
        $("#date").datepicker("option", "dateFormat", "yy-mm-dd ");
        $("#time").timepicker();
        $('#time').timepicker({ 'timeFormat': 'H:i:s' });

        $("#deleteEvent").hide();
        //default select
        $("#status_1").attr('checked', 'checked');
        $("#visible_1").attr('checked', 'checked');

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
                        imgUrl: $("#imgUrl").val(),
                        note: $("#note").val(),
                        performerEmail: $("#performerEmail").val(),
                        performerPhoneNumber: $("#performerPhoneNumber").val(),
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
                        console.log(data);
                        alert('chyba');
                    }
                });
            }
        });
    });
}

function renderCalendar(json){
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
        lang: window.language["calendarLang"],
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
                $("#imgUrl").val(data.imgUrl);
                $("#note").val(data.note);
                $("#performerEmail").val(data.performerEmail);
                $("#performerPhoneNumber").val(data.performerPhoneNumber);
                $("#status_" + data.status).attr('checked', 'checked');
                $("#visible_" + data.visible).attr('checked', 'checked');
                $("#deleteEvent").show();
            },
            contentType: "application/x-www-form-urlencoded"
        });
    }
}

$(function(){
    $('#eventEditForm').submit(function(sub){
        sub.preventDefault();
        return false;
    });
});