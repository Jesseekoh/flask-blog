from app.extensions import db
from sqlalchemy import (
  Integer, Column, UUID, String, DateTime, ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from uuid import uuid4

class Post(db.Model):
  __tablename__ = 'posts'
  id = Column(UUID(as_uuid=True), primary_key=True, nullable=False, default=uuid4)
  created_at = Column(DateTime(timezone=True), default=func.now())
  updated_at = Column(DateTime(timezone=True), default=func.now(),onupdate=func.now())
  author_id = Column(UUID(as_uuid=True), ForeignKey('users.id'), nullable=False)
  content = Column(String, nullable=False)
  title = Column(String, nullable=False)

  author = relationship('User', back_populates='posts')


  def as_dict(self):
    post_dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
    post_dict['author'] = self.author.username
    return post_dict
