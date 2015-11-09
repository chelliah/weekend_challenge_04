$(document).ready(function(){
    //$("#entryForm").hide();
    console.log('hi im on');
    enable();
});


function enable(){

    getPosts();

    //$("#createPost").on('click',function(){
    //    $("#entryForm").slideToggle().show();
    //});

    $('#entryForm').submit(submitPost);
}

function submitPost(){
    event.preventDefault();
    var date = createDate();
    console.log('hi');
    var values = {};

    //add form elements
    $.each($(this).serializeArray(),function(i,field){
        values[field.name] = field.value;
    });

    //add date to values object
    values['date'] = date;

    //clear input form
    $("#entryForm").find("input[type=text]").val("");
    $("#postText").val('');

    //$(this).slideUp();
    postMessage(values);
}

function postMessage(values){
    $.ajax({
        url: "/data",
        type: "POST",
        data: values,
        success: function(data){
            console.log('data returned form server', data);
            getPosts();
        }
    })
}

function getPosts(){
    $.ajax({
        url: "/data",
        type: "GET",
        success: function(data){
            console.log(data);
            updateDom(data);
        }
    })
}

function createDate(){
    var date = new Date();
    console.log(date.getMinutes()<10);
    if(date.getMinutes()<10){
        return date.getMonth() + "/" + date.getDate()  + "/" + date.getFullYear() +
            ' at ' + date.getHours() + ":0" + date.getMinutes();
    }
    return date.getMonth() + "/" + date.getDate()  + "/" + date.getFullYear() +
        ' at ' + date.getHours() + ":" + date.getMinutes();
}

function updateDom(array){
    $("#messageBoard").empty();
    for (var i = 0; i<array.length; i++){
        console.log(array[i]);
        $("#messageBoard").append("<div class='post' ></div>");
        var $el = $("#messageBoard").children().last();
        $el.append(
            "<header class='postHead'>" +
                "<h2 class='title'>" + array[i].title +"</h2>" +
                "<p class='name'>By " + array[i].name +"</p>" +
                "<p class='date'>Posted on " + array[i].date +"</p>" +
            "</header>" +
            "<p class='postContent'>" + array[i].text +"</p>"
        )
    }
}