@echo off
echo ===================================================
echo  Pushing Fahrenheit Cricket Club to GitHub
echo  Targets: FCC-1.git & FCC.git
echo ===================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Code successfully pushed to GitHub!
) else (
    echo [ERROR] Push failed. If prompted, please sign in to GitHub in the popup window.
)
echo.
pause
