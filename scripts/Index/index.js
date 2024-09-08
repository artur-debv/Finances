
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

if (!localStorage.getItem('jwtToken')) {

    window.location.href = '/Form.html';
} else {


    window.onload = function () {
        const jwtToken = localStorage.getItem('jwtToken');

        const decodedToken = parseJwt(jwtToken);

        if (decodedToken) {
            UpdateData(decodedToken.name, decodedToken.email, decodedToken.picture)
        } else {
            console.log('erro')
        }


    }


    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "g");
        var results = [];
        var match;
        while (match = regex.exec(url)) {
            results.push(decodeURIComponent(match[2].replace(/\+/g, " ")));
        }
        return results;

    }
}

function UpdateData(name, email, pictureUrl) {
    document.querySelector('.item-description').innerHTML = name
    avatarElement.src = pictureUrl;
}


const pictureUrl = getParameterByName('picture');


const avatarElement = document.getElementById('user_avatar');


avatarElement.src = pictureUrl;


const name = getParameterByName('name');
const email = getParameterByName('email');

UpdateData(name, email, pictureUrl)

var newUrl = window.location.pathname;
window.history.pushState({}, '', newUrl);


const menuBar = document.getElementById('menu-bar');
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
