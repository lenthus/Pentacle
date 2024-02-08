from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Contact

contact_routes = Blueprint('contacts', __name__)


# @contact_routes.route('/')
# # @login_required
# def contacts():
#     """
#     Query for all Contacts and returns them in a list of contact dictionaries
#     """
#     contacts = Contact.query.all()
#     return {'Contacts': [contacts.to_dict() for contact in contacts]}

@contact_routes.route('/<int:userId>')
# @login_required
def contacts(userId):
    """
    Query for all habits and returns them in a list of habit dictionaries
    """
    contacts = Contact.query.filter(Contact.user_id == userId)
    return {'contacts': [contact.to_dict() for contact in contacts]}


@contact_routes.route('/<int:id>')
@login_required
def contact(id):
    """
    Query for a contact by id and returns that contact in a dictionary
    """
    contact = Contact.query.get(id)
    return contact.to_dict()
