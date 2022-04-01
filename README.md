# it5007_project

### To run screen capture server
- Download Visual Studio 2022
- Install Windows SDK
- Open the sln file under BE-ScreenCaptureServer\proj\vs2017
- Run it in debug mode
- The server runs by default in localhost:8080

### To run controls server
- pip install flask flask-cors
- python server.py

### To test the FE
- Copy the html doc called SimpleFE.html to any touch based mobile device
- Open the page on the browser.

## Important points to remember
- Please change the ip address in BE-ControlsServer/server.py to match the ipv4 address of the machine (use ipconfig)
- Change the ip address on SimpleFE.html as well.

Sorry for the inconvenience caused because of manually configuring ip. Will do some scripting in the future to automate this process.