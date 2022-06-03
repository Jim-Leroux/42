class user {
  constructor(
    user_id,
    user_firstname,
    user_name,
    user_email,
    user_password,
    user_picture
  ) {
    this.user_id = user_id;
    this.user_firstname = user_firstname;
    this.user_name = user_name;
    this.user_email = user_email;
    this.user_password = user_password;
    this.user_picture = user_picture;
  }
}

module.exports = user;
