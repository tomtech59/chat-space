  $(document).on('turbolinks:load',function(){
    function buildHTML(message){
      var content = (message.content)? `${ message.content }` : "";
      var image = (message.image.url)? `<img class="lower-message__image" src="${message.image.url}">` : "";
      var html = `<div class="message" data-message-id="${message.id}"> 
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-meesage">
                      <p class="lower-message__content">
                        ${content}
                      </p>
                      ${image}
                    </div>
                  </div>`
  return html;
  }

  //非同期
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
        $('.messages').append(buildHTML(message));
        $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight},"fast");
        $('#new_message')[0].reset();
        $('.form__submit').prop('disabled',false)
      })
      .fail(function(message){
        alert('むりです');
      });
    });

  //自動更新
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data("message-id");
        $.ajax({
          url: "api/messages",
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
            messages.forEach(function(message){
              $('.messages').append(buildHTML(message));
              $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, "fast");
            })
        })
        .fail(function() {
          alert("むりです");
        });
    }
  };
  setInterval(reloadMessages, 5000);
}); 