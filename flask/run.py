#!/usr/bin/env python3

from app import create_app
from flask_mongoengine import MongoEngine 

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0')

