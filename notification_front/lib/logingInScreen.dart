import 'package:flutter/material.dart';
import 'package:notification_front/profile.dart';

class LogingInScreen extends StatelessWidget {
  // Déclarez une variable d'instance pour stocker l'email
  final TextEditingController emailController = TextEditingController();

  LogingInScreen(String s);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              margin:
                  EdgeInsets.all(20), // Ajouter une marge autour du champ email
              child: TextField(
                controller:
                    emailController, // Utilisez le contrôleur pour obtenir la valeur de l'email
                decoration: InputDecoration(
                  labelText: 'Email',
                ),
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Récupérez la valeur de l'email à partir du contrôleur
                String enteredEmail = emailController.text;
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => Profile(email: enteredEmail,)),
                );
              },
              child: Text('Submit'),
            ),
          ],
        ),
      ),
    );
  }
}
