# Agil_grupp_9

Group Project React

### Project Description

This project is a React-based web application developed by Agil_grupp_9. The purpose of the project is to create a user-friendly and responsive web application that manages recipes.

### Installation

To install and run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Agil_grupp_9/projekt.git
   ```
2. Navigate to the project folder:
   ```bash
   cd projekt
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Build and Start the Project

To build and start the project, use the following commands:

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the development server:
   ```bash
   npm start
   ```

### Folder Structure

The project's folder structure is as follows:

App.jsx → {JSX.Element}
The main application component that sets up the routing for the app.

HomePage().jsx → {JSX.Element}
HomePage component fetches and displays a list of all recipes in database. It allows users to search for recipes by title and filter by category.

CategoryAsideList(props).jsx → {JSX.Element}
CategoryAsideList component renders a list of categories as links.

CategoryDropDown(props).jsx → {JSX.Element}
CategoryDropDown component renders a dropdown menu for selecting categories.

CommentForm(props).jsx → {JSX.Element}
CommentForm component allows users to submit their name and comment.

CommentList(comments).jsx → {JSX.Element}
CommentList component renders a list of comments in reverse order.

CommentSection(props).jsx → {JSX.Element}
CommentSection component fetches and displays comments for a specific recipe. It also allows users to submit new comments.

Header(props) → {JSX.Element}
Header component that displays a header section with a home icon, title text, category dropdown, and search bar.

Footer().jsx
Footer component that displays the footer section of the website. It includes contact information, quick links, and social media icons.

Rating(props).jsx → {JSX.Element}
Rating component fetches and displays the average rating for a recipe and allows users to submit their own ratings.

RatingDisplay(props).jsx → {JSX.Element}
This component fetches the average rating of a recipe from an API and displays it as both a numeric value and a series of star icons. The rating is rounded to one decimal place. If the rating cannot be fetched, an error message is displayed.

SearchBar(props).jsx → {JSX.Element}
SearchBar component renders an input field for searching recipes.

getDifficulty(props) → {JSX.Element}
RecipeCard component displays a recipe card with details such as title, image, categories, time, and difficulty.

### Contribute to the Project

To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add a description of your changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

### License

This project is licensed under the MIT license. See [LICENSE](LICENSE) for more information.
