

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