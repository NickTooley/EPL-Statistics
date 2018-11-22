import os

from flask import Flask, render_template
from flask_mongoengine import MongoEngine
from datetime import datetime
from mongo import init_data

def page_not_found(e):
    return render_template('404.html'), 404

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config['MONGODB_HOST'] = 'mongodb://localhost:27017/premierleague'

    from mongo import mdb
    mdb.init_app(app)
    init_data('static/premdata.csv')

    @app.errorhandler(404)
    def page_not_found(e):
        # note that we set the 404 status explicitly
        return render_template('404.html'), 404

    @app.errorhandler(500)
    def page_not_found(e):
        # note that we set the 500 status explicitly
        return render_template('500.html'), 500

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
    
