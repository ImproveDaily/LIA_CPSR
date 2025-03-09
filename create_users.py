import requests
import json

# Maak standaard gebruiker aan
response = requests.post(
    'http://localhost:3000/api/users',
    headers={'Content-Type': 'application/json'},
    json={
        'username': 'lia123',
        'password': 'lia123',
        'role': 'user'
    }
)
print('Standaard gebruiker:', response.status_code, response.text)

# Maak admin gebruiker aan
response = requests.post(
    'http://localhost:3000/api/users',
    headers={'Content-Type': 'application/json'},
    json={
        'username': 'admin',
        'password': 'liawowadmin',
        'role': 'admin'
    }
)
print('Admin gebruiker:', response.status_code, response.text) 