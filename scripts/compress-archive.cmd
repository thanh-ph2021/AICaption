powershell -Command "if (Test-Path 'android/index.android.bundle.zip') { Remove-Item 'android/index.android.bundle.zip' }; Compress-Archive -Path 'android/output/*' -DestinationPath 'android/index.android.bundle.zip'"

powershell -Command "if (Test-Path 'android/sourcemap.zip') { Remove-Item 'android/sourcemap.zip' }; Compress-Archive -Path 'android/sourcemap.js' -DestinationPath 'android/sourcemap.zip'"
rmdir /s /q android\output
del /f android\sourcemap.js