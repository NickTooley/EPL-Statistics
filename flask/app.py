import os

from flask import Flask
from flask_mongoengine import MongoEngine
from datetime import datetime
from mongo import init_data

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config['MONGODB_HOST'] = 'mongodb://localhost:27017/premierleague'

    from mongo import mdb
    mdb.init_app(app)
    init_data('static/premdata.csv')

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    import teams
    app.register_blueprint(teams.bp)

    def obj_to_dict(obj):
        return obj.to_mongo()

    app.jinja_env.globals.update(obj_to_dict=obj_to_dict)

    return app
    
