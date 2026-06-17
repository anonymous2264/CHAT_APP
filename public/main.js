console.log("main.js loaded");
const socket=io()
socket.on('connect', () => {
    console.log('Connected to socket:', socket.id);
});
const clientstotal =document.getElementById('clients-total')
const messagecontainer= document.getElementById('message-container')
const nameInput=document.getElementById('name-input')
const messageForm=document.getElementById('message-form')
const messageInput=document.getElementById('message-input')
const messageTone=new Audio('/universfield-new-notification-022-370046.mp3')
let mediaRecorder;
let audioChunks = [];

const startRecordBtn = document.getElementById('start-record');
const stopRecordBtn = document.getElementById('stop-record');
messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    sendMessage()
})
socket.on('clients-total',(data)=>{
    clientstotal.innerText= `Total Clients: ${data}`
})
function sendMessage()
{
    if(messageInput.value ==='')
        return
    //console.log(messageInput.value)
    const data ={
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message',data)
    addMessageToUI(true,data)
    messageInput.value=''
}
socket.on('chat-message',(data)=>{
    messageTone.play()
    console.log(data)
    addMessageToUI(false,data)
})
function addMessageToUI(isOwnMessage,data)
{
    clearFeedback()
    const element=`<li class="${isOwnMessage ? "message-right message-animate" : "message-left"}">
                <p class="message">
                   ${data.message}
                    <span>${data.name} 🟢 ${moment(data.dateTime).fromNow()}</span>
                </p>
            </li>
            `
            messagecontainer.innerHTML+=element
            scrollToBottom()
}
function addVoiceMessageToUI(isOwnMessage, data)
{
    clearFeedback();

    const element = `
        <li class="${isOwnMessage ? "message-right message-animate" : "message-left"}">
            <p class="message">
                🎤 Voice Message
                <br><br>
                <audio controls>
                    <source src="${data.audio}" type="audio/webm">
                </audio>
                <span>${data.name} 🟢 ${moment(data.dateTime).fromNow()}</span>
            </p>
        </li>
    `;

    messagecontainer.innerHTML += element;

    scrollToBottom();
}
function scrollToBottom(){
    messagecontainer.scrollTo(0,messagecontainer.scrollHeight)
}
messageInput.addEventListener('focus',(e)=>{
socket.emit('feedback',{
    feedback:`${nameInput.value} is typing`,
})
})
messageInput.addEventListener('keypress',(e)=>{
    socket.emit('feedback',{
    feedback:`${nameInput.value} is typing`,
})
})
messageInput.addEventListener('blur',(e)=>{
    socket.emit('feedback',{
    feedback:``,
})
})
socket.on('feedback',(data)=>{
    clearFeedback()
    const element=`
            <li class="message-feedback">
                <p class="feedback" id="feedback">
                    ${data.feedback}
                </p>
            </li>
            `
            messagecontainer.innerHTML+=element
})
function clearFeedback()
{
    document.querySelectorAll('li.message-feedback').forEach(element=>{
        element.parentNode.removeChild(element)
    })
}
startRecordBtn.addEventListener('click', async () => {

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true
});

window.currentStream = stream;

    mediaRecorder = new MediaRecorder(stream);

    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };

    mediaRecorder.start();
startRecordBtn.style.background = '#f44336';
    console.log('Recording started');
});
stopRecordBtn.addEventListener('click', () => {

    if (!mediaRecorder || mediaRecorder.state === 'inactive') return;
startRecordBtn.style.background = '#bbb';
    mediaRecorder.stop();

    mediaRecorder.onstop = () => {

        const audioBlob = new Blob(audioChunks, {
            type: 'audio/webm'
        });
 window.currentStream.getTracks().forEach(track => track.stop());
    const reader = new FileReader();
        reader.onloadend = () => {

            const data = {
                name: nameInput.value,
                audio: reader.result,
                dateTime: new Date()
            };

            socket.emit('voice-message', data);

            addVoiceMessageToUI(true, data);
        };

        reader.readAsDataURL(audioBlob);
    };

});
socket.on('voice-message', (data) => {

    messageTone.play();

    addVoiceMessageToUI(false, data);

});