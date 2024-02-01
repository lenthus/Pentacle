from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

class History(db.Model):
    __tablename__ = 'history'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    email_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("emails.id")), nullable = False)
    sent_date = db.Column(db.Date, nullable = False)

    # user = relationship("User", back_populates="users")
    user = relationship("User", back_populates="history")
    email = relationship("Email", back_populates="history")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'email_id': self.email_id,
            'sent_date':self.sent_date,
        }
