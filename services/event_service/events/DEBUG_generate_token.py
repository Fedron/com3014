"""
NOTE:
This code is intended solely for debugging purposes.
The database has been pre-populated with two test users: 
    - test_user_00
    - test_user_01

To test and debug, please use Postman.
Please note that the authentication token expires after one hour.
"""


import jwt
from datetime import datetime, timedelta

# Replace with your own secret key; this should match your Django settings SECRET_KEY for testing
SECRET_KEY = 'django-insecure-sad4tt7_2w!+y69x-(2*e*b-%^uiv3npux-$6ac-0!lwhks5)*'
ALGORITHM = "HS256"

# Define the payload following your token structure
payload = {
    "sub": "test_user_00",  # This is the user identifier (or use test_user_01 as needed)
    "exp": datetime.utcnow() + timedelta(hours=1),  # Token expires in 1 hour
    "roles": [["community_01", "member"]]  # Example roles array
}

# Generate the token
token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
print("Your JWT token:", token)
