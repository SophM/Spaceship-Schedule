# Pseudo-Code-Spaceship-Schedule

1. The app is made of two parts (excluding the header):
    - a section called "Current Spaceship schedule", which show different pieces of information for different spaceships
    - an input form, which offers the user the possibility to add spaceships to the "Current Spaceship schedule" section.

2. The information displayed in "Current spaceship schedule" are:
    - the name of the spaceship
    - the destination of the spaceship
    - the frequency of the spaceship (in min)
    - the next arrival (in AM/PM time)
    - the number of minutes away

3. In the input form, the information to enter are:
    - the spaceship name
    - the destination
    - the first spaceship time (HH:mm - military time)
    - the frequency (in min)

4. Once the user enters the information and clicks on the "submit" button, the information are automatically backed up to the Firebase database. 

5. Then the information are retrieved from the Firebase database and displayed in the "Current Spaceship schedule".  

6. The "next arrival" and "minutes away" variables are relative to the CURRENT time and are computed - with Moment.js - from the data backed up in the database, namely the frequency and the first spaceship time.