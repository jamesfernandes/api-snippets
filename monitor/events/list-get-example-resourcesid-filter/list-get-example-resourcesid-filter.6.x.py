# Download the Python helper library from twilio.com/docs/python/install
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/user/account
account_sid = "ACCOUNT_SID"
auth_token = "your_auth_token"
client = Client(account_sid, auth_token)

events = client.monitor.events.list(
    resource_sid="PN4aa51b930717ea83c91971b86d99018f"
)

for e in events:
    print(e.description)
