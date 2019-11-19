$(function(){
  function addUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(user_name, user_id) {
    var html = `
    <div class="chat-group-user clearfix" id="${user_id}">
      <p class="chat-group-user__name">${user_name}</p>
      <div class="chat-group-user__remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="${user_id}" data-user-name="${user_name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  function addMember(user_id) {
    var html = `<input value="${user_id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${user_id}" />`;
    $(`#${user_id}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("ユーザー検索に失敗しました");
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
    var user_name = $(this).attr("data-user-name");
    var user_id = $(this).attr("data-user-id");
    $(this).parent().remove();
    addDeleteUser(user_name, user_id);
    addMember(user_id);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  });
});

//動けへんけど、残してる
/* $(function() {
  function addUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    $("#user-search-result").append(html);
  }
  function addNoUser(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーがおらん。</p>
                </div>`
    $("#user-search-result").append(html);
  }

  //追加ボタンが押されることによって削除のHTMLが追加される。
  function addDeleteUser(user_name, user_id){
//意味不
    var html = `
              <div class="chat-group-user clearfix" user_id="${user_id}">
                <p class="chat-group-user__name">${user_name}</p>
                <a class="user-search-remove chat-group-user__btn chat-group-user__btn--add" data-user-id="${user_id}" data-user-name="${user_name}">削除</a>
              </div>
                `;
    $('.js-add-user').append(html);
  }

  function addMember(user_id){
    var html = `<input value="${user_id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${user_id}" />`;
    $(`#${user_id}`).append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
        if (users.length !== 0) {
        users.forEach(function(user){
          addUser(user);
        });
      }
        else {
          addNoUser();
        }
      })
    .fail(function() {
      alert('')
    })
  });

  $(document).on('click', ".chat-group-user__btn--add", function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    $(this).parent().remove();
    addDeleteUser(user_name, user_id);
    addMember(user_id);
  });

  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
}); */