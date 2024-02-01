from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Image

image_routes = Blueprint('images', __name__)


@image_routes.route('/')
# @login_required
def images():
    """
    Query for all Images and returns them in a list of image dictionaries
    """
    images = Image.query.all()
    return {'Images': [images.to_dict() for image in images]}


@image_routes.route('/<int:id>')
@login_required
def image(id):
    """
    Query for a image by id and returns that image in a dictionary
    """
    image = Image.query.get(id)
    return image.to_dict()
