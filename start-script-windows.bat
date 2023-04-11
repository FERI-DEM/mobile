@echo off
setlocal enabledelayedexpansion

set "ip_address="
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
set "ip_address=%%i"
set "ip_address=!ip_address: =!"
goto :continue
)

:continue
if not defined ip_address (
echo IP address was not found.
exit /b 1
)

set "file=.env.development"
set "replacement=API_URL=http://%ip_address%:3000/api/"

(for /f "delims=" %%a in ('type "%file%"') do (
set "line=%%a"
if "!line:API_URL=!" neq "!line!" (
echo !replacement!
) else (
echo !line!
)
)) > "%file%.tmp"

move /y "%file%.tmp" "%file%" > nul

echo "API_URL" in file "%file%" was updated to "API_URL=http://%ip_address%:3000/api/".