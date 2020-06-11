# Steps to run the project:

1: Download/Fork the Project

2: Install Dependencies i.e Navigate to the folder through cmd/terminal and type npm install                       
Note(you must have installed node in your computer. To check if you have node installed in your system or not
type command node -v. If error occurs ,Please Install Node first (https://nodejs.org/en/) )


3: Create a database in your mysql workbench and update db/sequelize  **your_db_name to actual database name**


4: Open db/sequelize.js and change "root"(default) to your user name(if any)


5: Open .env file and change "DB_PASS" value to your database password

6: Run node src/index.js or npm start

**Please use postman to access these endpoints as of now, I will update the project to use sessions/localstorage for broswer viewed Endpoints in near future. So, again if you don't have postman installed : https://www.postman.com/downloads/**

# API Endpoints
1: **To create user**

@params : name(required),phone_no(required),password(required),mail(optional)

localhost:3000/users/register

2: **To login**

@params : phone_no(required),password(required)

url : localhost:3000/users/signin

3: **To View your profile**

@params : auth_token(required)

url : localhost:3000/users/me

4: **To Find other users**

@params : auth_token(required), mail/phone_no (required)

url : localhost:3000/users/find?mail=... or localhost:3000/users/find?phone_no=...

5: **To update your profile**

@params : auth_token(required),field to update (name/mail/password/contact_list)

url : localhost:3000/users/me/update

6: **To mark other user spam**

@params : auth_token(required),number(required)

url : localhost:3000/users/markSpam

7: **To Logout**

@params : auth_token(required)

url : localhost:3000/users/logout

8: **To delete the user**

@params : auth_token(required)

url : localhost:3000/users/delete
