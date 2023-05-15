firebase appdistribution:distribute ./android/app/build/outputs/apk/debug/app-debug.apk --app 1:270616985759:android:43316e899d5cb3bd79a2aa --release-notes "qr, maps, biometric, menu" --groups "main"

ionic cap run android -l --external
ionic cap run ios -l --external
