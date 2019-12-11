from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import scrape_indeed
import csv
import os
# from datetime import datetime
# now = datetime.now()
# current_time = now. strftime("%D/%H/%M/%S")
# db_name = f"job/app/{current_time}"
# db_name = db_name.replace("/", "_")
# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri=f"mongodb://dundarkarabay:12Subat07@cluster0-shard-00-00-7agox.mongodb.net:27017,cluster0-shard-00-01-7agox.mongodb.net:27017,cluster0-shard-00-02-7agox.mongodb.net:27017/job_relocation?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority")

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
    try:
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

        # print(metadata)
        # return jsonify(metadata)
        # Redirect back to home page
        return redirect("/")
    except Exception as e:
        errorMessage = {}
        errorMessage["Message"] = "Please go back to the homepage and keep trying until scraping is successfully executed!"
        return jsonify(errorMessage)


if __name__ == "__main__":
    app.run(debug=True)
