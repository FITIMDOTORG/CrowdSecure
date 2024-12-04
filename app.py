from flask import Flask, request, jsonify
from database import add_report, get_reports
from ai_model import analyze_threat

app = Flask(__name__)

@app.route('/report', methods=['POST'])
def report_threat():
    data = request.json
    analysis = analyze_threat(data['description'])
    data['analysis'] = analysis
    add_report(data)
    return jsonify({"message": "Report submitted successfully", "analysis": analysis})

@app.route('/reports', methods=['GET'])
def fetch_reports():
    reports = get_reports()
    return jsonify(reports)

if __name__ == '__main__':
    app.run(debug=True)
