import os
from flask import Flask, render_template
from flask_wtf import CSRFProtect
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
csrf = CSRFProtect(app)

from routes import *

if __name__ == '__main__':
    if os.environ.get('FLASK_ENV') == 'production':
        app.run(host='0.0.0.0', port=80)
    else:
        app.run(debug=True)