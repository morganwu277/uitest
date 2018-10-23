
# turn off firewall
netsh advfirewall set allprofiles state off

cd \\VBOXSVR\vagrant
Copy-Item 'FileSystem::\\VBOXSVR\vagrant\selenium-proxy' 'C:\Users\vagrant\Desktop\' -recurse -force
cd C:\Users\vagrant\Desktop\selenium-proxy\target

# https://stackify.com/what-is-powershell/
# -RedirectStandardError — Send error messages to a file specified by path and file name instead of displaying error in the console by default.
# -RedirectStandardInput — Read input from a file specified by path and file name.
# -RedirectStandardOutput — Send output to a file specified by path and file name.

Start-Process -FilePath "java" -ArgumentList "-cp selenium-server-standalone-3.14.0.jar org.openqa.grid.selenium.GridLauncherV3 -role node -nodeConfig ../node.json" -RedirectStandardError ./error.log -RedirectStandardOutput output.log

