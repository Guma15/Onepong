/*
The handeling of formdata to google spreadsheets was originally created by
Martin Hawksey and later edited by github user dwyl.
Edited version by dwyl
https://github.com/dwyl/html-form-send-email-via-google-script-without-server

This version handles any dataform object and posts it to a google spreadsheet
*/

// Variable to hold request
var request;

// Bind to the submit event of our form
function submit(){
    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    // Serialize the data in the form
    // Fire off the request to /form.php
    request = $.ajax({
        //Change this url for your own google spreadsheet document
        url: "https://script.google.com/macros/s/AKfycbwsK5WCSw_oC-dToFBhiWbJTXkr05zKOPimwr-aC4QFtlDFrCA/exec",
        type: "post",
        //Neccesary values to be able to send the dataform object to google correctly
        cache: false,
        contentType: false,
        processData: false,
        data: formResults
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });
}
