from flask import Flask, session
from flask_cors import CORS
from flask_session import Session
from config import Config
from app.extensions import db
from dotenv import load_dotenv
from app.models.user import User
from app.models.post import Post
from datetime import timedelta
from cachelib.file import FileSystemCache

load_dotenv()
def create_app(config_class= Config):
  app = Flask(__name__)
  app.config.from_object(config_class)
  # Enable CORS
  # CORS(app)
  CORS(app, resources={r'/*': {'origins': ['http://localhost:5173', 'http://localhost:8000']}})

  app.permanent_session_lifetime = timedelta(minutes=30)
  # Enable server-side sessions
  Session(app)
  # Initialize the database
  db.init_app(app)

  with app.app_context():
    # create all database tables
    # db.drop_all()
    db.create_all()


  from app.routes.auth import  bp as auth_bp
  app.register_blueprint(auth_bp)

  from app.routes.main import bp as main_bp
  app.register_blueprint(main_bp)


  from app.routes.posts import bp as posts_bp
  app.register_blueprint(posts_bp)


  from app.routes.users import bp as users_bp
  app.register_blueprint(users_bp)

  return app


if __name__ == '__main__':
  app = create_app()
  app.run(host='0.0.0.0', port=5000)
