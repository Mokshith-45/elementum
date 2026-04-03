# =================================================================
# DOCKER QUICK START - WINDOWS POWERSHELL
# Production-ready Docker commands for Elementum React App
# =================================================================

Write-Host "🐳 Elementum Docker Quick Start (Windows)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# =================================================================
# 1. BUILD THE IMAGE
# =================================================================
function Build-Image {
    Write-Host "🔨 Building Docker image..." -ForegroundColor Blue
    docker build -t elementum:latest .
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Image built successfully!" -ForegroundColor Green
        docker images | Select-String "elementum"
    }
    else {
        Write-Host "✗ Build failed" -ForegroundColor Red
        exit 1
    }
}

# =================================================================
# 2. RUN THE CONTAINER
# =================================================================
function Start-Container {
    Write-Host "🚀 Running container..." -ForegroundColor Blue
    docker run -d `
        -p 3000:3000 `
        --name elementum-app `
        --restart unless-stopped `
        elementum:latest
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Container started!" -ForegroundColor Green
        Start-Sleep -Seconds 2
        Write-Host "📱 Access at: http://localhost:3000" -ForegroundColor Yellow
    }
    else {
        Write-Host "✗ Failed to start container" -ForegroundColor Red
        exit 1
    }
}

# =================================================================
# 3. CHECK CONTAINER STATUS
# =================================================================
function Check-Status {
    Write-Host "📊 Container Status:" -ForegroundColor Blue
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | Select-String "elementum"
    Write-Host ""
    Write-Host "📋 Health Check:" -ForegroundColor Blue
    $health = docker inspect --format='{{.State.Health.Status}}' elementum-app 2>$null
    if ($health) {
        Write-Host $health
    }
    else {
        Write-Host "N/A"
    }
}

# =================================================================
# 4. VIEW LOGS
# =================================================================
function View-Logs {
    Write-Host "📜 Container Logs (Press Ctrl+C to exit):" -ForegroundColor Blue
    docker logs -f elementum-app
}

# =================================================================
# 5. STOP CONTAINER
# =================================================================
function Stop-Container {
    Write-Host "⏹️  Stopping container..." -ForegroundColor Blue
    docker stop elementum-app
    Write-Host "✓ Container stopped" -ForegroundColor Green
}

# =================================================================
# 6. RESTART CONTAINER
# =================================================================
function Restart-Container {
    Write-Host "🔄 Restarting container..." -ForegroundColor Blue
    docker restart elementum-app
    Write-Host "✓ Container restarted" -ForegroundColor Green
    Start-Sleep -Seconds 2
    Check-Status
}

# =================================================================
# 7. REMOVE CONTAINER
# =================================================================
function Remove-Container {
    Write-Host "🗑️  Removing container..." -ForegroundColor Blue
    docker stop elementum-app 2>$null
    docker rm elementum-app
    Write-Host "✓ Container removed" -ForegroundColor Green
}

# =================================================================
# 8. CLEAN UP ALL
# =================================================================
function CleanupAll {
    Write-Host "⚠️  WARNING: This will remove the container and image" -ForegroundColor Yellow
    $confirm = Read-Host "Continue? (y/n)"
    if ($confirm -eq 'y') {
        docker stop elementum-app 2>$null
        docker rm elementum-app 2>$null
        docker rmi elementum:latest
        Write-Host "✓ Cleanup complete" -ForegroundColor Green
    }
    else {
        Write-Host "Cancelled"
    }
}

# =================================================================
# 9. DOCKER COMPOSE UP
# =================================================================
function ComposeUp {
    Write-Host "🐳 Starting with Docker Compose..." -ForegroundColor Blue
    docker-compose up -d
    Write-Host "✓ Services started" -ForegroundColor Green
    docker-compose ps
}

# =================================================================
# 10. DOCKER COMPOSE DOWN
# =================================================================
function ComposeDown {
    Write-Host "⏹️  Stopping Docker Compose services..." -ForegroundColor Blue
    docker-compose down
    Write-Host "✓ Services stopped" -ForegroundColor Green
}

# =================================================================
# 11. SYSTEM INFO
# =================================================================
function SystemInfo {
    Write-Host "ℹ️  System Information:" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Docker Version:"
    docker --version
    Write-Host ""
    Write-Host "Docker Images:"
    docker images | Select-String "elementum"
    Write-Host ""
    Write-Host "Running Containers:"
    $running = docker ps | Select-String "elementum"
    if ($null -eq $running) {
        Write-Host "No containers running"
    }
}

# =================================================================
# 12. SHOW MENU
# =================================================================
function ShowMenu {
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
    Write-Host "ELEMENTUM DOCKER COMMANDS" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1) 🔨 Build image"
    Write-Host "2) 🚀 Run container"
    Write-Host "3) 📊 Check status"
    Write-Host "4) 📜 View logs"
    Write-Host "5) ⏹️  Stop container"
    Write-Host "6) 🔄 Restart container"
    Write-Host "7) 🗑️  Remove container"
    Write-Host "8) 🧹 Cleanup all"
    Write-Host "9) 🐳 Docker Compose UP"
    Write-Host "10) ⏹️  Docker Compose DOWN"
    Write-Host "11) ℹ️  System info"
    Write-Host "0) ❌ Exit"
    Write-Host ""
}

# =================================================================
# MAIN MENU LOOP
# =================================================================
function Main {
    while ($true) {
        ShowMenu
        $choice = Read-Host "Select option"
        
        switch ($choice) {
            "1" { Build-Image }
            "2" { Start-Container }
            "3" { Check-Status }
            "4" { View-Logs }
            "5" { Stop-Container }
            "6" { Restart-Container }
            "7" { Remove-Container }
            "8" { CleanupAll }
            "9" { ComposeUp }
            "10" { ComposeDown }
            "11" { SystemInfo }
            "0" { 
                Write-Host "Exiting..."
                exit 0 
            }
            default { 
                Write-Host "Invalid option" -ForegroundColor Red 
            }
        }
        
        Write-Host ""
        Read-Host "Press Enter to continue"
    }
}

# =================================================================
# RUN MAIN
# =================================================================
Main
