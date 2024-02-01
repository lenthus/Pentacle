from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)

    # user = relationship("User", back_populates="users")
    user = relationship("User", back_populates="history")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
        }
