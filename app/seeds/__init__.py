from flask.cli import AppGroup
from .users import seed_users, undo_users
from .contact import seed_contacts, undo_contacts
from .email import seed_emails, undo_emails
from .image import seed_images, undo_images
from .history import seed_history, undo_history

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        # undo_contacts()
    seed_users()
    # seed_contacts()
    seed_images()
    seed_emails()
    seed_history()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # undo_contacts()
    undo_images()
    undo_emails()
    undo_history()
    # Add other undo functions here
