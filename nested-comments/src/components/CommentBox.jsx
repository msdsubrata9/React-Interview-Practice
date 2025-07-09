import React from "react";

function CommentBox({ data }) {
  return data.map((comment, index) => (
    <div className="commentBoxContainer" key={index}>
      <div className="commentContainer">
        <div>
          <img
            src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_3.png"
            alt="user"
            className="image"
          />
        </div>
        <div>
          <p className="name">{comment.username}</p>
          <p>{comment.comment}</p>
        </div>
      </div>

      <div>{comment?.replies && <CommentBox data={comment.replies} />}</div>
    </div>
  ));
}

export default CommentBox;
