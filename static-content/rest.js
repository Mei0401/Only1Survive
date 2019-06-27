var user = null;

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function userLogin() {
    var username = $('#login_name').val();
    var password = $('#login_pwd').val();
    if (!username || !password) {
        $('#login_error').text("please give a valid input.");
        $('#login_error').show;
        return
    }
    $.ajax({
        method: "POST",
        url: "/login/",
        data: { uname: username, pwd: password }
    }).done(function (data) {
        if (data['status'] == 'error') {
            $('#login_pwd').val('');
            $('#login_error').text("wrong username or password");
            $('#login_error').show;
        } else {
            $('#login').hide();
            $('#game').show();
            $('#login_pwd').val('');
            $('#high_score').text(data['high_score']);
            user = username;
            setupGame();
            startGame();
        }
    }).fail(function (err) {
        alert('error');
    });
}

function goToLogin() {
    $('#reg_name').val('');
    $('#reg_pwd').val('');
    $('#reg_confirm').val('');
    $('#email').val('');
    $("#login").show();
    $("#register").hide();
}

function goToRegister() {
    $('#login_pwd').val('');
    $("#login").hide();
    $("#register").show();
}

function userRegister() {
    var username = $('#reg_name').val();
    var password = $('#reg_pwd').val();
    var confirm = $('#reg_confirm').val();
    var email = $('#email').val();
    if (validateEmail(email) == false) {
        $('#reg_pwd').val('');
        $('#reg_confirm').val('');
        $('#reg_error').text("email is not in correct format");
        $('#reg_error').show;
    }
    else if (!username || !password || !confirm) {
        $('#reg_pwd').val('');
        $('#reg_confirm').val('');
        $('#reg_error').text("please give a valid input.");
        $('#reg_error').show;
    } else if (password != confirm) {
        $('#reg_pwd').val('');
        $('#reg_confirm').val('');
        $('#reg_error').text("password and confirm are not match");
        $('#reg_error').show;
    } else {
        $.ajax({
            method: "POST",
            url: "/register/",
            data: { uname: username, pwd: password, email: email, score: 0 }
        }).done(function (data) {
            if (data['status'] == 'error') {
                $('#reg_pwd').val('');
                $('#reg_confirm').val('');
                $('#reg_error').text("Already exist user with same name");
                $('#reg_error').show;
            } else {
                $('#reg_name').val('');
                $('#reg_pwd').val('');
                $('#reg_confirm').val('');
                $('#email').val('');
                $('#register').hide();
                $('#login').show();
            }
        }).fail(function (err) {
            alert('error');
        });
    }
}

function changeEmail() {
    var username = user;
    var email = $('#change_email').val();
    if (validateEmail(email) == false) {
        $('#game_error').text("email is not in correct format");
        $('#game_error').show;
    } else {
        $.ajax({
            method: "PUT",
            url: "/user/",
            data: { uname: username, email: email }
        }).done(function (data) {
            if (data['status'] == 'error') {
                $('#game_error').text("user already exist");
                $('#game_error').show;
            } else {
                $('#game_error').text("your new email is up-to-date");
                $('#game_error').show;
                pauseGame();
            }
        }).fail(function (err) {
            alert('error');
        });
    }
}

function addHighScore() {
    var username = user;
    $.ajax({
        method: "PUT",
        url: "/score/",
        data: { uname: username, high_score: score }
    }).done(function (data) {
        $('#high_score').text(data['high_score']);
    }).fail(function (err) {
        alert('error');
    });
}


function deleteAccount() {
    var username = user;
    $.ajax({
        method: "DELETE",
        url: "/user/",
        data: { uname: username }
    }).done(function (data) {
        if (data['status'] == 'error') {
            $('#game_error').text("error in delete");
            $('#game_error').show;
        } else {
            $('#login_error').text("Your account is already being delete");
            $('#register').hide();
            $('#game').hide();
            $('#login').show();
            user = null;
            pauseGame();
        }
    }).fail(function (err) {
        alert('error');
    });
}

function userLogout() {
    user = null;
    pauseGame();
    $('#register').hide();
    $('#game').hide();
    $('#login').show();
}



// This is executed when the document is ready (the DOM for this document is loaded)
$(function () {
    // Setup an onclick event for the #guessButton
    $('#register').hide();
    $('#game').hide();
    $('#login').show();
});