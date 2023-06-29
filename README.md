## Lov Art - A simple web application for art lovers

Lov Art is a sophisticated web application that offers a curated collection of artwork across various categories, complemented by a robust user registration and authentication system. Registered users gain the privilege to post, edit, and delete their own items, fostering a personalized and engaging art browsing experience.

## Background and Overview

Lov Art serves as a comprehensive, full-stack web application designed to immerse users in the captivating world of art. With an extensive range of artwork from artists worldwide, users can explore, appreciate, and engage with their favorite masterpieces. By enabling users to leave reviews and feedback, Lov Art cultivates a welcoming community where art enthusiasts can celebrate their shared passion and discover new artistic horizons.

### Functionality and MVP

* User Authentication: Lov Art provides a secure user registration and login system, allowing users to create and access their      personal accounts, ensuring a personalized experience.
* User Authorization: Only authorized users can edit and delete their own items, maintaining privacy and control over their art pieces.
* Image Uploading: Artists can effortlessly upload high-quality images of their unique artworks, showcasing their talent and creativity.
* Reviews and Feedback: Users can provide insightful reviews and valuable feedback on their favorite artworks, promoting interaction and dialogue within the community.
* Likes: Lov Art enables users to express their admiration for art by liking their preferred works, fostering a sense of appreciation and recognition.


### Technologies Used

* [Node.js](https://nodejs.org/en/) Lov Art leverages Node.js as the server-side JavaScript runtime environment, ensuring efficient and scalable performance.
* [MongoDB](https://www.mongodb.com/) Lov Art utilizes MongoDB as the NoSQL database for storing and managing data, providing flexibility and scalability.
* [AWS S3](https://aws.amazon.com/s3/) Lov Art leverages AWS S3, a scalable cloud storage service, to manage and serve the artwork images seamlessly.
* [React](https://reactjs.org/) Lov Art utilizes React, a powerful JavaScript library, to build responsive and interactive user interfaces.
* [Redux](https://redux.js.org/) Lov Art employs Redux, a predictable state container, for managing application state and facilitating data flow.
* [Express](https://expressjs.com/) Lov Art uses Express, a fast and minimalist web application framework for Node.js, to handle server-side routing and API endpoints.
* [Mongoose](https://mongoosejs.com/) Lov Art utilizes Mongoose, an elegant MongoDB object modeling tool for Node.js, to streamline database operations and provide a clear structure.

## Technical Challenges
* **Challenge 1**: The challenge we experienced was getting the likes to dynamically render, so when a user likes a post, the like count would increase by one when clicked but if a user clicks the like a second time it would decrease by one.
* **Solution**: We solved this by creating a function that would check if the user has already liked the post and if they have, it would decrease the like count by one and if they haven't, it would increase the like count by one.

* **Challenge 2**: The challenge we experienced was getting the reviews to dynamically render, so when a user submits a review, the review would render on the page without having to refresh the page.
* **Solution**: We solved this by creating a function that would check if the user has already submitted a review and if they have, it would render the review on the page and if they haven't, it would not render the review on the page.



## Deployment
LovArt is deployed on Render. You can visit the site [here](https://lovart.onrender.com/).


## Authors
* Angelo Ciffone, Ethan Mercado, Merve Dogan-Espaillat, Kevin Lewis
