from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .members import members

class Contact(db.Model):
    __tablename__ = 'contacts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer(), primary_key = True)
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    firstname = db.Column(db.String(255))
    lastname = db.Column(db.String(255))
    email_address = db.Column(db.String(255), nullable = False)
    # group = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("groups.id")))

    # user = relationship("User", back_populates="users")
    user = relationship("User", back_populates="contact")

    groups = db.relationship("Group",secondary=members, back_populates = 'contacts')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email_address': self.email_address,
            'groups':[group.to_dict() for group in self.groups]
        }
