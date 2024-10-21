from app.routes.posts import bp
from flask import (
  request, session, jsonify
)
from flask_cors import (
  cross_origin
)
import json
from app.extensions import db
from app.models.user import User
from app.models.post import Post
@bp.route('/')
# @cross_origin()
def get_all_posts():
  posts = Post.query.all()
  return jsonify({'data':  [u.as_dict() for u in posts]})


@bp.route('/<blog_id>')
def get_single_post(blog_id):
  post = Post.query.filter(Post.id == blog_id).first()
  print("This is the author", post.author.username)
  return jsonify({'data': post.as_dict()})


@bp.route('/user/<int:userid>')
def getUser_posts(userid):
  return 'These are all the posts by user {}'.format(userid)


@bp.route('/create-post', methods=['POST'])
def create_post():
  if 'user_id' in session:
    user = User.query.filter(User.id == session['user_id']).first()
    if user:
      # you can create post
      req = request.get_json()
      content = req['content']
      title = req['title']
      post = Post(title=title, content=content, author_id=user.id)
      db.session.add(post)

      db.session.commit()
      return jsonify({"message": "Post created successfully"})

  
  return jsonify({"message": "Not authorized"}), 403
