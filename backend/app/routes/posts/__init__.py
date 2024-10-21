from flask import Blueprint

bp = Blueprint('post', __name__, url_prefix='/posts')

from app.routes.posts import routes
