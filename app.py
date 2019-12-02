from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import scrape_indeed
import csv

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
# mongo = PyMongo(app, uri="mongodb://heroku_pxmzqrg2:dpp5l24mlb4lqetj4q96d62cjb@ds339968.mlab.com:39968/heroku_pxmzqrg2?retryWrites=false")
mongo = PyMongo(app, uri="mongodb://localhost:27017/indeed_app")

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    postings = mongo.db.collection.find_one()

    # Return template and data
    return render_template("index.html", data=postings)

@app.route("/dundar")
def dundar():
    """Dundar"""
    return render_template("dundar/dundar.html")

@app.route("/jadd")
def jadd():
    """Jadd"""
    return render_template("jadd/jadd.html")

@app.route("/thuria")
def thuria():
    """Thuria"""
    return render_template("thuria/thuria.html")

# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():

    # Run the scrape function
    scraping_data = scrape_indeed.scrape_info()

    # Update the Mongo database using update and upsert=True
    mongo.db.collection.insert(scraping_data)

    # for data in scraping_data:
    #     print(data["location"])
    titles = []
    locations = []
    metadata = {}
    for data in scraping_data:
        titles.append(data["title"])
        locations.append(data["location"])
    
    metadata["title"] = titles
    metadata["location"] = locations

    print(metadata)
    # return jsonify(metadata)
    # Redirect back to home page
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)