# Deployment Instructions for cPanel

This project is ready for deployment to cPanel. Follow these steps to build and upload your application.

## 1. Build the Project
Run the following command in your terminal to generate the production build:
```bash
npm run build
```
This will create a `dist` folder containing all the static files and API scripts.

## 2. Upload to cPanel
1. Log in to your cPanel File Manager.
2. Navigate to your `public_html` folder (or the subdomain folder where you want the site).
3. Upload the **contents** of the `dist` folder to this directory.
   - You should see `index.html`, `assets/`, `api/`, `.htaccess`, etc.

## 3. Verify API Permissions
Ensure the `api` folder and its contents have the correct permissions (usually `0644` for files and `0755` for directories).
- The `api/contact.php` script will automatically create a `messages.json` file when the first message is sent.
- The `api/upload.php` script will create an `uploads` folder in the root directory (parent of `api`) to store images.

## 4. Features & Persistence
- **Contact Form**: Fully functional. Messages are saved to `api/messages.json` on the server and emailed to `info@kenyavetsmission.org`.
- **Image Uploads**: Fully functional. Images are saved to the `uploads/` folder on the server.
- **Content Management (News, Missions, etc.)**: Currently runs in **Demo/Mock Mode**. Changes are saved to your browser's Local Storage, not the server database. This allows you to test the admin panel, but changes won't be visible to other users.
  - *To enable full server-side content management, additional PHP scripts for each section would be required.*

## 5. Troubleshooting
- **404 Errors on Refresh**: The included `.htaccess` file handles this by redirecting all requests to `index.html` (React Router). Ensure it was uploaded correctly.
- **API Errors**: Check the browser console (Network tab) if API requests fail. Ensure your PHP version is 7.4 or higher.
- **Upload Issues**: If image uploads fail, check that the `uploads` folder (created automatically) has write permissions (`0755` or `0777` depending on server config).

## Directory Structure on Server
After upload, your server should look like this:
```
public_html/
├── api/
│   ├── contact.php
│   ├── upload.php
│   └── messages.json (created automatically)
├── assets/
│   ├── index-*.js
│   └── index-*.css
├── uploads/ (created automatically)
├── .htaccess
├── index.html
└── favicon.ico
```
