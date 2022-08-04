import sqlite3
con = sqlite3.connect('./back/db.sqlite3')
cur = con.cursor()

# Insert a row of data
#                         # country
cur.execute("INSERT INTO base_Country VALUES (1,'israel')")
cur.execute("INSERT INTO base_Country VALUES (2,'germany')")
cur.execute("INSERT INTO base_Country VALUES (3,'switzerland')")

#                         # airline
# cur.execute("INSERT INTO base_airlinecompany VALUES ('el-al',1, 1,1)")
# cur.execute("INSERT INTO base_airlinecompany VALUES ('luftanza',2, 2,2)")
# cur.execute("INSERT INTO base_airlinecompany VALUES ('swiss-air',3, 3,3)")

#                         # flight
# cur.execute("INSERT INTO base_flight VALUES ('2006-10-25 14:30',6,1,2,1,1, '2006-10-25 14:55')")
# cur.execute("INSERT INTO base_flight VALUES ('2006-10-27 8:30',10,2,3,2,2, '2006-10-28 11:30')")
# cur.execute("INSERT INTO base_flight VALUES ('2006-10-25 5:30',15,3,1,3,3, '2006-10-25 9:00')")


#                         # CustomerProfile
# cur.execute("INSERT INTO base_CustomerProfile VALUES (1,'dereh hamacabim',4580546456, 1,054557876)")
# cur.execute("INSERT INTO base_CustomerProfile VALUES (2,'rehov hayesod', 458096515,2,05246743)")
# cur.execute("INSERT INTO base_CustomerProfile VALUES (3,'amnon 16',45803467893,3,057821356)")


# #                         # Ticket
# cur.execute("INSERT INTO base_Ticket VALUES (1,1,1)")
# cur.execute("INSERT INTO base_Ticket VALUES (2,2,2)")
# cur.execute("INSERT INTO base_Ticket VALUES (3,3,3)")
print('inserted')



    # save
con.commit()
con.close()

#       DB queries - checking all is connected and working properly
#                    which data i want to display
#                    make queries-using sql to check data is comming back
# use sql docfile,project instructions stored proc. and functions


# display all from table, ordered by coloum
# for row in cur.execute('SELECT * FROM base_CustomerProfile ORDER BY address'):
#     print(row)
# for row in cur.execute('SELECT * FROM base_flight ORDER BY landing_time'):
#     print(row)

# display all from table, filter by name
# for row in cur.execute('SELECT * FROM base_airline where airline_name="luftanza"'):
#     print(row)

# display 2 fields from 2 tables by joining
# for row in cur.execute('SELECT ticket_id,landing_time FROM base_ticket \
#                        inner join base_flight on base_ticket.flight_id = base_flight.flight_id'):
#     print(row)

# i want to display...the flights of luftanza (join flight and airline)
# for row in cur.execute('\
#     SELECT airline_name,remaining_tickets FROM base_flight \
#                        inner join base_airline on base_airline.airline_id = base_flight.airline_id\
#                            '):
#     print(row)
    
    
# i want to display... user credit card(join )
# for row in cur.execute('\
#     SELECT address FROM base_customerprofile \
#                     inner join base_customerprofile on base_customerprofile.user_id = auth_user.id   \
#                            '):
#     print(row)

# i want to display... user airline(join)
# for row in cur.execute('\
#     SELECT * FROM base_airline \
#                     inner join auth_user on base_airline.user_id = auth_user.id   \
#                            '):
#     print(row)
