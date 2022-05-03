# all-of-us

## Description

The goal of this project is to build an application from scratch that can manage a company's employee database. By entering `node index.js` within the command line, users are able to access a variety of options to view departments, roles, and employees. Users also have the option to add/delete roles, add/delete employees, add/delete departments, update a role, view employees by manager, view employees by department, and access the total utilized salary for each department. This is a command line application. 

The key to building this command line application are the Node.js module, Inquirer package, and MySQL. MySQL is used to create the actual database that is used for this application. Within the JavaScript file, the Inquirer package is used to prompt users through a series of questions based on which option they choose. 

[!]
## Video
[Link to video]()

## Usage

This is a command line application and must be used within Terminal. 
* Run `npm install`
* Enter `node index.js` to start the application 
* Choose through a variety of options and modify the database as you wish

## Technologies Used

* JavaScript
    * Node.js (Inquirer package, Console.table)
    * MySQL 

## Installation

1. Create a new repository on Github. 
    - Press the "+" sign on the top right hand corner, or the "new" button on your GitHub homepage. 
    - Create an unique name for your repository, and make the respository public. 
    - Click the "README" option to include the "README" page. 
    - Your new repository has been created.
2. Open GitBash (PC users) or Terminal (Mac users).
    - Navigate to where you want to clone your new repository onto your local machine. 
        - Use `cd` to help you navigate. 
3. To clone the new repository onto your local machine. 
    - Click the respository that you just made on github.com.
    - Click the "code" button and choose the SSH option. 
    - Copy the SSH option to your clipboard. 
    - On GitBash/Terminal, enter the command `git clone git@github.com:<UserNAME>/<demo-repo>.git`
        - After `git clone`, paste the SSH option from your clipboard into GitBash/Terminal.
        - Since the SSH option was used, enter the password for the SSH key when asked. 
4. You have now cloned your new repository.
    - Using `cd`, navigate into your new repository from the location that you have saved it in. 
    - Use `ls` to see what is inside the new repository currently. 
        - It should only include the README page as of now.
5. Tranferring the project files into your new directory on your local machine. 
    - Using Finder/Explorer, copy the corresponding files that are needed to edit your project. 
    - In another Finder/Explorer window, navigate to your new repository, and paste the files directly into that folder. 
6. On GitBash/Terminal, after pasting the project files into the new repository. 
    - Use `ls` to see what is now inside the new repository.
        - This should now include the README page, and the project files that you have copy-pasted in. 
7. Use `git status` to see if there any changes that need to be made to the repository. 
    - At this point, git will tell you that there is an untracked file .
8. Use `git add .` to add the new project files, and allow the new files to be tracked by git.
9. Use `git commit -m "add base project files"` to commit the changes have recently been made to the repository. 
10. Use `git push origin main` to sync your local machine with GitHub. 
    - Enter your SSH password when prompted. 
11. Use `code .` to open the files on a code reader of your choice.
12. Edit the files as necessary in your code reader. 
13. Periodically, and when you are finished with editing your code: 
    - Follow Steps 7-10 to keep your repository up to date with the changes that have been made. 
14. This is a command line application and must be used within Terminal. 
    * Run `npm install`.
    * Enter `node index.js` to start the application.
    * Choose through a variety of options and modify the database as you wish.
15. You have successfully completed this project!

## Credits

Initial prompt given by UC Berkeley Extension, Coding Bootcamp. 

## Reflection

For this project, it was important to learn the use of MySQL to manage the database. MySQL is used to build out the different tables that appear through out the use of the application. It is also used to help pre-populate the data that is initially seen at the start of the application. The Inquirer package is used to prompt users with a series of questions. This project is successful because this command-line application works, and the database is able to be viewed and modified. 

## License

Licensed under the [MIT](https://choosealicense.com/licenses/mit/#) license. 

## Contributors

Feel free to reach out to me at the following: 
* [LinkedIn](https://www.linkedin.com/in/snehita-kolli-0abb23b1/) || [GitHub](https://github.com/snehitak20)

