from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import History

history_routes = Blueprint('historys', __name__)


@history_routes.route('/')
# @login_required
def historys():
    """
    Query for all Historys and returns them in a list of history dictionaries
    """
    historys = History.query.all()
    return {'Historys': [historys.to_dict() for history in historys]}


@history_routes.route('/<int:id>')
@login_required
def history(id):
    """
    Query for a history by id and returns that history in a dictionary
    """
    history = History.query.get(id)
    return history.to_dict()
