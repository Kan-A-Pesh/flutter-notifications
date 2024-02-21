# flutter-notifications

This project is a proof of concept for push notification integration in Express and Flutter.

## Project Structure 📁

- `app`: This directory contains the Flutter project for the app.
- `server`: This directory contains the API server.
- `admin`: This directory contains a simple admin interface.

## Getting Started 🚀

To get started with this project, follow the steps below:

1. Clone the repository.
2. Navigate to the `app` directory and run `flutter run` to start the Flutter app.
3. Navigate to the `server` directory and run `npm install` to install the server dependencies.
4. Run `npm start` to start the API server.
5. Open the admin interface by navigating to the `admin` directory and running `npm install` followed by `npm start`.

## Usage 📝

Once the project is set up and running, you can use the admin interface to send push notifications to the Flutter app, configure users, and create groups.

## How it Works 🤔

The Flutter app first requests permission to send push notifications.\
Once permission is granted, the app sends the device token to the server including the user's unique identifier (in this case, the user's email).

The server stores the device token in the database and associates it with the user's email.

When the admin interface sends a push notification to an email or group (which is a collection of emails), the server retrieves the device tokens associated with the email(s) and sends the push notification to the app.

The app then displays the push notification to the user.

## Built With 🛠️

- [Flutter](https://flutter.dev/) • For the app
- [Express](https://expressjs.com/) • For the API server
- [MySQL](https://www.mysql.com/) • For the database
- [React](https://reactjs.org/) • For the admin interface

## Contributing 🤝

Contributions are welcome! If you have any ideas or improvements, feel free to submit a pull request.

## License 📄

This project is licensed under the [MIT License](LICENSE).
