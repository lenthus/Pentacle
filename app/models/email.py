from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Email(db.Model):
    __tablename__ = 'emails'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    title = db.Column(db.String(255), nullable = False)
    sub_title = db.Column(db.String(255), nullable = False)
    banner = db.Column(db.String(), nullable = False)
    event = db.Column(db.String(), nullable = False)
    body = db.Column(db.String(), nullable = False)
    address = db.Column(db.String(), nullable = False)
    group = db.Column(db.String(255))
    completed = db.Column(db.Boolean, nullable = False)
    contacts = db.Column(db.String, nullable = False)

    # user = relationship("User", back_populates="users")
    user = relationship("User", back_populates="emails")
    history = relationship("History", back_populates="email")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'sub_title': self.title,
            'body':self.body,
            'address':self.address,
            'group': self.group,
            'completed': self.completed,
            'contacts':self.contacts
        }
