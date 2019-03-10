# Spaceship-Schedule

In this project, I built an app to keep track of the spaceship launch schedule. The app has a responsive layout and can be visited on different devices.

[Click me to check the app out!](https://sophm.github.io/Spaceship-Schedule/)

This app has two main parts (excluding the main header):
- a top section to display the information of the different spaceships.
- a bottom section to enter the information of a new spaceship.

To add a spaceship, there are 4 pieces of information to enter: the name of the spaceship, its destination, its first departure time and its frequency. Those information are automatically backed up in a Firebase database upon submission.

To display the spaceship information in the top section, the information are retrieved from the database so that the app will always display the information of the spaceships previously added. The spaceship name, the destination and the frequency are displayed as is. The departure time of the first spaceship, along with the frequency and the current time, are used to calculate - using the Moment.js library - two new pieces of information: "next arrival" and "minutes away". Those new pieces of information will then change in relation to the current time.

---

### Technologies used

To build this project, I used the following technologies:

- HTML
- CSS
- Bootstrap
- JavaScript/jQuery
- Firebase

---

### Screenshot of the app

![Screenshot of the app](https://github.com/SophM/Spaceship-Schedule/blob/master/assets/screenshot_gif_for_readme/screenshot-app.png?raw=true)

---

### GIF to show the responsive layout of the app

![GIF to show the responsive layout of the app](https://github.com/SophM/Spaceship-Schedule/blob/master/assets/screenshot_gif_for_readme/gif_responsive_layout.gif?raw=true)

