Steps to run the programme:
1: Download the folder
2: Navigate to that folder through cmd/terminal and type npm install
Note(you must have installed node in your computer. To check if you have node programme in your system or not
type command node -v. If error occurs ,Please Install Node first (https://nodejs.org/en/) )
3: Create a database named as "truecaller" in your mysql workbench
4: Open db/sequelize.js and change "root"(default) to your user name(if any)
5: Open .env file and change "DB_PASS" value to your database password

6: Run node src/index.js or npm start

These API works on Postman. So, again if you don't have postman inside your computer : https://www.postman.com/downloads/

To create user
localhost:3000/users/register
@params : name(required),phone_no(required),password(required),mail(optional)

To login 
url : localhost:3000/users/signin
@params : phone_no(required),password(required)

To View your profile
url : localhost:3000/users/me
@params : auth_token(required)

To Find other users
url : localhost:3000/users/find?mail=... or localhost:3000/users/find?phone_no=...
@params : auth_token(required), mail/phone_no (required)

To update your profile
url : localhost:3000/users/me/update
@params : auth_token(required),field to update (name,mail,password,contact_list)

To mark other user spam
url : localhost:3000/users/markSpam
@params : auth_token(required),number(required)

To Logout
url : localhost:3000/users/logout
@params : auth_token(required)

To delete the user
url : localhost:3000/users/delete
@params : auth_token(required)
