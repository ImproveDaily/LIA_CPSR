import requests
import json

def test_login(username, password):
    url = 'http://localhost:3000/api/auth/login'
    headers = {'Content-Type': 'application/json'}
    data = {
        'username': username,
        'password': password
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        print(f'Status code: {response.status_code}')
        print('Response:', json.dumps(response.json(), indent=2))
        return response.json()
    except Exception as e:
        print(f'Error: {str(e)}')
        return None

# Test admin login
print('\nTesting admin login:')
test_login('admin', 'Admin123!')

# Test normale gebruiker login
print('\nTesting normale gebruiker login:')
test_login('gebruiker', 'Gebruiker123!')

# Test met verkeerde credentials
print('\nTesting verkeerde credentials:')
test_login('admin', 'verkeerd_wachtwoord') 