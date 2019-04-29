## About the project Github-api-app
This is a simple app which fetches the open issue for a particular github repository from the GitHub API using axios.

## GitHub API
Link - https://api.github.com

## Language Used
ReactJs

## Problem Statement
Input:
User can input a link to any public GitHub repository

Output :
Display a table with the following information-
    1.Total number of open issues
    2.Number of open issues that were opened in the last 24 hours
    3.Number of open issues that were opened more than 24 hours ago but less than 7 days ago
    4.Number of open issues that were opened more than 7 days ago

## Solution

1. Made API request for on https://api.github.com using axios
2. API endpoint as /repo
3. Extracted user and repository name from the URL and passed as query params.
4. Mapped the array response to get creation date and time for all open issues
5. Converted ISO date time format to EPOCH.
6. Found the difference between the current EPOCH and Created EPOCH and updated the count of issues
7. Generated the table once all issue count have been fetched.

## Possible improvements if given more time for the solution

1. Reduce the usage of conditional rendering.
2. Reduce the usage of conditional statements.
3. Build more components for better re-usability of code.
4. Enhancement of User Experience and Design.

## Requirement to Run the Project
1.Node(npm)
2.axios
3.Semantic UI

## Execution Instructions

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



