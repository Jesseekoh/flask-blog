from flask import (
  jsonify, 
)
from flask_cors import (
  cross_origin
)
from app.models.user import User
from app.routes.users import bp




@bp.route('/<user_id>')
def get_user_profile(user_id):
  user = User.query.filter(User.id == user_id).first()
  # print(user.posts)
  if user:
    return jsonify({"data": {
      'username': user.username,
      'email': user.email
    }})

  return jsonify({'message': 'User not found'}), 404
