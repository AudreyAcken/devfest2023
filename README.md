# Devfest 2023 - mealmate

Submission to Columbia's Devfest hackathon: https://devfest23.devpost.com/

## Inspiration

According to a study done by Forbes in 2022, nearly 40% of US college students face food insecurity. It is a rather shocking number. Food insecurity on college campuses is now being called the invisible epidemic. As freshmen living on campus (who are required to be on university’s meal plans, which has a set number of meal swipes per week), we often see posts on platforms like Reddit and GroupMe by people who offer to share as well as request extra meal swipes without much follow up. We want to not only provide a better way for both parties to connect, but also to encourage students to participate in such activities. 

## What it does

mealmate is an app -
1. Users (both sharers and requesters) sign up to the app to participate.
2. Users get reminded at the beginning of each week to toggle a status, indicating if they have extra meal swipes to share or not that week. This status can be toggled at any time.
3. The app’s home screen shows how many "live" users are at each dining hall. It calculates this by location tracking and checking the toggle status mentioned above (seeing how many people are in each dining hall that have their toggle turned on).
4. Requesters can then click on the dining hall and the app will randomly pick a sharer at that dining hall, notify them there’s a request. The selected sharer can then accept the request and meet the requester at the entrance of the dining hall.
5. The matching/connection process is automatic, and kept anonymous until the meeting (after the connection is made).


## How I built it

The demo is built through html/css and node.js - I used geolocation data to track the current position of the user and map their location to a dining hall (or no dining hall). This tracking is put through a timed loop so we can detect in real-time when a user enters or leaves the dining hall. After someone enters the dining hall, the corresponding number is updated.

## What's next for mealmate
1. Finish building the app prototype
2. Get the word out on campus and get adoption
3. Test, gather feedback, improve
3. We believe it can be expanded into a generalized match/connection app with more usage scenarios for finding people to do activities with - such as study groups, clubs, outings, rideshare, gym buddies…
