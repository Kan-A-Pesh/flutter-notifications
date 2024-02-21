import 'package:flutter/material.dart';
import 'package:notification_front/logingInScreen.dart';

class Profile extends StatelessWidget {
  final String email; // Déclarez email comme final

  // Ajoutez un constructeur pour initialiser email lors de la création de LogedOutScreen
  Profile({required this.email});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Email: $email',
              style: TextStyle(fontSize: 20),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Passez l'email à la page LogedInScreen lors de la navigation
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => LogingInScreen(email)),
                );
              },
              child: Text('Disconnect'),
            ),
          ],
        ),
      ),
    );
  }
}
