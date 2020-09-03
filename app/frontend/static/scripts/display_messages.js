//JavaScript functions that are used accross the application
module.exports = {
    //display success message for 3 seconds
    displaySuccessMessage: (text)=>{
    $("#success_message").text(text);
    $("#success_message").css("display", "inline");
    window.setTimeout(() => {
        $("#success_message").text("");
        $("#success_message").css("display", "none");
    }, 3000)
    }
}