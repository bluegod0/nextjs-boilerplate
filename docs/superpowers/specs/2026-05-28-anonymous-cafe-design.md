# Anonymous Cafe Design

**Date:** 2026-05-28  
**Status:** Draft

## Overview

Add a very small "cafe-style" posting experience to the existing Next.js app:

- Anonymous users can create posts
- Anonymous users can add comments
- Anonymous users can edit or delete their own comments
- No login is required
- No edit or delete flows are provided for posts
- The experience stays intentionally minimal so the feature is easy to understand and ship

The goal is to make the app feel like a simple public message board rather than a full community platform.

## Goals

- Let visitors write a post without signing in
- Let visitors leave comments on a post without signing in
- Show a post list and a post detail page
- Keep the UI and data model small enough to implement quickly

## Non-Goals

- User accounts or authentication
- Post editing
- Post deletion
- Comment editing
- Comment deletion
- Likes, bookmarks, tagging, categories, search, or moderation tooling

## Proposed UX

### Home page

The home page should show:

- A short headline introducing the board
- A minimal form for creating a post
- A reverse-chronological list of posts

Each list item should show only the basics:

- Post title
- Short excerpt or first line of body
- Creation time

### Post detail page

The post detail page should show:

- Title
- Full body
- Timestamp
- Comment list
- Comment form
- Edit/delete controls for comments owned by the current browser

The comment area should remain simple and visually light.

## Data Model

Only two persistent models are needed:

### Post

- `id`
- `title`
- `body`
- `createdAt`
- `updatedAt`

### Comment

- `id`
- `postId`
- `editToken`
- `body`
- `createdAt`
- `updatedAt`

Comments belong to a single post. Posts do not need a separate author field because everything is anonymous.
Each comment also stores a random edit token so the browser that created it can later edit or delete it.

## Routing

Use two public routes:

- `/` for the post list and post creation form
- `/posts/[id]` for the post detail view and comments

This keeps the route structure easy to understand and avoids introducing extra pages that are not necessary for the first version.

## Form Behavior

### Creating a post

- Title is required
- Body is required
- Inputs should be trimmed before saving
- Title max length: 80 characters
- Body max length: 1,000 characters
- Very short validation messages should be shown inline

### Creating a comment

- Body is required
- Body should be trimmed before saving
- Comment max length: 300 characters
- Generate a random edit token for the comment and store it in the browser
- Inline validation is enough

### Editing or deleting a comment

- The browser stores the edit token in `localStorage`
- A comment can be edited or deleted only when the stored token matches the comment's `editToken`
- If the token is missing or does not match, the UI should hide edit/delete actions
- Editing should update only the comment body
- Deleting should remove the comment permanently

### Feedback

- After successful post creation, redirect to the new post detail page
- After successful comment creation, stay on the same post detail page and show the new comment
- After successful comment edit, keep the user on the same post detail page and refresh the comment text
- After successful comment delete, keep the user on the same post detail page and remove the comment from view
- If validation fails, preserve the user input where practical

## Error Handling

Keep error handling straightforward:

- Show a short message for validation failures
- Show a generic error message if the database write fails
- Do not add retry flows, drafts, or complex recovery behavior for v1

## Validation Rules

Use conservative limits to keep the feature safe and lightweight:

- Title: required, max 80 characters
- Post body: required, max 1,000 characters
- Comment body: required, max 300 characters
- Edit token: required for comment edit/delete operations

## Implementation Notes

- Reuse the current Next.js App Router structure
- Reuse the existing styling system and UI components where practical
- Keep server actions or route handlers small and local to the feature
- Keep the data layer focused on the two new models
- Generate a random edit token on comment creation and store it both in the browser and in the database
- Use the browser token to decide whether to render comment edit/delete controls

If the current app continues to use Auth.js for the existing auth pages, that can remain in place. The anonymous board does not depend on login.

## Testing / Verification

Manual verification should cover:

1. A visitor can create a post
2. The new post appears in the list
3. A visitor can open the post detail page
4. A visitor can add a comment
5. The comment appears immediately on the detail page
6. The author of a comment can edit it from the same browser
7. The author of a comment can delete it from the same browser

If automated tests are added, they should focus on:

- Required-field validation
- Post creation
- Comment creation
- Comment edit/delete ownership checks
- Rendering the post detail view with comments

## Success Criteria

- Anonymous visitors can create posts and comments
- Anonymous visitors can edit or delete their own comments from the same browser
- The app remains simple and uncluttered
- No login is required for the new flow
- The feature fits naturally into the existing Next.js boilerplate
