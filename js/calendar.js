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
		$("#categorySelectorText").text(window.language["selectCategoryText"]);
        $("#createEventName").text(window.language["createEventName"]);
        $("#createEventDate").text(window.language["createEventDate"]);
        $("#createEventTime").text(window.language["createEventTime"]);
        $("#createEventDetails").text(window.language["createEventDetails"]);
       	$("#youtubeLink").text(window.language["youtubeLink"]);
       	$("#facebooklinksource").text(window.language["facebooklinksource"]);
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

        //default select
        $("#status_1").attr('checked', 'checked');
        $("#visible_1").attr('checked', 'checked');
        // Radio handler
        $("#status1").on('click', function(){
           $(this).addClass("clicked");
           $("#status2").removeClass("clicked");
           $("#status_1").attr('checked', 'checked');
           $("#status_2").attr('checked', false);
        });
        $("#status2").on('click', function(){
           $(this).addClass("clicked");
           $("#status1").removeClass("clicked");
           $("#status_2").attr('checked', 'checked');
           $("#status_1").attr('checked', false);
        });
        $("#visible1").on('click', function(){
           $(this).addClass("clicked");
           $("#visible0").removeClass("clicked");
           $("#visible_1").attr('checked', 'checked');
           $("#visible_0").attr('checked', false);
        });
        $("#visible0").on('click', function(){
           $(this).addClass("clicked");
           $("#visible1").removeClass("clicked");
           $("#visible_0").attr('checked', 'checked');
           $("#visible_1").attr('checked', false);
        });
		$('#categorySelector input').on('change', function() {
			var selected = $(this).val();
			
			for(var i = 1; i < 5; i++){
				if(i == selected){
					$("#category" + i).addClass("clickedcategory");
					$("#category_" + i).attr('checked', 'checked');
			   	}else{
					$("#category" + i).removeClass("clickedcategory");
					$("#category_" + i).attr('checked', false);
				}
			}
		});
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
                if($("#entry").val() == ""){
                    $("#entry").val(0);
                }
                $.ajax({
                    url: 'https://api.concertian.com/agents/events' + (eventId ? '/' + eventId : ''),
                    method: eventId ? 'PUT' : 'POST',
                    data:{
                        idVenue: idVenue,
						category: $('input[name=category]:checked').val() ,
                        name: $("#name").val(),
                        date: $("#date").val(),
                        time: $("#time").val(),
                        detail: $("#detail").val(),
                        youtubeVideo: $("#youtube").val(),
						seatMap: "null",
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
                        alert('Podujatie bolo vytvorené.');
                        $("#mycalendar").trigger( "click" );
                    },
                    error: function (error) {
                        console.log(error);
                        alert('Nastala chyba. Skúste to ešte raz. Ďakujeme.');
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
        defaultDate: new Date(),
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
                $("#youtube").val(data.youtubeVideo);
                $("#entry").val(data.entry);
                $("#imgUrl").val(data.imgUrl);
                $("#note").val(data.note);
                $("#performerEmail").val(data.performerEmail);
                $("#performerPhoneNumber").val(data.performerPhoneNumber);
                $("#category_" + data.category).attr('checked', 'checked');
				$("#category_" + data.category).parent(".categoryInline").addClass("clickedcategory");
                $("#status_" + data.status).attr('checked', 'checked'); 
                $("#status" + data.status).addClass("clicked");
                $("#visible_" + data.visible).attr('checked', 'checked');
                $("#visible" + data.status).addClass("clicked");
				console.log(data.category);
				for(var i = 1; i < 5; i++){
					if(i == data.category){
					$("#category" + i).addClass("clickedcategory");
					$("#category_" + i).attr('checked', 'checked');
					}
					else{
					$("#category" + i).removeClass("clickedcategory");
					$("#category_" + i).attr('checked', false);
					}
				}
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