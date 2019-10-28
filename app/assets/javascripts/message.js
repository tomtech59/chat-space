$(function(){
  function buildMessage(message){
    var image = (message.image)? (message.image) : "";
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                  </div>
                  <img src= ${message.image}>
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
      $('.messages').append(html)
      $('.form__message').val('')
      scroll()
      $('.form__submit').prop('disabled',false)
    })
    .fail(function(message){
      alert('むりやで');
    })
    return false;
  })
});