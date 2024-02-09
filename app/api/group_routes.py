from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Group

group_routes = Blueprint('groups', __name__)


@group_routes.route('/')
# @login_required
def groups():
    """
    Query for all Groups and returns them in a list of group dictionaries
    """
    groups = Group.query.all()
    return {'Groups': [groups.to_dict() for group in groups]}


@group_routes.route('/<int:id>')
@login_required
def group(id):
    """
    Query for a group by id and returns that group in a dictionary
    """
    group = Group.query.get(id)
    return group.to_dict()
