# DataBase-Mangement-System-Project

## Entities and Attributes

1. **User**
- User ID (Primary key)
- First name
- Last name
- Email address
- Password
- Phone number
- Profile picture
- IsHost status (boolean: yes/no)
- Reviews (total number)
- Listing ID (foreign key to Listing entity)
- IsVerification  (e.g., email, phone number, government ID)

<b>WE have to create a new table of payment methord and add a foreign key odf that payment methord table</b>
- Payment information (e.g., credit card details)



2. **Listing**
- Listing ID (Primary key)
- Title
- Description
- Number of guests
- Number of bedrooms
- Number of beds
- Number of bathrooms
- Price per night
- city
- state
- country
- Postal code
- Latitude
- Longitude
- Address line 1
- Address line 2
- is_Available (boolean)
- Host ID (foreign key to User entity)

<b>New table House rules Foreign key here</b>
- House rules (e.g., no smoking, no pets, etc.)         
         
<b>New table of multiple choices describing the type of the table</b>
- Type of property (e.g., apartment, house, villa, etc.)

<b>this will be the Amenities table an d we will apply the foreign here</b>
         
- Amenities (e.g., Wi-Fi, kitchen, pool, etc.)

3. **Booking**
- Booking ID (Primary key)
- start date
- end date
- Number of guests
- Total price
- Listing ID (foreign key to Listing entity)
- Guest ID (foreign key to User entity)

4. **Review**
- Review ID (Primary key)
- Rating (out of 5)
- Comment
- Listing ID (foreign key to Listing entity)
- Guest ID (foreign key to User entity)
- Host ID (foreign key to User entity)

5. **Message**
- Message ID (Primary key)
- Sender ID (foreign key to User entity) (User ID)
- Receiver ID (foreign key to User entity) (User ID)
- Message content
- Timestamp

6. **Payment**
- Payment ID (Primary key)
- Amount
- Date
- Booking ID (foreign key to Booking entity)

<b>WE have to create a new table of payment methord and add a foreign key odf that payment methord table</b>
- Payment method (e.g., credit card, PayPal, etc.)




7. **Wish List**
- Wish List ID (Primary key)
- User ID (foreign key to User entity)
- Listing ID (foreign key to Listing entity)

8. **Neighborhood**
- Neighborhood ID (Primary key)
- Neighborhood name
- City
- State
- Country
- Listings (foreign key to Listing entity)

9. **Notification**
- Notification ID (Primary key)
- User ID (foreign key to User entity)
- Message
- Timestamp

10. **Language**
- Language ID (Primary key)
- Language name
- Listing ID (foreign key to Listing entity)




## ER Diagram
```
         +-----------------+        +------------------+         
         |       User      |        |     Listing      |         
         +-----------------+        +------------------+         
         |  User_ID (PK)   |        |  Listing_ID (PK) |         
         |  First_Name     |        |  Title           |         
         |  Last_Name      |        |  Description     |         
         |  Email_Address  |        |  Property_Type   |         
         |  Password       |        |  Guests          |         
         |  Phone_Number   |        |  Bedrooms        |         
         |  Profile_Pic    |        |  Beds            |         
         |  Verification   |        |  Bathrooms       |         
         |  Payment_Info   |        |  Price_Per_Night |         
         |  Host_Status    |        |  Location        |         
         |  Superhost      |        |  Address         |         
         |  Reviews        |        |  Amenities       |         
         |  Listings (FK)  |        |  House_Rules     |         
         +-----------------+        |  Calendar        |         
               |     |              |  Host_ID (FK)    |         
               |     +--------------+------------------+
               |                                         |
               |                                         |
+------------------+                            +----------------+
|    Booking       |                            |    Review      |
+------------------+                            +----------------+
|   Booking_ID (PK)|                            |   Review_ID(PK)|
|   Check_In_Date  |                            |   Rating       |
|   Check_Out_Date |                            |   Comment      |
|   Guests         |                            |   Listing_ID(FK)|
|   Total_Cost     |                            |   Guest_ID(FK) |
|   Listing_ID(FK) |                            |   Host_ID(FK)  |
|   Guest_ID(FK)   |                                       |
|                  |                                       |
+------------------+                                       |
            |                                               |
            |                                               |
+-----------------+                                 +-----------------+
|    Message      |                                 |    Payment      |
+-----------------+                                 +-----------------+
|   Message_ID(PK)|                                 |   Payment_ID(PK)|
|   Sender_ID(FK) |                                 |   Amount        |
|   Receiver_ID(FK)|                                 |   Date          |
|   Message       |                                 |   Payment_Method|
|   Timestamp     |                                 |   Booking_ID(FK)|
+-----------------+                                 +-----------------+
          |                                                       
          |                                                       
+-----------------+                                                        
|    Wish List    |                                                     
+-----------------+                                                        
|  Wish_List_ID(PK)|                                                       
|  User_ID (FK)    |                                                       
|  Listing_ID(FK)  |                                                       
+-----------------+                                                     

+-----------------+
|   Neighborhood  |
+-----------------+
|  Neighborhood_ID|
|  Neighborhood   |
|  City           |
|  State          |
|  Country        |
|  Listings (FK)  |
+-----------------+

+-----------------+
|  Notification   |
+-----------------+
|  Notification_ID|
|  User_ID (FK)   |
|  Notification   |
|  Timestamp      |
+-----------------+

+-----------------+
|     Language    |
+-----------------+
|   Language_ID   |
|   Language_name |
|   Listings (FK) |
+-----------------+

```