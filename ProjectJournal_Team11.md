## Team Members

Kena Mehta - 014597648

Puneet Jyot Singh Khurana - 014508208

Sai Krishna Nandikonda - 014597700

Shiva Pandey - 014638338

## Important Links

### Kanban Board:

[**https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team\_11/projects/1**](https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_11/projects/1)

### Github Repo:

[**https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team\_11**](https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_11)

### Weekly Scrum Task Board with Burn Down Chart using Google Task Sheet:

[**https://drive.google.com/file/d/1XW2CEmROQGcKv9mDJ9aM1BUnqllAHMYL/view?usp=sharing**](https://drive.google.com/file/d/1XW2CEmROQGcKv9mDJ9aM1BUnqllAHMYL/view?usp=sharing)

## Work Distribution

| **Components** | **Functionality** | **Responsible member** |
| --- | --- | --- |
| Register/Login | 1.Allow users to register with different roles(Renter,Buyer,Seller,Realtor,Landlord).2.Generate auth token using passport -JWT strategy to authenticate all type of roles 3. Allow the user to login. Note: For Admin default account is created | Shiva |
| Admin Approve/Reject users | 1.Assigned constant status to different user roles 2. Admin can approve/reject/remove existing user. | Puneet |
| Search | 1.Implemented search for all roles based on various attributes(like price, address, beds, bath, year built etc) | Sai |
| Save as Favorites | 1.Save favourite searches and favourite homes for all roles (if they login) | Sai |
| Sell | 1.Upload details of home to be listed 2.You could list multiple homes if you are a realtor(acting on behalf of multiple sellers) 3.Update status or other details of listing(s) 4.Schedule open houses 5.Review buyers&#39; applications and approve/reject 6.Remove listing | Kena |
| Buy | 1.Buyer can click on search property and clicking on a property card will take the user to view property page. 2. Property Details Page 3. Integrated application form with buy now button. 4. Open House information | Puneet |
| Rent Out | 1.Upload details of home to be listed2.Update status or other details of listing(s)3.Schedule open houses4.Review buyers&#39; applications and approve/reject5.Remove listing | Kena |
| Renter | 1.Submit an application for the lease including credit score,employment information2.Send an email to the Landlord/Landlord&#39;s realtor | Shiva |

## Weekly Scrum Report

### XP Core Values:

**Throughout the development we followed 2 XP core values mainly i.e. Communication and Feedback .**

**Communication :** Everyone was part of the Designing phase .We communicated via zoom session. We worked together on everything from requirements to code. We tried to put the best solution to our problem together.

**Feedback :** For each iteration we demonstrated our deliverable early and often then listened carefully to the feedback and made any changes needed. We will talked about the project and adapt our process to it

### Designing Phase:
<hr>
09/19/2020
<hr>

**XP Core Value :Communication**

- Walked over the project requirements
- Wireframes to be made using Adobe XD
- XP Core values - communication
- Weekly Scrum Task Board - Github Kanban board
- Technology stack - MERN stack

<hr>
09/26/2020
<hr>

**XP Core Value :Communication**

- Wireframes for Login , Register
- Brainstorming for system design (initial phase)
- Discussion on tool stack to be used

<hr>
10/03/2020
<hr>

**XP Core Value :Communication**

- Wireframe designing for Seller
- Wireframe designing for Realtor
- Wireframe designing for Buyer
- System Architecture design

<hr>
10/21/2020
<hr>

**XP Core Value :Communication**

- Assigned tasks to team members
- Designed and created the Schema
- Two new buttons: Edit property and Schedule open house at sellers manage property
- Difference between Landlord and seller - ask Professor

**Development phase:**

<hr>
10/28/2020
<hr>

**XP Core Value :Feedback**

**Kena Mehta:**

**Tasks worked on:**

- Only Realtor/Landlord/Seller can see Manage property in Navbar after logging in.
- Realtor can see &#39;Add Property&#39; and &#39;Add Rent&#39; button, Landlord can see &#39;Add Rent&#39; button and Seller can see &#39;Add Property&#39; button only if there are 0 properties added. Seller can only add one property

**Next tasks:**

- Modal for adding new property and display

**Blockers** :

- Property owner email id field needs to be added

**Puneet Jyot Singh**

**Tasks worked on:**

- Started working on the admin dashboard.
- Assigned status for different authorizations

**Next tasks** :

- Built approve/remove functionality

**Blockers** :

- Have to add users in db as login/register is under development

**Sai Krishna Nandikonda**

**Tasks worked on:**

- Initial Project setup
- Installing basic modules for initial setup

**Next tasks** :

- Implement Navbar

**Blockers** :

- Basic issues during the project setup

**Shiva Panday**

**Tasks worked on:**

- Initial Project setup
- Created Boiler Plate for frontend and backend

**Next tasks** :

- Add Registration Functionality

**Blockers** :

- Package version mismatch

<hr>
11/04/2020
<hr>

**XP Core Value :Feedback**

**Kena Mehta:**

**Tasks worked on:**

- Created Modal for adding new property along with updating the property model in MongoDB

**Next tasks:**

- Modal for adding new rent property and display the properties

**Blockers** : None

**Puneet Jyot Singh**

**Tasks worked on:**

- Approve/Remove/Reject users

**Next tasks** :

- Build property detail page

**Blockers** :

- No Blockers

**Sai Krishna Nandikonda**

**Tasks worked on:**

- Implementing Navigation bar
- Created property model
- Using bootstrap for Navbar Styling

**Next tasks** :

- Load navbar based on roles

**Blockers** :

- Bootstrap version issues.

**Shiva Panday**

**Tasks worked on:**

- Add Register functionality to register all types of users(Renter,Buyer,Seller,Realtor,Landlord) in the application

**Next tasks** :

- Add Login functionality

**Blockers** :

- Basic version mismatch issues

<hr>
11/11/2010
<hr>

**XP Core Value :Feedback**

**Kena Mehta:**

**Tasks worked on:**

- Created Modal for adding new rent property along with updating the property model to include rent details in MongoDB

**Next tasks:**

- Create APIs for addProperty and getProperties
- Open House creation for property

**Blockers** : None

**Puneet Jyot Singh**

**Tasks worked on:**

- Approve/Remove/Reject users
- Created backend api for the same

**Next tasks** :

- Build property detail page

**Blockers** :

- No Blockers

**Sai Krishna Nandikonda**

**Tasks worked on:**

- Loaded Navbar based on roles
- Integrated login with the Navbar

**Next tasks** :

- Design and develop HomePage

**Blockers** :

- Integration issues with login

**Shiva Panday**

**Tasks worked on:**

- Allow the user to login.

**Next tasks** :

- Generate auth token using passport -JWT strategy to authenticate all types of roles.

**Blockers** :

- None

<hr>
11/18/2020
<hr>

**XP Core Value :Feedback**

**Kena Mehta:**

**Tasks worked on:**

- Created APIs for get and add properties along with UI development
- Created Open House Modal to schedule open houses along with its HTTP PUT API

**Next tasks:**

- Create APIs for editProperty and removeProperties along with UI development

**Blockers** : None

**Puneet Jyot Singh**

**Tasks worked on:**

- Added view property page
- Integrated material ui icons to make it more user friendly
- Added conditions for renter and buyer functionalities

**Next tasks** :

- Build property detail page

**Blockers** :

- No Blockers

**Sai Krishna Nandikonda**

**Tasks worked on:**

- Designed and developed Homepage
- Backed API&#39;s to load all the properties

**Next tasks** :

- Implement backend allpropertiesApi with the Frontend

**Blockers** :

- None

**Shiva Panday**

**Tasks worked on:**

- Database schema changes for renter model
- Backend API changes for tokenization

**Next tasks** :

- Renter Application form.

**Blockers** :

- None

<hr>
11/25/2020
<hr>

**XP Core Value :Feedback**

**Kena Mehta:**

**Tasks worked on:**

- Created APIs for editProperty and removeProperties along with UI development. Add and reject applicant

**Next tasks:**

- Create S3 bucket in AWS for storing images for properties and integrating it
- View Applicants for the property

**Blockers** :

- Waiting for Puneet and Shiva to complete send application for property before starting with View Applicants

**Puneet Jyot Singh**

**Tasks worked on:**

- Built backend api to get property
- Added send application page for buyer persona

**Next tasks** :

- Integrate buyer&#39;s application

**Blockers** :

- None

**Sai Krishna Nandikonda**

**Tasks worked on:**

- Implemented search functionality for the properties
- Integrated backend search api with the homepage
- Show properties that are not added by logged in user

**Next tasks** :

- Save favourites properties

**Blockers** :

- Issues with searching using many fields and complex backend search query

**Shiva Panday**

**Tasks worked on:**

- Renter Application form for the lease including credit score,employment information
- Renter model modification
- Frontend changes

**Next tasks** :

- Send email to the Landlord on successful submission of application form.

**Blockers** :

- None

<hr>
12/02/2020
<hr>

**XP Core Value :Feedback**

**Kena Mehta:**

**Tasks worked on:**

- Integrated S3 bucket and created view applicants model, add and reject applicants.

**Next tasks:**

- Test the complete workflow
- Deployment

**Blockers** :

- None

**Puneet Jyot Singh**

**Tasks worked on:**

- Worked on ui for application
- Added validation check for approve and removed users
- Integrated admin dashboard with the application

**Next tasks** :

- Test complete workflow
- Deployment

**Blockers** :

- None

**Sai Krishna Nandikonda**

**Tasks worked on:**

- Able to favourite a property and show all favourite properties for user
- Ability for the user to make a search as favourite
- Able to fetch results from him favorite searches

**Next tasks** :

- Deployment

**Blockers** :

- Role based search

**Shiva Panday**

**Tasks worked on:**

- Deployment integrated renter form with view application
- Email verification using nodemailer and mailtraip.io configuration

**Next tasks** :

- Test complete workflow and Deployment

**Blockers:**

- None

<hr>
12/04/2020
<hr>

**XP Core Value :Communication**

**Kena Mehta:**

**Tasks worked on:**

- Deployment

**Puneet Jyot Singh**

- **Deployment Day**

**Sai Krishna Nandikonda**

**Tasks worked on:**

- Code deployment

**Shiva Panday**

**Tasks worked on:**

- Deployment
