from flask import Flask, render_template, session, request, url_for, redirect, flash
import os
app = Flask(__name__)
app.secret_key = os.urandom(32)               #generates random 32-bit secret_key


@app.route("/", methods = ["GET", "POST"])                               #root route, redirects to home if logged in, loads login page if not
def home():
    return render_template("home.html")

@app.route("/experience", methods = ["GET", "POST"])
def experience():
    return render_template("experience.html")

@app.route("/skills", methods = ["GET", "POST"])
def skills():
    return render_template("skills.html")

@app.route("/projects", methods = ["GET", "POST"])
def projects():
    return render_template("projects.html")

@app.route("/education", methods = ["GET", "POST"])
def education():
    return render_template("education.html")

@app.route("/resume", methods = ["GET", "POST"])
def resume():
    return render_template("resume.html")

@app.route("/feedback", methods = ["GET", "POST"])
def feedback():
    return render_template("feedback.html")


if __name__ == "__main__":
    app.debug = True
    app.run()