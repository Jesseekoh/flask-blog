from app.extensions import db
from sqlalchemy import Integer, String, Column, UUID
from uuid import uuid4
# from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

class User(db.Model):
  __tablename__ = 'users'
  id = Column(UUID(as_uuid=True),default=uuid4, primary_key=True, nullable=False)
  username = Column(String(50), unique=True, nullable=False)
  email = Column(String(50), unique=True, nullable=False)
  password = Column(String, nullable=False)
  posts = relationship('Post')

  def __repr__(self) -> str:
        return f"<User {', '.join(f'{key}={value}' for key, value in vars(self).items() if not key.startswith('_'))}>"
