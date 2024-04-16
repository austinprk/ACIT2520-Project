# Breakdown of work:

## March 26th (First sprint starts)

### Roger Hsieh:
- made test commit
- git stash
- implemented "update" function from `reminder_controller.js`
- inserted the additional files needed for user passport authentication
- tried to troubleshoot on the error messages after the additional files have been imported
- imported user models from the previous passport lab to this project's database.js

### Kenneth Ng:
- implemented "delete" function from `reminder_controller.js`
- made test commit

### Austin Park:
- created repository and pushed base code
- implemented "update" function from `reminder_controller.js`

## March 27th 

### Kenneth Ng:
- commented out passport-github2 code that was causing the server to crash on startup
- started reworking `reminder_controller.js` to reflect change in structure in `database.js`

## March 28th

### Austin Park:
- resolved the issue with the logo not apprearing on the login page by correcting the image path.

## April 1st

### Roger Hsieh:
- attempted to create the admin role which can terminate other users' active session
- got stuck so reviewed some online resources
- still stuck
- what do?
- help

## April 4th

### Roger Hsieh:
- attemped to complete the passport sprint
- ran into many error messages but resolved a lot
- worked for approx 2 hours but not complete yet


# April 5th

### Roger Hsieh:
- Completed the 4/5 of the passport sprint criteria
- [ x ] Authenticated users should not be able to see other authenticated users reminders. Only their own.
- [ x ] Authenticated users should not be able to change other authenticated users reminders. Only their own.
- [ x ] Authenticated users should not be able to delete other authenticated users reminders.
- [ x ] You must include the ability for users to Login using Email & Password 
- [   ] You must include the ability for ADMINS to remotely destroy a session. 
- Have not completed the 5th criteria, which is the admin portion

# April 5th

### Austin Park:
- Completed implementing ADMINS privileges on the website, enabling users with the "admin" role in database.js to destroy sessions.
- Began development on the "Sign out" feature, which is not initially part of the project scope.

# April 8th

### Kenneth Ng:
- Updated admin view to prevent admin from deleting session if there was only one session (the current session), which would result in too many redirects

# April 13th

### Kenneth Ng:
- Tried to figure out how to use unsplash API
- Need to implement: 
    - HTTP GET request to unsplash API with client_id, query --> `JSON.parse(object)["results"][0]["urls"]["regular"]`
    - style image in CSS to crop to banner-appropriate height, apply bootstrap .img-fluid class

# April 15th

### Roger Hsieh:
- Spent approximately 2 hours looking at how to hide nav bar from the login page
- Successfully implemented the feature; the nav bar is now hidden in the login page

# April 15th

### Austin Park:
- Refactored the code by removing unncessary files and lines, such as unused imports, and reorganizing it for better clarity.
- Started working on Bonus activity 
 