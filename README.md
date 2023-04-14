
# The 100 Co-Working Space 

A simple booking application for a co-working space (The 100). Project is currently at its 
infancy, and supports minimal features. The major focus for this stage of the project was to fulfill a basic CRUD requirement. **Also, to make testing easier, currently there is no front end validation on any of the forms**
## Features
#### **Majority of the forms here make use of the Modal pop up system**

- Login
- Registration (for users, Admins to be added directly from the database)
- User Dashboard
    - View all the Bookings made by the user. (*Currently only supports day booking*)
    - Edit the booking
    - Cancel the booking completely
- Admin Dashboard
    - View all the bookings that has been made (*Need to add pagination*)
    - Testimonial
        - Add Testimonial (Admins can add in the testimonial/review of a said user)
    

## Currently Working On

- Integrating Chart.js
    
        Trying to further dig into mongoose aggregator functions and advanced queries to
        pipeline the retrieved data into charts. Focusing on getting a simple Pie-Chart
        to  get started.
    
## Roadmap


- Integrating More Chart Features

        Trying add more value to the admin dashboard, using Plots, Curves and Lines etc.
    
- Improving the UI/UX

        The User experience side of things have already been mapped out, to a basic
        degree. The Interface side of things needs a lot of focus. Need to plan out
        a styling guide for each of the elements: Need to better my CSS too.

- Integrating more features 
## Technology Stack Used

- React.js (*Front End Library*)
- Mongoose.js (*ODM Database*)
- Node.js (*Backend Server*)
- Express.js (*Backend Framework*)
- React-Redux (*For State Management*)
- Bcrypt (*For Password Encryption & Decryption*)
- Luxon (*Parsing DateTime values*)
- Cloudinary (*Storing and Retrieving Uploaded Images*)
- Chakra-UI (*Component based Front-end Library, for Styling*)



