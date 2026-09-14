TASKLY

Plan. Do. Done.

Taskly is a simple task manager that I built while learning web development.

I wanted to make something that I could actually use every day instead of just following tutorials and making random practice pages. So I started with a basic task list and kept adding features until it turned into a proper little app.

Now it works as a **Progressive Web App (PWA)**, so I can install it on my phone and use it like a normal app.

# Try Taskly

Live App: https://codewithashu03.github.io/Taskly/

# What can it do?

* Add tasks with a date and time
* Mark tasks as completed
* Delete individual tasks or clear everything
* Track how many tasks are completed
* Show overall completion progress
* Save tasks using Local Storage
* Send browser notifications for reminders
* Play a small sound when a task is completed
* Work on both desktop and mobile
* Install on a phone as a PWA

# Built for the Phone Too

One of the things I really wanted was for Taskly to feel like an actual app rather than just a website opened in a browser.

So I added PWA support, a custom icon, responsive styling, and standalone app mode.

It can be installed directly on a supported phone from the browser.

## One Current Limitation

The reminder system currently checks for reminders while Taskly is running.

If the app is completely closed, the reminder isn't guaranteed to fire. This is something I want to solve in a future version with a proper background notification system.

I'd rather mention the limitation honestly than pretend the current version does something it doesn't.

# What I Used

* HTML
* CSS
* JavaScript
* Local Storage
* Web Notifications API
* Web Audio API
* Service Workers
* Web App Manifest

No frameworks. Just the basics, built up step by step.

# Project Files

Taskly/
 index.html
 style.css
 script.js
 manifest.json
 service-worker.js
 logo.png

# What I Learned

This project taught me a lot more than I expected.

I learned how HTML, CSS and JavaScript work together, how to store data in the browser, how browser notifications work, how service workers work, and how a website can be turned into an installable PWA.

More importantly, I learned what it's actually like to build something, run into bugs, fix them, change things that don't look right, and keep going until it works.

# What's Next?

Taskly V1 is intentionally kept simple.

For future versions, I'd like to explore:

* Reliable background reminders
* Better task scheduling
* More productivity features
* Backend integration
* A more advanced version of the app

But for now, **V1 is shipped.** 🚀

# About

**Created by Ashutosh**

This is one of my first complete projects while learning programming and software development.

I built Taskly to learn by actually making something — and I'm planning to keep improving it.

**Taskly — Plan. Do. Done.**
