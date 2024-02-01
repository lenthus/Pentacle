from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Email

email_routes = Blueprint('emails', __name__)


@email_routes.route('/')
# @login_required
def emails():
    """
    Query for all Emails and returns them in a list of email dictionaries
    """
    emails = Email.query.all()
    return {'Emails': [emails.to_dict() for email in emails]}


@email_routes.route('/<int:id>')
@login_required
def email(id):
    """
    Query for a email by id and returns that email in a dictionary
    """
    email = Email.query.get(id)
    return email.to_dict()
