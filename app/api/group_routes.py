from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Group
from app.models import db
from flask import request

group_routes = Blueprint('groups', __name__)

@group_routes.route('/user/<int:userId>')
# @login_required
def groups(userId):
    """
    Query for all habits and returns them in a list of habit dictionaries
    """
    groups = Group.query.filter(Group.user_id == userId)
    return {'groups': [group.to_dict() for group in groups]}


@group_routes.route('/<int:id>')
@login_required
def group(id):
    """
    Query for a group by id and returns that group in a dictionary
    """
    group = Group.query.get(id)
    return group.to_dict()

@group_routes.route('/<int:id>', methods={"PATCH"})
# @login_required
def group_update(id):
    """
    Patch a group
    """
    group = Group.query.get(id)
    name = request.json['name']
    user_id = request.json['user_id']

    group.name = name
    group.user_id = user_id
    group.id = id

    db.session.commit()
    return group.to_dict()

@group_routes.route('/', methods=["POST"])
# @login_required
def group_Create():
    """
    Post a group
    """
    group = request.json
    name = group['name']
    user_id = group['user_id']
    new_group = Group(name = name, user_id = user_id)

    db.session.add(new_group)
    db.session.commit()
    return request.json

@group_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def group_delete(id):
    """
    Query for a group by id and returns that group in a dictionary
    """
    group = Group.query.get(id)

    db.session.delete(group)
    db.session.commit()

    return group.to_dict()
