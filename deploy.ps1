# deploy.ps1 - Automated FTP Deployment Script for Flysquawk Website
# Usage: .\deploy.ps1 -FtpHost "ftp.flysquawk.com.my" -FtpUsername "your-username" -FtpPassword "your-password"

param(
    [Parameter(Mandatory=$true)]
    [string]$FtpHost,
    
    [Parameter(Mandatory=$true)]
    [string]$FtpUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$FtpPassword,
    
    [string]$RemotePath = "/public_html",
    [int]$FtpPort = 21
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Flysquawk Website Deployment Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if WinSCP module is available
$winScpAvailable = $false
try {
    if (Get-Module -ListAvailable -Name WinSCP) {
        $winScpAvailable = $true
        Import-Module WinSCP
    }
} catch {
    Write-Host "WinSCP module not found. Using alternative method..." -ForegroundColor Yellow
}

if (-not $winScpAvailable) {
    Write-Host ""
    Write-Host "Option 1: Install WinSCP PowerShell module for automated deployment" -ForegroundColor Yellow
    Write-Host "  Run: Install-Module -Name WinSCP -Force" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 2: Use FileZilla (GUI) - Download from https://filezilla-project.org" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Files to upload manually:" -ForegroundColor Cyan
    Write-Host "  - index.html" -ForegroundColor White
    Write-Host "  - assets/ (entire folder)" -ForegroundColor White
    Write-Host ""
    Write-Host "Upload to: $RemotePath" -ForegroundColor Cyan
    Write-Host ""
    exit 0
}

# Set up session
$sessionOptions = New-Object WinSCP.SessionOptions -Property @{
    Protocol = [WinSCP.Protocol]::Ftp
    HostName = $FtpHost
    UserName = $FtpUsername
    Password = $FtpPassword
    PortNumber = $FtpPort
}

$session = New-Object WinSCP.Session

try {
    Write-Host "Connecting to FTP server: $FtpHost..." -ForegroundColor Cyan
    $session.Open($sessionOptions)
    Write-Host "✓ Connected successfully" -ForegroundColor Green
    Write-Host ""
    
    # Check if remote path exists
    if (-not $session.FileExists($RemotePath)) {
        Write-Host "Creating remote directory: $RemotePath" -ForegroundColor Yellow
        $session.CreateDirectory($RemotePath)
    }
    
    Write-Host "Uploading files..." -ForegroundColor Cyan
    Write-Host ""
    
    # Get current directory
    $localPath = $PSScriptRoot
    if (-not $localPath) {
        $localPath = Get-Location
    }
    
    # Upload index.html
    $indexFile = Join-Path $localPath "index.html"
    if (Test-Path $indexFile) {
        $session.PutFiles($indexFile, "$RemotePath/index.html").Check()
        Write-Host "  ✓ Uploaded index.html" -ForegroundColor Green
    } else {
        Write-Host "  ✗ index.html not found!" -ForegroundColor Red
    }
    
    # Upload assets folder
    $assetsPath = Join-Path $localPath "assets"
    if (Test-Path $assetsPath) {
        Write-Host "  Uploading assets folder..." -ForegroundColor Cyan
        
        $transferOptions = New-Object WinSCP.TransferOptions
        $transferOptions.TransferMode = [WinSCP.TransferMode]::Binary
        $transferOptions.PreserveTimestamp = $false
        
        # Upload all files in assets folder recursively
        $session.PutFiles("$assetsPath\*", "$RemotePath/assets/", $False, $transferOptions).Check()
        Write-Host "  ✓ Uploaded assets folder" -ForegroundColor Green
    } else {
        Write-Host "  ✗ assets folder not found!" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Visit: https://flysquawk.com.my" -ForegroundColor Cyan
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ❌ Deployment failed!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Check FTP credentials" -ForegroundColor White
    Write-Host "  2. Verify FTP host and port" -ForegroundColor White
    Write-Host "  3. Check firewall settings" -ForegroundColor White
    Write-Host "  4. Try using FileZilla for manual upload" -ForegroundColor White
    Write-Host ""
    exit 1
} finally {
    $session.Dispose()
}

