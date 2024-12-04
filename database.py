from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["crowdsecure"]
collection = db["reports"]

def add_report(data):
    collection.insert_one(data)

def get_reports():
    return list(collection.find({}, {"_id": 0}))
