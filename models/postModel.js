class post {
  constructor(
    post_id,
    post_user_id,
    post_content,
    post_imageUrl,
    post_likes,
    timestamp
  ) {
    this.post_id = post_id;
    this.post_user_id = post_user_id;
    this.post_content = post_content;
    this.post_imageUrl = post_imageUrl;
    this.post_likes = post_likes;
    this.timestamp = timestamp;
  }
}

module.exports = post;
