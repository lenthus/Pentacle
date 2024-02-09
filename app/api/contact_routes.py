from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Contact
from app.models import db
from flask import request

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

@contact_routes.route('/<int:id>', methods={"PATCH"})
# @login_required
def contact_update(id):
    """
    Patch a contact
    """
    contact = Contact.query.get(id)
    firstname = request.json['firstname']
    lastname = request.json['lastname']
    email_address = request.json['email_address']
    group = request.json['group']


    contact.firstname = firstname
    contact.lastname = lastname
    contact.email_address = email_address
    contact.group = group
    contact.id = id

    db.session.commit()
    return contact.to_dict()

@contact_routes.route('/', methods=["POST"])
# @login_required
def contact_Create():
    """
    Post a contact
    """
    contact = request.json
    firstname = contact['firstname']
    lastname = contact['lastname']
    email_address = contact['email_address']
    group = contact['group']
    user_id = contact['user_id']

    new_contact = Contact(firstname = firstname, lastname = lastname, email_address = email_address, group = group, user_id = user_id)

    db.session.add(new_contact)
    db.session.commit()
    return request.json

@contact_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def contact_delete(id):
    """
    Query for a contact by id and returns that contact in a dictionary
    """
    contact = Contact.query.get(id)

    db.session.delete(contact)
    db.session.commit()

    return contact.to_dict()
