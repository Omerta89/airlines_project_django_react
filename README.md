# this project is about, and it does

## i have made it, i am
## i have used this technologies, web-frameworks, their main purpose is (copy requirements)

## project profile
- models:create,insert mock data file,query
- update/upgrade requirements file and install
-   crud:
- signup/adduser-check
- login-check
- get airline info for user
- add profile to user
- addairlineforuser - connect new airline to user. unique - only one user for an airliner company
- get all user customerprofile info - not working
- get all users - restricted to admin


## Todo:
crud- get all airline info (general)
seriliazer

## End-points (urls)
http://127.0.0.1:8000/adduser/ - post add user
http://127.0.0.1:8000/token/ - post login (return token)
http://127.0.0.1:8000/addprofile/ - post add profile to user
http://127.0.0.1:8000/airline/ - get all user airline info
http://127.0.0.1:8000/addairlineforuser/ - connect airline to user
http://127.0.0.1:8000/cusprofile// - get all user customerprofile info - not working
http://127.0.0.1:8000/getallusers/ - get all users - restricted to admin

### To remember-
profile the back-side of project, write it, profile front
module unit test
py-doc
write sql queries using sqlite3 shell extension or sql studio in google 
create logs and analyze with tools
module for react that give comp effects upon entry
commit versions to keep track


models original text: (add not null constraint where needed)

-Flights
Id: bigint (PK) (AI)
Airline Company_Id: bigint (FK)
Origin_Country_ld: int (FK)
Destination_Country_Id : int (FK)
Departure Time: datetime
Landing Time: datetime
Remaining_Tickets : int

-Airline Companies
Id: bigint (PK) (AI)
Name: text (U)
Country_Id: int (FK)
User_Id: bigint (U) (FK)

=Users
Id: bigint (PK) (AI)
Username: text (U)
Password: text
Email: text (U)
User_Role: int (FK)

-Countries
Id: int (PK) (Al)
Name: text (U)

Tickets - (UniqueConstraint(fields=['room', 'date'], name='unique_booking'))
Id: bigint (PK) (AI)
Flight Id: bigint (FK) }    (U) - its unique together with cust_id
Customer_Id: bigint (FK) } 

-Customers
Id: bigint (PK) (AI)
First Name: text
Last Name: text
Address: text
Phone No: text (U)
Credit Card No: text (U)
User_Id: bigint (U) (FK)

=User_Roles
Id: int (PK) (AI)
Role Name : text (U)

=Adminstrators
Id: int (PK) (AI)
First Name: text
Last Name: text
User_Id: bigint (U) (FK)

## Testing
thunder client
terminal
inspect