{
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container").prepend(newPost);

          //#posts-list-container>ul

          deletePost($(" .delete-post-button", newPost));
          //this means newpost object ke andar jo delete-post-button class

          // call the create comment class
          new PostComments(data.data.post._id);

          // CHANGE :: enable the functionality of the toggle like button on the new post
          new ToggleLike($(" .toggle-like-button", newPost));

          new Noty({
            theme: "relax",
            text: "Post published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // method to create a post in DOM
  let newPostDom = function (post) {
    // CHANGE :: show the count of zero likes on this post
    // return $(`<li id="post-${post._id}">
    //             <p>

    //                 <small>
    //                     <a class="delete-post-button"  href="/posts/destroy/${post._id}">X</a>
    //                 </small>

    //                 ${post.content}
    //                 <br>
    //                 <small>
    //                 ${post.user.name}
    //                 </small>
    //                 <br>
    //                 <small>

    //                         <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
    //                             0 Likes
    //                         </a>

    //                 </small>

    //             </p>
    //             <div class="post-comments">

    //                     <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
    //                         <input type="text" name="content" placeholder="Type Here to add comment..." required>
    //                         <input type="hidden" name="post" value="${post._id}" >
    //                         <input type="submit" value="Add Comment">
    //                     </form>

    //                 <div class="post-comments-list">
    //                     <ul id="post-comments-${post._id}">

    //                     </ul>
    //                 </div>
    //             </div>

    //         </li>`);

    return $(`
    <div class="post-wrapper" id="post-${post._id}">
  <div class="post-header">
    <div class="post-avatar">
      <img
        src="${post.user.avatar}"
        alt="user-pic"
      />

      <div>
        <span class="post-author"> ${post.user.name}</span>
        <span class="post-time">a minute ago</span>
      </div>
    </div>

    <div class="post-content">${post.content}</div>

    <div class="post-actions">
      
      <small class="post-like">
        <img
          src="https://cdn-icons.flaticon.com/png/512/210/premium/210545.png?token=exp=1643293212~hmac=60f900047914e3528898eb90e89cf2cd"
          alt="like-icon"
        />
        
        <a
          class="toggle-like-button"
          data-likes=${post.likes.length}
          href="/likes/toggle/?id=${post._id}&type=Post"
        >
        ${post.likes.length} Likes
        </a>
        
      </small>
      <div class="post-comments-icon">
        <img
          src="https://cdn-icons.flaticon.com/png/128/4014/premium/4014104.png?token=exp=1643293150~hmac=0b72e94ef396f41074147bc78eaa4f57"
          alt="comments-icon"
        />
        <span> ${post.comments.length}</span>
      </div>
      
      <a class="delete-post-button" href="/posts/destroy/${post._id}"
        ><img
          src="https://cdn-icons.flaticon.com/png/128/2874/premium/2874821.png?token=exp=1643293372~hmac=327114326c165d8f6785d83b16f400e0"
          alt="delete-icon"
      /></a>
      
    </div>
    <div class="post-comment-box">
     
      <form
        id="post-${post._id}-comments-form"
        action="/comments/create"
        method="POST"
      >
        <input
          type="text"
          name="content"
          placeholder="Type Here to add comment..."
          required
        />
        <input type="hidden" name="post" value="${post._id}" />

        <input type="submit" value="Add Comment" />
      </form>
    </div>
    <div class="post-comments-list" id="post-comments-${post._id}">
     
    </div>
  </div>
</div>

    `);
  };

  // method to delete a post from DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Post Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  let convertPostsToAjax = function () {
    $("#posts-list-container>div").each(function () {
      let self = $(this);

      let deleteButton = $(" .delete-post-button", self);
      deletePost(deleteButton);

      // get the post's id by splitting the id attribute
      let postId = self.prop("id").split("-")[1];
      new PostComments(postId);
    });
  };

  createPost();
  convertPostsToAjax();
}
