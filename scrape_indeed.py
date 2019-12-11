
# coding: utf-8

# In[1]:


# Dependencies
# from splinter import Browser
from bs4 import BeautifulSoup as bs
# import requests
import pymongo
import pandas as pd
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
# In[2]:


# Initialize PyMongo to work with MongoDBs
# prod_conn = 'mongodb://heroku_pxmzqrg2:dpp5l24mlb4lqetj4q96d62cjb@ds339968.mlab.com:39968/heroku_pxmzqrg2?retryWrites=false'
# local_conn = 'mongodb://localhost:27017'
# client = pymongo.MongoClient(prod_conn)


# In[3]:


# Define database and collection
# db = client.heroku_pxmzqrg2
# collection = db.listing_summary


# In[16]:
#  "CHROMEDRIVER_PATH" : "/app/.chromedriver/bin/chromedriver"
#  "GOOGLE_CHROME_BIN" : "/app/.apt/usr/bin/google-chrome"    
options = Options()

# options.binary_location = os.environ.get('GOOGLE_CHROME_BIN')

options.add_argument('--headless')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')

browser = webdriver.Chrome(executable_path=str(os.environ.get('CHROMEDRIVER_PATH')), chrome_options=options)

# #trying Splinter
# def init_browser():
#     executable_path = {"executable_path": "CHROMEDRIVER_PATH"}
#     # executable_path = {"executable_path": "chromedriver"}
#     return Browser('chrome', **executable_path, headless=False)
    # options = Options()
    # options.add_argument('--headless')
    # options.add_argument('--disable-gpu')
    # options.add_argument('--no-sandbox')
    # return webdriver.Chrome(executable_path="chromedriver.exe", chrome_options=options)
# In[27]:

def scrape_info():
    # titles = ['Data Engineer', 'Business Analyst','Software Engineer']
    titles = ['Data Engineer'] # for testing
    postings = []
    
    for title in titles:
        # browser = init_browser()
        url = 'https://www.indeed.com/jobs?q={}&l='.format(title)
        browser.get(url)  # When using selenium
        # browser.visit(url)  # When using splinter
        time.sleep(10)
        # browser.is_text_present('Indeed', wait_time=10)
        

        html = browser.page_source    # When using selenium
        # html = browser.html             # When using splinter
        soup = bs(html, 'html.parser')

        jobs = soup.find('div', id="refineresults")

        try:
            # Salary Data
            salary = jobs.find('div', id='SALARY_rbo')
            #loop through and make objects into strings
            salarieslist = salary.find_all('span', class_='rbLabel')
            salarieslist = [x.text for x in salarieslist]
             #loop through and make objects into strings
            salariescount = salary.find_all('span', class_='rbCount')
            salariescount = [x.text for x in salariescount]

            # Job Data
            jobtype = jobs.find('div',id='JOB_TYPE_rbo')
            jobtypelist = jobtype.find_all('span',class_='rbLabel')
            jobtypelist = [x.text for x in jobtypelist]
            jobtypecount = jobtype.find_all('span',class_='rbCount')
            jobtypecount = [x.text for x in jobtypecount]

            # Location Data
            location = jobs.find('div',id='LOCATION_rbo')
            locationlist = location.find_all('span',class_='rbLabel')
            locationlist = [x.text for x in locationlist]
            locationcount = location.find_all('span',class_='rbCount')
            locationcount = [x.text for x in locationcount]

            # Company Data
            company = jobs.find('div',id='COMPANY_rbo')
            companylist = company.find_all('span',class_='rbLabel')
            companylist = [x.text for x in companylist]
            companycount = company.find_all('span',class_='rbCount')
            companycount = [x.text for x in companycount]

            # Experience Data
            experience = jobs.find('div',id='EXP_LVL_rbo')
            experiencelist = experience.find_all('span',class_='rbLabel')
            experiencelist = [x.text for x in experiencelist]
            experiencecount = experience.find_all('span',class_='rbCount')
            experiencecount = [x.text for x in experiencecount]

            # Run only if title, price, and link are available
            if (salary and jobtype and location and company and experience):
            # Print results
#                 print('-------------')
#                 print(salarieslist)
#                 print(salariescount)
#                 print(jobtypelist)
#                 print(jobtypecount)
#                 print(locationlist)
#                 print(locationcount)
#                 print(companylist)
#                 print(companycount)
#                 print(experiencelist)
#                 print(experiencecount)

            # Dictionary to be inserted as a MongoDB document
                post ={
                   'title': title,
                   'company': companylist,
                    'company_count':companycount,
                   'salary': salarieslist,
                    'salary_count': salariescount,
                    'location': locationlist,
                    'location_count': locationcount,
                    'jobtype':jobtypelist,
                    'jobtype_count': jobtypecount,
                    'experience_level': experiencelist,
                    'experience_count':experiencecount
                    }
                postings.append(post)
            
        except Exception as e:
            print("{}: {}".format(type(e), str(e)))
        
        #close browser after scraping
        browser.quit()
        
    return postings


# In[28]:




