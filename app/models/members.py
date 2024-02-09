from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Column, ForeignKey, Table

members = Table(
    'members',
    db.Model.metadata,
    Column('contact_id', ForeignKey(add_prefix_for_prod('contacts.id')), primary_key=True),
    Column('group_id', ForeignKey(add_prefix_for_prod('groups.id')), primary_key=True))

if environment == "production":
    members.schema = SCHEMA
