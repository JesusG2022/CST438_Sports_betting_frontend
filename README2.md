# Project Report

**Github Repo Link**  
[https://github.com/KCrapo/Project01](https://github.com/KCrapo/Project01)


## Overview

**Team Members:** Kevin Crapo, Julio Fernandez, Ty Bear, Esteban Grado

### What is the application and how does it function?

For our application, what we initially wanted to do was create an application that allows a user to sign on, select their favorite teams, and then see a list of upcoming matches for the selected teams with simple betting odds. In the final iteration, our project currently functions as follows:

- Navigates to a landing page where a user can decide to either login or create an account.
- After logging in, the user selects from a list of NBA teams to add as their favorite (we limited the selection to 4 for various reasons).
- The user may then navigate to an upcoming games screen to see matchups for their selected favorites for the next two weeks.
- Betting odds should be displayed for each matchup based on whether the selected teams are playing home or away. (Please do not bet based on this metric.)

## Introduction

### Communication Management

Communication mostly occurred via Slack. Some Zoom meetings were in place, but it was hard to get everyone available at the same time. Upon reflection, we believe we probably could have done a better job with our communication over the course of this project.

### Initial Planning

- **How many stories/issues were initially considered?**  
  We initially considered 16 User stories/issues.

- **How many stories/issues were completed?**  
  12.

### Team Member Retrospectives  
[Provide reflections from each team member.]

## Links to Project Activity

**Pull Requests:**  
- Kevin: [https://github.com/KCrapo/Project01/pulls?q=is%3Apr+is%3Aclosed+author%3AKCrapo](https://github.com/KCrapo/Project01/pulls?q=is%3Apr+is%3Aclosed+author%3AKCrapo)  
- Esteban: [https://github.com/KCrapo/Project01/issues?q=state%3Aclosed%20is%3Apr%20author%3A%40me](https://github.com/KCrapo/Project01/issues?q=state%3Aclosed%20is%3Apr%20author%3A%40me)  
- Ty: [https://github.com/KCrapo/Project01/pulls?q=is%3Apr+author%3Atbear1+is%3Aclosed](https://github.com/KCrapo/Project01/pulls?q=is%3Apr+author%3Atbear1+is%3Aclosed)  
- Julio: [https://github.com/KCrapo/Project01/tree/julioBranch](https://github.com/KCrapo/Project01/tree/julioBranch)

**Issues:**  
- Kevin: [https://github.com/KCrapo/Project01/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3AKCrapo](https://github.com/KCrapo/Project01/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3AKCrapo)  
- Esteban: [https://github.com/KCrapo/Project01/issues/4](https://github.com/KCrapo/Project01/issues/4)  
- Ty: [https://github.com/KCrapo/Project01/issues?q=is%3Aissue%20state%3Aclosed%20author%3Atbear1%20assignee%3Atbear1](https://github.com/KCrapo/Project01/issues?q=is%3Aissue%20state%3Aclosed%20author%3Atbear1%20assignee%3Atbear1)  
- Julio: [https://github.com/KCrapo/Project01/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3AJuliojefe](https://github.com/KCrapo/Project01/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3AJuliojefe)

## Individual Contributions

### What was your role / which stories did you work on?

- **Kevin:** I mainly worked on the API integration for our project. This included testing endpoints to see what information we could control, and writing specific calls to filter out and provide specific information for our display views. Additionally, I helped out with database functions and a decent amount of band-aid fixes at the end of the project.
  
- **Esteban:** I worked on the login page, favorite teams page, and some on the upcoming games.

- **Ty:** On this project, I mostly floated around and helped in different areas. Most of the design aspects of the app are something that I did. I made the login page and the account creation page. I helped design the database.

- **Julio:** I worked mostly on the database. I created the tables as well as some helper functions that simplified interactions with the database. Towards the end, I also helped with fixing some bugs in the favorite teams view of our app.

## Challenges & Solutions

### Biggest challenge faced?

- **Kevin:** I think, if you remove learning a new technology and the fact that I have almost no prior Javascript or web programming experience, the largest challenge for me personally was navigating an API with severely limited calls. I think on a macro level, the most challenging part of this project was getting the database to work with our views.

- **Esteban:** One of the biggest challenges I faced was ensuring that the favorite teams and upcoming games selections displayed properly while limiting the selection to two teams. Managing state and properly rendering the data in a clean format took some trial and error.

- **Ty:** Some challenges with this project are mainly learning a new technology and being able to apply what you learn in a matter of weeks. This challenge is huge because in the grand scheme of things we had to make an app using React Native which none of my teammates or myself knew or had experience with. There were a lot of ups and downs with this project. The thing that plagued us the most was being able to connect the account creation with the database. This is mainly due to using local storage as opposed to using a database server, as it is easier to connect and make magic happen.

- **Julio:** I think that the most challenging part of this project was getting acquainted with all of the tools we used. Previously I had made Android apps using Android Studio, however, this was completely different. Furthermore, JavaScript/TypeScript are languages that I’ve never used, so working with them was also a challenge.

### Why was it a challenge?

- **Kevin:** I'm going to address the database integration challenge because I felt like it was a much bigger challenge than my personal one. I believe it was a major difficulty because there were so many different ways (tutorials) for setting it up and none of them were consistent with each other. It led to a last-minute pivot where we had to rewrite everything following a different format.

- **Esteban:** It was challenging because I had to make sure the selected teams persisted correctly and that the displayed upcoming games updated dynamically when selections changed. Working with the API to filter only the relevant games.

- **Ty:** It was challenging because the learning curve was huge for the amount of time that we had. Local storage is hard to deal with, I have found.

- **Julio:** Learning new things is always a challenge. Some of my team members had previous experience with JavaScript, however, all other tools were new to us, so we had to teach ourselves a lot and learn as we went. In learning, I made a lot of mistakes, and they slowed our progress, but that’s just how it goes when you are learning new things.

### How was the challenge addressed?

- **Kevin:** For the DB: Hours of reading documentation, making tons of mistakes, spaghetti fixes, and using asynchronous storage as a fallback.  
For the API: it was doing single calls with a ton of information and converting it to a formatted string so I could study what was going on without making extra calls.

- **Esteban:** I resolved this by refining how we handled state management and carefully filtering API data to display only the necessary information. I also tested different approaches to make sure the selection limit worked correctly while keeping the UI intuitive for users.

- **Ty:** We all took a stab at connecting the database with the account creation page. Kevin was able to get it working in the end.

- **Julio:** We read documentation and watched YouTube tutorials to gain knowledge. I experimented doing different things, and I kept what worked and erased what didn't.

## Project Experience

### Favorite / most interesting part of this project?

- **Kevin:** I think the most interesting part of this project was trying to learn a bunch of new stuff in a short period of time and trying to make it work. It was pretty brutal, but I feel like I understand a lot more JavaScript, TS, and JSX (even if I'm still not comfortable with it).

- **Esteban:** I really enjoyed working on the UI and making sure users had a smooth experience selecting their favorite teams and viewing upcoming games.

- **Ty:** The most interesting part about this project was working with different people with different experiences. Another interesting part was the project prompt that we went with. We had high hopes for it and we ended up not getting too far with it.

- **Julio:** The most interesting part for me was the database because I learned a lot about databases from working on it. I enjoyed working with my team on creating the design of the database that suited our needs.

### If you could do it over, what would you change?

- **Kevin:** I think that I would have tried to break things down into way more simple parts. When nobody knows the technology, I feel like tasks should be way more particular. Also, get the DB setup and working with simple manipulations first.

- **Esteban:** I would plan out the logic for state management earlier and test API data filtering more in advance. It would have saved time troubleshooting issues later on.

- **Ty:** (No response)

- **Julio:** I would make sure that our database is accessible to all of our views so that they can be populated and functional more early on in development.

### What is the most valuable thing you learned?

- **Kevin:** Resilience (and some JavaScript).

- **Esteban:** I learned a lot about working with APIs and managing state in a React-based environment. Also, making sure data flows smoothly between selections and displays.

- **Ty:** The most valuable thing I learned is actually invaluable and that is using local storage.

- **Julio:** The most valuable thing that I learned is that team communication is important.

## Conclusion

### Project Success

- **Kevin:** It definitely didn’t turn out the way I wanted it to. I feel like we had a slow start and just spent the rest of the time trying to play catch up. However, with the knowledge I have now, I think I would be able to do a lot more with the same amount of time.

- **Esteban:** While there were definitely some challenges along the way, I think we managed to get a working version that achieves most of what we set out to do. There’s still room for improvement, but it was a good learning experience.

- **Ty:** Overall, it was a good first project for software engineering because we got to experience the agile development process and build an app along the way.

- **Julio:** I’d say the app itself was 7.5/10 successful, but the project was overall 10/10 successful. All of us learned tons, not only about programming but also about working in a team and collaborating.

### What did you set out to do vs. what actually got done?

- **Kevin:** We set out to create a personalized sports betting app that allowed users to store favorite teams, peruse their information, and provide (fake) betting odds for upcoming matches. We PIVOTED to creating an app that allowed a login followed by a somewhat linear set of steps to select favorite teams and display their matchups for the next week.

- **Esteban:** We initially planned for a more feature-complete sports tracking app, but we had to scale back in some areas due to time constraints. We still got the login, team selection, and upcoming games functionality working, so the core features were implemented.

- **Ty:** We set out to make this grand app and we ultimately made a basic CRUD app. As time was not on our side and the lack of knowledge was the thing that made the app seem impossible.

- **Julio:** We set out to create a sports betting app that gave users useful win odds for the teams that they chose to follow. Our app works about 8/10. The app tracks a team's but the odds are not accurate.

### Key Takeaways

#### What was the largest victory?

- **Kevin:** My largest victory was filtering the API call to dynamically call games between two set dates.

- **Esteban:** Getting the favorite teams selection and upcoming games display working properly was a big win. Making sure users could select teams and see relevant matchups with logos.

- **Ty:** Getting account creation linked to the database.

- **Julio:** Getting favorite teams linked to the database.

#### Final assessment of the project?

- **Kevin:** Honestly, it was cool to learn a lot but it was incredibly stressful. Trying to make an application in a new development environment, with very limited JavaScript and web programming experience, while also being on a team was pretty rough. I wish that we had a little bit of lead-in time so that I could have prepared myself better.

- **Esteban:** Overall, it was a challenging but rewarding experience. I learned a lot about integrating APIs, handling user interactions, and debugging data issues. With more time and planning, I think we could have refined things even further.

- **Ty:** In conclusion, I think this was a hard project due to the lack of knowledge but it was a great experience and I learned a lot along the way.

- **Julio:** Overall although I am not the happiest with our final product I am also not completely disappointed. We taught ourselves a lot and considering how unfamiliar we were with everything, we didn't do too bad. I learned a lot and that matters.
