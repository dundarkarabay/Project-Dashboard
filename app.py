from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import scrape_indeed
import csv
import os
import pymongo

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://dundarkarabay:12Subat07@cluster0-shard-00-00-7agox.mongodb.net:27017,cluster0-shard-00-01-7agox.mongodb.net:27017,cluster0-shard-00-02-7agox.mongodb.net:27017/job_relocation?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")

# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    return render_template("index.html")

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
    try:
        # Run the scrape function
        scraping_data = scrape_indeed.scrape_info()
        dictionary = {"Scraped Data" : scraping_data}

        # Update the Mongo database using update and upsert=True
        # mongo.db.collection.insert(scraping_data)
        mongo.db.collection.update({}, dictionary, upsert=True)

        # Redirect back to home page
        return render_template("index.html", notification="Scraping has been succesfully exacuted and the results have been saved into Atlas mongoDB! Please visit our visualization pages using the navbar.")
    except Exception as e:
        errorMessage = {}
        errorMessage["Message"] = "Please go back to the homepage and keep trying until scraping is successfully executed!"
        return jsonify(errorMessage)

myclient = pymongo.MongoClient("mongodb://dundarkarabay:12Subat07@cluster0-shard-00-00-7agox.mongodb.net:27017,cluster0-shard-00-01-7agox.mongodb.net:27017,cluster0-shard-00-02-7agox.mongodb.net:27017/job_relocation?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")
mydb = myclient["job_relocation"]
mycol = mydb["collection"]
for doc in mycol.find():
    dictionary2 = doc
output = {"Scraped Data" : dictionary2["Scraped Data"]}

@app.route("/job_distribution_data")
def job_distribution_data():
    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True)
