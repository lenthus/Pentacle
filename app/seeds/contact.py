from app.models import db, Contact, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo contact, you can add other contacts here if you want
def seed_contacts():
    cont1 = Contact(
        userId=1, email_address='test.io', firstname='testMan', lastname='tester')
    cont2 = Contact(
         userId=2, email_address='test2.io', firstname='testMan2', lastname='tester2')
    cont3 = Contact(
         userId=3, email_address='test3.io', firstname='testMan3', lastname='tester3')

    db.session.add(cont1)
    db.session.add(cont2)
    db.session.add(cont3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the contacts table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_contacts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.contacts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM contacts"))

    db.session.commit()
