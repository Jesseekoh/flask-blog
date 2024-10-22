from app.routes.auth import bp
from app.extensions import db
from flask import (
  request, jsonify, session,g
)

from flask_cors import (
  cross_origin
)
from werkzeug.security import (
  generate_password_hash, check_password_hash
)
from app.models.user import User

# @bp.before_app_request
# def load_logged_in_user():
#   user_id = session.get('user_id')

#   if user_id is None:
#     g.user = None

#   else:
#     g.user = User.query.filter(User.id == user_id).one()


@bp.route('/login', methods= ('GET', 'POST'))
@cross_origin(supports_credentials=True)
def login():
  if request.method == 'POST':
    req = request.get_json()
    email = req['email']
    password = req['password']
    error = None

    user = User.query.filter(User.email == email).first()
    
    if user:
      if check_password_hash(user.password, password):
        session['user_id'] = user.id
        # session['username'] = user.username
        return jsonify({'message':'You have logged in {}'.format(user.username), "data": {'username': user.username, 'id': user.id, 'email': user.email}})
      else:
        return jsonify({'message': 'Password is incorrect'}), 401
    return 'User does not exist', 401


@bp.route('/register', methods=('POST', 'GET'))
def register():
  if request.method == 'POST':
    req = request.get_json()
    username = req['username']
    email = req['email']
    password = req['password']
    print('I got your request')
    user_exists = User.query.filter((User.username == username ) | (User.email == email)).all()

    if user_exists:
      return jsonify({'message': 'User already exists'}), 403

    user = User(email=email, password=generate_password_hash(password), username=username)
    print("User is balablue")
    db.session.add(user)

    try:
      db.session.commit()
    except ValueError:
      return jsonify({'message': 'error creating user'}),403

    return jsonify({'message': 'User created successfully'})



@bp.route('/logout')
def logout():
  session['user_id'] = None
  return jsonify({'message': "You've logged out successfully"})
