from flask_mongoengine import MongoEngine
from datetime import datetime

mdb = MongoEngine()

class User(mdb.Document):
    username = mdb.StringField(required=True)
    password = mdb.StringField(required=True)
    meta = {
        'collection': 'users',
    }

class Data(mdb.Document):
    pass

class Post(mdb.Document):
    postid = mdb.SequenceField()
    title = mdb.StringField(max_length=120, required=True)
    author = mdb.StringField(max_length=None)
    created = mdb.DateTimeField(default=datetime.now, required=True)
    body = mdb.StringField(max_length=None, required=True)
    meta = {
        'collection': 'posts',
        'ordering': 'created',
        'auto_create_index': True,
    }


