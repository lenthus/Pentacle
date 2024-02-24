from app.models import db, Email, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo contact, you can add other contacts here if you want
def seed_emails():
    cont1 = Email(
        user_id=1, body='test.io',banner = 'img.url',event = 'img.url',address = '123 here I am st. Bham Wa', contacts = "test@app.io", sub_title = 'sub title', title= "TestEmail 1", completed = False )
    cont2 = Email(
        user_id=1, body='test2.io',banner = 'img.url',event = 'img.url',address = '123 here I am st. Bham Wa', contacts = "test2@app.io",sub_title = "title sub", title= "TestEmail 2", completed = False  )

    db.session.add(cont1)
    db.session.add(cont2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the contacts table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_emails():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.contacts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM contacts"))

    db.session.commit()
