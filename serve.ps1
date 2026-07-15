$root = "$PSScriptRoot\site"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:8940/")
$listener.Start()
Write-Output "Serving $root on http://127.0.0.1:8940/"

$mime = @{ ".html"="text/html"; ".css"="text/css"; ".js"="application/javascript"; ".mp3"="audio/mpeg" }

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = $ctx.Request.Url.LocalPath
  if ($path -eq "/") { $path = "/index.html" }
  $file = Join-Path $root ($path.TrimStart("/"))
  if (Test-Path $file -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($file)
    $ctype = $mime[$ext]
    if (-not $ctype) { $ctype = "application/octet-stream" }
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $ctx.Response.ContentType = $ctype
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
  }
  $ctx.Response.OutputStream.Close()
}
