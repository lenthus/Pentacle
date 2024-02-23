from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Email
from app.models import db
from flask import request

email_routes = Blueprint('emails', __name__)

@email_routes.route('/user/<int:userId>')
# @login_required
def emails(userId):
    """
    Query for all habits and returns them in a list of habit dictionaries
    """
    emails = Email.query.filter(Email.user_id == userId)
    return {'emails': [email.to_dict() for email in emails]}


@email_routes.route('/<int:id>')
@login_required
def email(id):
    """
    Query for a email by id and returns that email in a dictionary
    """
    email = Email.query.get(id)
    return email.to_dict()

@email_routes.route('/<int:id>', methods={"PATCH"})
# @login_required
def email_update(id):
    """
    Patch a email
    """
    email = Email.query.get(id)
    title = request.json['title']
    user_id = request.json['user_id']
    body = request.json['body']
    group = request.json['group']
    completed = request.json['completed']
    contacts = request.json['contacts']

    email.title = title
    email.user_id = user_id
    email.id = id
    email.body = body
    email.group = group
    email.completed = completed
    email.contacts = contacts

    db.session.commit()
    return email.to_dict()

@email_routes.route('/', methods=["POST"])
# @login_required
def email_Create():
    """
    Post a email
    """
    email = request.json
    title = email['title']
    user_id = email['user_id']
    body = request.json['body']
    group = request.json['group']
    completed = request.json['completed']
    contacts = request.json['contacts']
    new_email = Email(title = title, user_id = user_id, body = body, completed = completed, contacts = contacts, group = group)

    db.session.add(new_email)
    db.session.commit()
    return request.json

@email_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def email_delete(id):
    """
    Query for a email by id and returns that email in a dictionary
    """
    email = Email.query.get(id)

    db.session.delete(email)
    db.session.commit()

    return email.to_dict()
