class comment {
  constructor(
    comment_id,
    comment_user_id,
    comment_post_id,
    comment_content,
    comment_likes,
    comment_timestamp
  ) {
    this.comment_id = comment_id;
    this.comment_user_id = comment_user_id;
    this.comment_post_id = comment_post_id;
    this.comment_content = comment_content;
    this.comment_likes = comment_likes;
    this.comment_timestamp = comment_timestamp;
  }
}

module.exports = comment;
