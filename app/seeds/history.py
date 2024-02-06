from app.models import db, History, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

new_date = date.today()

# Adds a demo contact, you can add other contacts here if you want
def seed_history():
    cont1 = History(
        user_id=1, email_id=1, sent_date = new_date,)
    # cont2 = History(
    #      user_id=1, email_id=2, sent_date = new_date,)

    db.session.add(cont1)
    # db.session.add(cont2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the contacts table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_history():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.contacts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM contacts"))

    db.session.commit()
