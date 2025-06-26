# Voting App – Submission README

## 1. Code Access

**GitHub Repo:** https://github.com/oscarmrom/voting-app-assessment

---

## 2. How to Run or Test

This project uses the standard Rails + React on Rails scaffolding. To run or test the code:

1. **Install dependencies:**
    - Ruby gems: `bundle install`
    - JavaScript packages: `yarn install`
2. **Set up the database:**
    - `rails db:setup`
3. **Start the development server:**
    - `bin/dev` (or use `rails server` and `./bin/shakapacker-dev-server` separately)
4. **Run tests:**
    - Rails tests: `rails test`

No special setup is required beyond the standard Rails/React on Rails workflow.

## Problem Solving Approach

I approached this as a time-boxed MVP, focusing on core functionality first and then adding polish. I completed the initial application setup independently, then leveraged AI tools (Cursor) to accelerate development and ensure I could deliver a complete, working solution within the 2-hour timeframe.

---

## Technical Decisions

-   Implemented simple session-based authentication (storing user_id in Rails session) rather than JWT/tokens to reduce complexity
-   Used Tailwind CSS via CDN for rapid UI development
-   Disabled CSRF protection for API endpoints to streamline AJAX requests in the time constraint
-   Leveraged Rails' `find_or_create_by` with model callbacks for name normalization to handle duplicate candidates elegantly

---

## Product Assumptions

-   Simplified "password" requirement to accept any input (as specified in requirements)
-   Assumed single voting session per browser (session-based vs persistent login)
-   Prioritized core voting functionality over edge cases like sophisticated duplicate detection

---

## Rails/React Conventions

-   Deliberately simplified error handling for time constraints
-   Used React hooks pattern for state management instead of Redux (appropriate for app size)
-   Followed Rails REST conventions for API endpoints
-   Used standard React on Rails component registration pattern

---

## Future Improvements

-   Add comprehensive input validation and sanitization
-   Implement fuzzy matching for candidate name duplicates
-   Add proper authentication system
-   Enhance accessibility compliance
-   Add more comprehensive test coverage

---

## Deployment Note

I was able to successfully deploy the app to Fly.io. You can view the live application here: [https://music-voting-app.fly.dev/](https://music-voting-app.fly.dev/)
