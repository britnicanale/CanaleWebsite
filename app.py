from flask import Flask, render_template, session, request, url_for, redirect, flash
import os
app = Flask(__name__)
app.secret_key = os.urandom(32)               #generates random 32-bit secret_key


@app.route("/")                               #root route, redirects to home if logged in, loads login page if not
def home():
    return render_template("home.html")


if __name__ == "__main__":
    app.debug = True
    app.run()