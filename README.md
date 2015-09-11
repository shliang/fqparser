# FQ Parser
This parses Excel files, saves content to the database and displays contents on the page.

This Node app is built using Flux architecture (Reflux module), with React.js as frontend JavaScript framework. Data is stored in MongoDB (Mongoose driver).

Live application can be found here: [https://fqparser.herokuapp.com/](https://fqparser.herokuapp.com/)!

Note: this is designed specifically for handling files with headers FQ Folder (type: string), Description (type: string), Frequency (type: String; options: Monthly, Quarterly, Annual), Deadline (type: number)