var socket = io.connect("http://localhost:6677", { forceNew: true });

socket.on("messages", function (data) {
  render(data);
});

function render(data) {
  var html = data
    .map(function (message, index) {
      return `
            <div class="message">
                <strong>${message.nickname}</strong> says:
                <p>${message.text}</p>
            </div>    
        `;
    })
    .join(" ");

  var div_msg = document.getElementById("messages");

  div_msg.innerHTML = html;
  div_msg.scrollTop = div_msg.scrollHeight;
}

function addMessage(e) {
  var message = {
    nickname: document.getElementById("nickname").value,
    text: document.getElementById("text").value,
  };

  document.getElementById("nickname").style.display = "none";
  document.getElementById("label_nick").style.display = "none";
  socket.emit("add-message", message);

  return false;
}

function clearContents(element) {
  element.value = "";
}
