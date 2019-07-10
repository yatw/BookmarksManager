

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
        dataType: "json",
        success: function(result){
            console.log("done");
          },
          error: function(result){
            console.log(result);
          }
    });

})

$("i.fa-edit").click(function(event){

    var linkId = $(event.target).closest('tr').find('td:first').text().trim();
    var url = $(event.target).closest('tr').find('td:nth-child(2)').text().trim();
    var title = $(event.target).closest('tr').find('td:nth-child(4)').text().trim();
    var description = $(event.target).closest('tr').find('td:nth-child(5)').text().trim();


    $('#linkId').val(linkId);
    $('#urlEdit').val(url);
    $('#titleEdit').val(title);
    $('#descriptionEdit').val(description);


    $("#editModal").modal();
})


$("#deleteLink").click(function(event){

    var linkId = document.getElementById("linkId").value;

    $.ajax({
        type: "POST",
        url: "/deleteLink",
        data: JSON.stringify({linkId: linkId}),
        contentType: "application/json",    
        dataType: "html",
        success: function(result){
            window.location.href = '/'; //redirect back
          },
          error: function(xhr, status, error) {
            console.log(xhr.responseText);
            console.log(error);
            window.location.href = "/";
          }

    })
})


