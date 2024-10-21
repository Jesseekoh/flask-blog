from app.routes.main import bp
from flask import (
  g, session
)
from app.models.user import User
@bp.route('/')
def index():
  if 'user_id' in session:
    user = User.query.filter(User.id == session['user_id']).first()
    if user: 
      return 'Welcome Home User {}. Email {}'.format(user.username, user.email)
      
  return 'This is the root page blah'
