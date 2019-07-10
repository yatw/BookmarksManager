

var urlField = document.getElementById('urlInput');
var titleField = document.getElementById('titleInput');
var descriptionField = document.getElementById('descriptionInput');

$('#urlInput').on('input', function() {
    

     
    titleField.value = "Loading...";
    descriptionField.value = "Loading...";

    $.ajax({
        type: "POST",
        url: "/getTitle",
        data: JSON.stringify({'url': urlField.value}),
        contentType: "application/json",    
        dataType: "json",
        success: function(data) {
            console.log(data.status);
            if (data.status === "fail"){
                ExtractFail();
            }else{
                ExtractSuccess(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("something went wrong");
            ExtractFail();
        }
    });
   
});


function ExtractFail(){
    
    urlField.classList.remove("successbox");
    urlField.classList.add("warningbox");

    titleField.classList.remove("successbox");
    titleField.classList.add("warningbox");

    descriptionField.classList.remove("successbox");
    descriptionField.classList.add("warningbox");

    titleField.value = "";
    descriptionField.value = "";
}

function ExtractSuccess(data){

    urlField.classList.remove("warningbox");
    urlField.classList.add("successbox");

    titleField.classList.remove("warningbox");
    titleField.classList.add("successbox");
    
    descriptionField.classList.remove("warningbox");
    descriptionField.classList.add("successbox");

    titleField.value = data.title;
    descriptionField.value = data.metaDescription;
}


$("i.fa-star").click(function(event){


    var linkId = parseInt($(event.target).closest('tr').find('td:first').text());
    var filled = this.classList.contains("fas");
    var status = true;

    if (filled){
        this.classList.remove("fas");
        this.classList.add("far");
        status = false;
    }else{
        this.classList.remove("far");
        this.classList.add("fas");
    }  

    $.ajax({
        type: "POST",
        url: "/checkbox",
        data: JSON.stringify({field: 'star', linkId: linkId, status: status}),
        contentType: "application/json",    
        dataType: "json",

    });

})

$("i.fa-check-square").click(function(event){
    
    var linkId = parseInt($(event.target).closest('tr').find('td:first').text());
    var filled = this.classList.contains("fas");
    var status = true;

    if (filled){
        this.classList.remove("fas");
        this.classList.add("far");
        status = false;
    }else{
        this.classList.remove("far");
        this.classList.add("fas");
    }  

    $.ajax({
        type: "POST",
        url: "/checkbox",
        data: JSON.stringify({field: 'completed', linkId: linkId, status: status}),
        contentType: "application/json",    
        dataType: "json"
    });

})
