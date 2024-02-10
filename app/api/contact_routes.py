from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Contact
from app.models import db
from flask import request
from app.models import Group

contact_routes = Blueprint('contacts', __name__)


@contact_routes.route('/user/<int:userId>')
# @login_required
def contacts(userId):
    """
    Query for all habits and returns them in a list of habit dictionaries
    """
    contacts = Contact.query.filter(Contact.user_id == userId)
    print("Line 26 of Contacts Model",contacts)
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
    groups = request.json['groups']

    contact.firstname = firstname
    contact.lastname = lastname
    contact.email_address = email_address
    # contact.groups = groups
    contact.id = id

    db.session.commit()
    new_group=Group.query.get(groups)
    contact.groups.append(new_group)
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
    groups = contact['groups']
    user_id = contact['user_id']

    new_contact = Contact(firstname = firstname, lastname = lastname, email_address = email_address, user_id = user_id)

    db.session.add(new_contact)
    db.session.commit()
    newer_contact = Contact.query.filter(Contact.user_id == user_id, Contact.email_address == email_address).first()
    new_group = Group.query.get(groups)
    newer_contact.groups.append(new_group)
    db.session.add(newer_contact)
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
