$b64 = (Get-Content -Raw -Path "C:\Users\Osama\.gemini\antigravity\scratch\attikus-portfolio\portrait_base64.txt").Trim()
$template = Get-Content -Raw -Path "C:\Users\Osama\.gemini\antigravity\scratch\attikus-portfolio\template.html"
$output = $template.Replace("__ATTIKUS_B64__", $b64)
[System.IO.File]::WriteAllText("C:\Users\Osama\.gemini\antigravity\scratch\attikus-portfolio\index.html", $output, [System.Text.Encoding]::UTF8)

$size = (Get-Item "C:\Users\Osama\.gemini\antigravity\scratch\attikus-portfolio\index.html").Length
Write-Output "Successfully built index.html with size: $size bytes"
