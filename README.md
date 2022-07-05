# this project is about, and it does

## i have made it, i am
## i have used this technologies, web-frameworks, their main purpose is (copy requirements)
## project profile
charts/models



## Todo:
charts/models
which data i want to display
make queries-using sql to check data is comming back
make sure they are connected
examine models: sketch on paper, write sql queries

create models (_set is join from 27.6 lesson)




### To remember-
unqiue field model = CharField(unique=True, null=True, blank=True)

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


## End-points (urls)

## Testing
thunder client
terminal
inspect