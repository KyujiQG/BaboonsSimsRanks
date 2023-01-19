import requests
import csv
from bs4 import BeautifulSoup

url = "https://www.raidbots.com/simbot/report/gfYLYubP7zSheQ3BRhQ2qm"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

dps = soup.find("h2", class_="Heading").text

with open("dps.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["DPS"])
    writer.writerow([dps])

print(f'Data has been written to dps.csv')