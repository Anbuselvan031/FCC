@echo off
echo ===================================================
echo  Pushing Fahrenheit Cricket Club to GitHub
echo  Target: https://github.com/Anbuselvan031/FCC.git
echo ===================================================
echo.
"%LOCALAPPDATA%\MinGit\cmd\git.exe" push -u origin main
echo.
pause
