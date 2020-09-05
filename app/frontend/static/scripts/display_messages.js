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
    },

    //display error message for 10 seconds
    displayErrorMessage: (text)=>{
        $("#error_message").text(text);
        $("#error_message").css("display", "inline");
        window.setTimeout(() => {
            $("#error_message").text("");
            $("#error_message").css("display", "none");
        }, 10000)
    }
}