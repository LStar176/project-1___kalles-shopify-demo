const form = document.querySelector('.form');
const userName = form['your_name'];
const userEmail = form['your_email'];
const userPhone = form['your_phone'];
const userMessage = form['your_message'];
const btn = document.getElementById('button_btn');
const overlayBox = document.querySelector('.overlay');
const continueBtn = document.querySelector('input[type="button"]');
const overlayText = document.querySelector('.overlay p.info_confirm');

const userArray = JSON.parse(localStorage.getItem(`user`)) || [];

const addUser = (id, name, email, phone, message) => {
    userArray.unshift({
        id, name, email, phone, message
    })
}

function on() {
    overlayBox.style.display = 'block';
}
function off() {
    overlayBox.style.display = 'none';
}

form.onsubmit = (event) => {
    event.preventDefault();

    addUser(
        Date.now(),
        userName.value,
        userEmail.value,
        userPhone.value,
        userMessage.value
    )

    localStorage.setItem(`user`, JSON.stringify(userArray));

    overlayText.innerHTML = `We appreciate <span style='font-style: italic!important; color: #EC0101'>${userName.value}</span> for subcribing us. All of your information, including phone <span style='font-style: italic!important; color: #EC0101'>(${userPhone.value})</span>, email <span style='font-style: italic!important; color: #EC0101'>(${userEmail.value})</span>, will not be disclosed for any third party. We will send you our latest promotion new products via your information only!`

    on();

    userName.value = '';
    userEmail.value = '';
    userPhone.value = '';
    userMessage.value = '';
}

continueBtn.addEventListener('click', off);
document.querySelector('.overlay .container').addEventListener('click', (event) => {
    event.stopPropagation();
});
overlayBox.addEventListener('click', off);



