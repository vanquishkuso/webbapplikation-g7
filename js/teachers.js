$("document").ready(function () {
    $(".user").append("<button id='log-out'>Logga ut</button>");
    $("#log-out").click(function (){
        sessionStorage.clear();
        window.location.href = "index.html";
    });
    //Get data from API about the teachers
    $.get("http://webbred2.utb.hb.se/~fewe/api/api.php?data=teachers", function (
        teacherData
    ) {
// Check if the session is valid, or else
        function checkSession() {
            if (sessionStorage.getItem('username') == null) {
                window.location.href = "error.html";
            }
        }

        function checkUser() {
            if (sessionStorage.getItem('username') != null) {
                $(".user").append("Inloggad som " + sessionStorage.getItem('username'));
            } else {
                checkSession();
            }
        }
        checkUser();

        //Loop to append teacher information and picture on the site with correct classes. Append all in one time to get elements more clustered.
        for (i = 0; i < teacherData.length; i++) {
            $(".div-teachers").append(
                "<div class='teacher" +
                [i] +
                "'><span class='img-wrapper'><img class='teacher-img' src='" +
                teacherData[i].picture.large +
                "' alt='Teacher image'></span><p>" +
                teacherData[i].name.jobtitle +
                "<br>" +
                teacherData[i].name.first +
                " " +
                teacherData[i].name.last +
                "<br>" +
                teacherData[i].id.name +
                "<br>" +
                teacherData[i].email +
                "</p></div>"
            );
        }
    });
});