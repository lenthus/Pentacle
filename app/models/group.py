from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .members import members

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}



    id = db.Column(db.Integer(), primary_key = True)
    name = db.Column(db.String(255))
    user_id = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")), nullable = False)
    # contacts = db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("contacts.id")), nullable = False)


    # user = relationship("User", back_populates="users")
    user = relationship("User", back_populates="group")
    
    contacts = relationship("Contact",
                            secondary=members,
                            back_populates = 'groups')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            # 'contacts':self.contacts,
        }
