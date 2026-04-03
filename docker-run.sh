#!/bin/bash

# =================================================================
# DOCKER QUICK START GUIDE
# Production-ready Docker commands for Elementum React App
# =================================================================

echo "🐳 Elementum Docker Quick Start"
echo "================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# =================================================================
# 1. BUILD THE IMAGE
# =================================================================
build_image() {
    echo -e "${BLUE}🔨 Building Docker image...${NC}"
    docker build -t elementum:latest .
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Image built successfully!${NC}"
        docker images | grep elementum
    else
        echo -e "${RED}✗ Build failed${NC}"
        exit 1
    fi
}

# =================================================================
# 2. RUN THE CONTAINER
# =================================================================
run_container() {
    echo -e "${BLUE}🚀 Running container...${NC}"
    docker run -d \
        -p 3000:3000 \
        --name elementum-app \
        --restart unless-stopped \
        elementum:latest
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Container started!${NC}"
        sleep 2
        echo -e "${YELLOW}📱 Access at: http://localhost:3000${NC}"
    else
        echo -e "${RED}✗ Failed to start container${NC}"
        exit 1
    fi
}

# =================================================================
# 3. CHECK CONTAINER STATUS
# =================================================================
check_status() {
    echo -e "${BLUE}📊 Container Status:${NC}"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep elementum
    echo ""
    echo -e "${BLUE}📋 Health Check:${NC}"
    docker inspect --format='{{.State.Health.Status}}' elementum-app 2>/dev/null || echo "N/A"
}

# =================================================================
# 4. VIEW LOGS
# =================================================================
view_logs() {
    echo -e "${BLUE}📜 Container Logs (Press Ctrl+C to exit):${NC}"
    docker logs -f elementum-app
}

# =================================================================
# 5. STOP CONTAINER
# =================================================================
stop_container() {
    echo -e "${BLUE}⏹️  Stopping container...${NC}"
    docker stop elementum-app
    echo -e "${GREEN}✓ Container stopped${NC}"
}

# =================================================================
# 6. RESTART CONTAINER
# =================================================================
restart_container() {
    echo -e "${BLUE}🔄 Restarting container...${NC}"
    docker restart elementum-app
    echo -e "${GREEN}✓ Container restarted${NC}"
    sleep 2
    check_status
}

# =================================================================
# 7. REMOVE CONTAINER
# =================================================================
remove_container() {
    echo -e "${BLUE}🗑️  Removing container...${NC}"
    docker stop elementum-app 2>/dev/null
    docker rm elementum-app
    echo -e "${GREEN}✓ Container removed${NC}"
}

# =================================================================
# 8. CLEAN UP ALL
# =================================================================
cleanup_all() {
    echo -e "${YELLOW}⚠️  WARNING: This will remove the container and image${NC}"
    read -p "Continue? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker stop elementum-app 2>/dev/null
        docker rm elementum-app 2>/dev/null
        docker rmi elementum:latest
        echo -e "${GREEN}✓ Cleanup complete${NC}"
    else
        echo "Cancelled"
    fi
}

# =================================================================
# 9. DOCKER COMPOSE (Alternative)
# =================================================================
compose_up() {
    echo -e "${BLUE}🐳 Starting with Docker Compose...${NC}"
    docker-compose up -d
    echo -e "${GREEN}✓ Services started${NC}"
    docker-compose ps
}

compose_down() {
    echo -e "${BLUE}⏹️  Stopping Docker Compose services...${NC}"
    docker-compose down
    echo -e "${GREEN}✓ Services stopped${NC}"
}

# =================================================================
# 10. SYSTEM INFO
# =================================================================
system_info() {
    echo -e "${BLUE}ℹ️  System Information:${NC}"
    echo ""
    echo "Docker Version:"
    docker --version
    echo ""
    echo "Docker Images:"
    docker images | grep elementum
    echo ""
    echo "Running Containers:"
    docker ps | grep elementum || echo "No containers running"
}

# =================================================================
# 11. SHELL PROMPT
# =================================================================
show_menu() {
    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}ELEMENTUM DOCKER COMMANDS${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "1) 🔨 Build image"
    echo "2) 🚀 Run container"
    echo "3) 📊 Check status"
    echo "4) 📜 View logs"
    echo "5) ⏹️  Stop container"
    echo "6) 🔄 Restart container"
    echo "7) 🗑️  Remove container"
    echo "8) 🧹 Cleanup all"
    echo "9) 🐳 Docker Compose UP"
    echo "10) ⏹️  Docker Compose DOWN"
    echo "11) ℹ️  System info"
    echo "0) ❌ Exit"
    echo ""
}

# =================================================================
# MAIN MENU LOOP
# =================================================================
main() {
    if [ $# -eq 0 ]; then
        # Interactive mode
        while true; do
            show_menu
            read -p "Select option: " choice
            
            case $choice in
                1) build_image ;;
                2) run_container ;;
                3) check_status ;;
                4) view_logs ;;
                5) stop_container ;;
                6) restart_container ;;
                7) remove_container ;;
                8) cleanup_all ;;
                9) compose_up ;;
                10) compose_down ;;
                11) system_info ;;
                0) echo "Exiting..."; exit 0 ;;
                *) echo -e "${RED}Invalid option${NC}" ;;
            esac
        done
    else
        # Command mode
        case $1 in
            build) build_image ;;
            run) run_container ;;
            status) check_status ;;
            logs) view_logs ;;
            stop) stop_container ;;
            restart) restart_container ;;
            remove) remove_container ;;
            clean) cleanup_all ;;
            compose-up) compose_up ;;
            compose-down) compose_down ;;
            info) system_info ;;
            *)
                echo "Usage: $0 {build|run|status|logs|stop|restart|remove|clean|compose-up|compose-down|info}"
                echo ""
                echo "Or run without arguments for interactive menu"
                exit 1
                ;;
        esac
    fi
}

# =================================================================
# RUN MAIN
# =================================================================
main "$@"
