import os

# basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
  SECRET_KEY = os.environ.get('SECRET_KEY')
  SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
  SESSION_COOKIE_HTTPONLY = os.environ.get('SESSION_COOKIE_HTTPONLY')
  SESSION_COOKIE_SECURE = os.environ.get('SESSION_COOKIE_SECURE')
  SESSION_TYPE = os.environ.get('SESSION_TYPE')
  SESSION_PERMANENT = os.environ.get('SESSION_PERMANENT')
