$(function(){
  function buildMessage(message){
    var image = (message.image)? `<img src= ${message.image}>` : "";
    var html = `<div class="message" data-id="${message.id}"> 
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`
return html;
}

  function scroll(){
    $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight},"fast");
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      scroll()
      $('.form__submit').prop('disabled',false)
      $('#new_message')[0].reset();
    })
    .fail(function(message){
      alert('むりやで');
    })
    return false;
  })

  var reloadMessages = function() {
    if(location.href.match(/messages/)){
      var last_message_id = $('.message').data('id').last();
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var html = buildHTML(data);
          $('.messages').append(html);
          $("form")[0].reset();
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          $('.form__submit').prop('disabled', false);
        })
      .fail(function() {
        alert("お前にはできない。諦めろ。");
      });
    };
  };
});