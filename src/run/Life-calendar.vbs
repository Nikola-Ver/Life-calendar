Set WshShell=WScript.CreateObject("WSCript.shell")
WshShell.CurrentDirectory = "C:\Program Files\Life-calendar\src\run"
RetCode=WshShell.Run("hiddenStart.vbs",0,False)