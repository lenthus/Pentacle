from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Image
from app.models import db
from flask import request

image_routes = Blueprint('images', __name__)


# @image_routes.route('/')
# # @login_required
# def images():
#     """
#     Query for all Images and returns them in a list of image dictionaries
#     """
#     images = Image.query.all()
#     return {'Images': [images.to_dict() for image in images]}

@image_routes.route('/user/<int:userId>')
# @login_required
def images(userId):
    """
    Query for all images and returns them in a list of image dictionaries
    """
    images = Image.query.filter(Image.user_id == userId)
    return {'images': [image.to_dict() for image in images]}



@image_routes.route('/<int:id>')
@login_required
def image(id):
    """
    Query for a image by id and returns that image in a dictionary
    """
    image = Image.query.get(id)
    return image.to_dict()

@image_routes.route('/', methods=["POST"])
# @login_required
def image_Create():
    """
    Post a image
    """
    image = request.json
    url = image['url']
    user_id = image['user_id']

    new_image = Image(url = url, user_id = user_id)

    db.session.add(new_image)
    db.session.commit()

    return new_image.to_dict()

@image_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def image_delete(id):
    """
    Query for a image by id and returns that image in a dictionary
    """
    image = Image.query.get(id)

    db.session.delete(image)
    db.session.commit()

    return image.to_dict()
