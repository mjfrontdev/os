// Advanced OS Simulator with Enhanced Features
class AdvancedOSSimulator {
    constructor() {
        this.runningApps = new Map();
        this.windowCounter = 0;
        this.isStartMenuOpen = false;
        this.isWallpaperGalleryOpen = false;
        this.currentTheme = 'light';
        this.selectedIcons = new Set();
        this.fileSystem = new Map(); // Store files and folders
        this.currentPath = '/';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateClock();
        this.setupClockInterval();
        this.createParticles();
        this.simulateWeather();
        this.initCanvas();
        this.initAOS();
        this.loadCustomizationSettings();
        this.setupThemeSelection();
        this.setupVoiceAssistant();
        this.showToast('Welcome to OsMj! 🎉', 'success');
        this.speakWelcomeMessage();
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        // Start button
        document.getElementById('startBtn').addEventListener('click', () => {
            this.toggleStartMenu();
        });

        // Search functionality
        this.setupSearch();

        // Desktop icons
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('dblclick', (e) => {
                const appName = e.currentTarget.dataset.app;
                const action = e.currentTarget.dataset.action;
                
                if (action === 'wallpaper-gallery') {
                    this.toggleWallpaperGallery();
                } else if (appName) {
                    this.openApp(appName);
                }
            });

            // Single click for selection
            icon.addEventListener('click', (e) => {
                if (e.ctrlKey) {
                    this.toggleIconSelection(icon);
                } else {
                    this.clearIconSelection();
                    this.selectIcon(icon);
                }
            });
        });

        // Start menu items
        document.querySelectorAll('.start-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const appName = e.currentTarget.dataset.app;
                const action = e.currentTarget.dataset.action;
                
                if (action === 'shutdown') {
                    this.shutdown();
                } else if (action === 'wallpaper-gallery') {
                    this.toggleWallpaperGallery();
                    this.toggleStartMenu();
                } else if (action === 'voice-assistant') {
                    this.toggleVoiceAssistant();
                    this.toggleStartMenu();
                } else if (appName) {
                    this.openApp(appName);
                    this.toggleStartMenu();
                }
            });
        });

        // Wallpaper gallery
        document.getElementById('closeWallpaperGallery').addEventListener('click', () => {
            this.toggleWallpaperGallery();
        });

        document.querySelectorAll('.wallpaper-item').forEach(item => {
            item.addEventListener('click', () => {
                const wallpaper = item.dataset.wallpaper;
                this.changeWallpaper(wallpaper);
            });
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Customization toggle
        document.getElementById('customizationToggle').addEventListener('click', () => {
            this.toggleCustomizationPanel();
        });

        // Voice Assistant toggle
        const voiceAssistantBtn = document.getElementById('voiceAssistantBtn');
        if (voiceAssistantBtn) {
            voiceAssistantBtn.addEventListener('click', () => {
                this.toggleVoiceAssistant();
            });
        }

        // Customization panel events
        document.getElementById('closeCustomizationPanel').addEventListener('click', () => {
            this.toggleCustomizationPanel();
        });

        document.getElementById('applyCustomization').addEventListener('click', () => {
            this.applyCustomization();
        });

        document.getElementById('resetCustomization').addEventListener('click', () => {
            this.resetCustomization();
        });

        // Context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e);
        });

        // Close menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.start-menu') && !e.target.closest('.start-btn')) {
                this.closeStartMenu();
            }
            if (!e.target.closest('.wallpaper-gallery')) {
                this.closeWallpaperGallery();
            }
            this.hideContextMenu();
        });

        // Prevent default context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + Space: Toggle start menu
            if (e.ctrlKey && e.code === 'Space') {
                e.preventDefault();
                this.toggleStartMenu();
            }
            
            // Ctrl + W: Close active window
            if (e.ctrlKey && e.code === 'KeyW') {
                e.preventDefault();
                this.closeActiveWindow();
            }
            
            // Ctrl + D: Show desktop
            if (e.ctrlKey && e.code === 'KeyD') {
                e.preventDefault();
                this.showDesktop();
            }
            
            // Escape: Close menus
            if (e.code === 'Escape') {
                this.closeStartMenu();
                this.closeWallpaperGallery();
                this.hideContextMenu();
            }
        });
    }

    toggleIconSelection(icon) {
        if (this.selectedIcons.has(icon)) {
            this.selectedIcons.delete(icon);
            icon.classList.remove('selected');
        } else {
            this.selectedIcons.add(icon);
            icon.classList.add('selected');
        }
    }

    selectIcon(icon) {
        this.selectedIcons.add(icon);
        icon.classList.add('selected');
    }

    clearIconSelection() {
        this.selectedIcons.forEach(icon => {
            icon.classList.remove('selected');
        });
        this.selectedIcons.clear();
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    simulateWeather() {
        const weatherWidget = document.getElementById('weatherWidget');
        const weatherData = [
            { temp: '24°C', condition: 'sun', city: 'Tehran, Iran' },
            { temp: '18°C', condition: 'cloud-sun', city: 'Tehran, Iran' },
            { temp: '22°C', condition: 'cloud', city: 'Tehran, Iran' },
            { temp: '16°C', condition: 'rain', city: 'Tehran, Iran' }
        ];

        let currentIndex = 0;
        setInterval(() => {
            const weather = weatherData[currentIndex];
            const icon = weatherWidget.querySelector('i');
            const temp = weatherWidget.querySelector('.fw-bold');
            const city = weatherWidget.querySelector('.small');

            icon.className = `fas fa-${weather.condition} fa-2x text-warning`;
            temp.textContent = weather.temp;
            city.textContent = weather.city;

            currentIndex = (currentIndex + 1) % weatherData.length;
        }, 10000);
    }

    toggleWallpaperGallery() {
        const gallery = document.getElementById('wallpaperGallery');
        if (this.isWallpaperGalleryOpen) {
            this.closeWallpaperGallery();
        } else {
            this.openWallpaperGallery();
        }
    }

    openWallpaperGallery() {
        const gallery = document.getElementById('wallpaperGallery');
        gallery.classList.add('show');
        this.isWallpaperGalleryOpen = true;
    }

    closeWallpaperGallery() {
        const gallery = document.getElementById('wallpaperGallery');
        gallery.classList.remove('show');
        this.isWallpaperGalleryOpen = false;
    }

    changeWallpaper(wallpaperType) {
        const desktop = document.getElementById('desktop');
        const wallpapers = {
            'gradient1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'gradient2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'gradient3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'gradient4': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'gradient5': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'gradient6': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        };

        if (wallpapers[wallpaperType]) {
            desktop.style.background = wallpapers[wallpaperType];
            
            // Save wallpaper preference
            localStorage.setItem('osWallpaper', wallpaperType);
            
            this.showToast('Wallpaper changed successfully!', 'success');
            this.speakWithPersonality(`Wallpaper changed to ${wallpaperType}`, 'enthusiastic');
            this.closeWallpaperGallery();
        } else {
            this.showToast('Invalid wallpaper selection', 'error');
        }
    }

    toggleTheme() {
        const body = document.body;
        if (this.currentTheme === 'light') {
            body.setAttribute('data-theme', 'dark');
            this.currentTheme = 'dark';
            this.showToast('Dark theme activated', 'info');
            this.speakWithPersonality('Theme changed to dark mode', 'professional');
        } else {
            body.removeAttribute('data-theme');
            this.currentTheme = 'light';
            this.showToast('Light theme activated', 'info');
            this.speakWithPersonality('Theme changed to light mode', 'professional');
        }
        
        // Save theme preference
        localStorage.setItem('osTheme', this.currentTheme);
        
        // Update theme toggle icon
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            if (this.currentTheme === 'dark') {
                themeToggle.className = 'fas fa-sun';
                themeToggle.title = 'Switch to Light Theme';
            } else {
                themeToggle.className = 'fas fa-moon';
                themeToggle.title = 'Switch to Light Theme';
            }
        }
    }

    showContextMenu(e) {
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.display = 'block';
        contextMenu.style.left = e.pageX + 'px';
        contextMenu.style.top = e.pageY + 'px';

        // Setup context menu actions
        contextMenu.querySelectorAll('.context-menu-item').forEach(item => {
            item.onclick = () => {
                const action = item.dataset.action;
                this.handleContextMenuAction(action, e.target);
                this.hideContextMenu();
            };
        });
    }

    hideContextMenu() {
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.display = 'none';
    }

    handleContextMenuAction(action, target) {
        const icon = target.closest('.desktop-icon');
        if (!icon) return;
        
        switch (action) {
            case 'open':
                const appName = icon.dataset.app;
                const actionType = icon.dataset.action;
                
                if (appName) {
                    this.openApp(appName);
                } else if (actionType === 'wallpaper-gallery') {
                    this.toggleWallpaperGallery();
                }
                break;
                
            case 'properties':
                this.showPropertiesDialog(icon);
                break;
                
            case 'rename':
                this.showRenameDialog(icon);
                break;
                
            case 'delete':
                this.showDeleteDialog(icon);
                break;
        }
    }

    showPropertiesDialog(icon) {
        const appName = icon.dataset.app;
        const actionType = icon.dataset.action;
        
        let title, type, size, created, modified;
        
        if (appName) {
            title = appName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
            type = 'Application';
            size = '2.5 MB';
            created = '2024-01-01';
            modified = '2024-01-01';
        } else if (actionType === 'wallpaper-gallery') {
            title = 'Wallpapers';
            type = 'System Tool';
            size = '1.2 MB';
            created = '2024-01-01';
            modified = '2024-01-01';
        }
        
        const propertiesHTML = `
            <div class="properties-dialog">
                <h6><i class="fas fa-info-circle"></i> Properties</h6>
                <div class="properties-content">
                    <div class="property-item">
                        <span class="property-label">Name:</span>
                        <span class="property-value">${title}</span>
                    </div>
                    <div class="property-item">
                        <span class="property-label">Type:</span>
                        <span class="property-value">${type}</span>
                    </div>
                    <div class="property-item">
                        <span class="property-label">Size:</span>
                        <span class="property-value">${size}</span>
                    </div>
                    <div class="property-item">
                        <span class="property-label">Created:</span>
                        <span class="property-value">${created}</span>
                    </div>
                    <div class="property-item">
                        <span class="property-label">Modified:</span>
                        <span class="property-value">${modified}</span>
                    </div>
                </div>
                <div class="text-center mt-3">
                    <button class="btn btn-primary btn-sm" onclick="this.closest('.properties-dialog').remove()">
                        <i class="fas fa-check"></i> OK
                    </button>
                </div>
            </div>
        `;
        
        // Show properties dialog
        const dialog = document.createElement('div');
        dialog.className = 'modal-overlay';
        dialog.innerHTML = propertiesHTML;
        document.body.appendChild(dialog);
        
        // Close on overlay click
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
    }

    showRenameDialog(icon) {
        const currentName = icon.querySelector('span').textContent;
        
        const renameHTML = `
            <div class="rename-dialog">
                <h6><i class="fas fa-edit"></i> Rename</h6>
                <div class="rename-content">
                    <label class="form-label">New Name:</label>
                    <input type="text" class="form-control" id="newNameInput" value="${currentName}" maxlength="20">
                </div>
                <div class="text-center mt-3">
                    <button class="btn btn-primary btn-sm me-2" id="confirmRenameBtn">
                        <i class="fas fa-check"></i> Rename
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="this.closest('.rename-dialog').remove()">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </div>
        `;
        
        const dialog = document.createElement('div');
        dialog.className = 'modal-overlay';
        dialog.innerHTML = renameHTML;
        document.body.appendChild(dialog);
        
        const input = dialog.querySelector('#newNameInput');
        const confirmBtn = dialog.querySelector('#confirmRenameBtn');
        
        input.focus();
        input.select();
        
        confirmBtn.addEventListener('click', () => {
            const newName = input.value.trim();
            if (newName && newName !== currentName) {
                icon.querySelector('span').textContent = newName;
                this.showToast(`Renamed to: ${newName}`, 'success');
                dialog.remove();
            } else {
                this.showToast('Please enter a valid name', 'error');
            }
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                confirmBtn.click();
            }
        });
        
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
    }

    showDeleteDialog(icon) {
        const name = icon.querySelector('span').textContent;
        
        const deleteHTML = `
            <div class="delete-dialog">
                <h6><i class="fas fa-exclamation-triangle text-danger"></i> Delete</h6>
                <div class="delete-content">
                    <p>Are you sure you want to delete "<strong>${name}</strong>"?</p>
                    <p class="text-muted small">This action cannot be undone.</p>
                </div>
                <div class="text-center mt-3">
                    <button class="btn btn-danger btn-sm me-2" id="confirmDeleteBtn">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="this.closest('.delete-dialog').remove()">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </div>
        `;
        
        const dialog = document.createElement('div');
        dialog.className = 'modal-overlay';
        dialog.innerHTML = deleteHTML;
        document.body.appendChild(dialog);
        
        const confirmBtn = dialog.querySelector('#confirmDeleteBtn');
        
        confirmBtn.addEventListener('click', () => {
            icon.remove();
            this.showToast(`Deleted: ${name}`, 'success');
            dialog.remove();
        });
        
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
    }

    closeActiveWindow() {
        // Find the topmost window and close it
        const windows = document.querySelectorAll('.app-window');
        if (windows.length > 0) {
            const topWindow = Array.from(windows).reduce((top, current) => {
                return (parseInt(current.style.zIndex) || 0) > (parseInt(top.style.zIndex) || 0) ? current : top;
            });
            
            const appName = this.getAppNameFromWindow(topWindow);
            if (appName) {
                this.closeWindow(appName);
            }
        }
    }

    showDesktop() {
        // Minimize all windows
        this.runningApps.forEach((window, appName) => {
            this.minimizeWindow(window.id);
        });
        this.showToast('Desktop shown', 'info');
    }

    getAppNameFromWindow(windowElement) {
        for (const [appName, window] of this.runningApps) {
            if (window === windowElement) {
                return appName;
            }
        }
        return null;
    }

    toggleStartMenu() {
        const startMenu = document.getElementById('startMenu');
        if (this.isStartMenuOpen) {
            this.closeStartMenu();
        } else {
            this.openStartMenu();
        }
    }

    openStartMenu() {
        const startMenu = document.getElementById('startMenu');
        startMenu.classList.add('show');
        this.isStartMenuOpen = true;
    }

    closeStartMenu() {
        const startMenu = document.getElementById('startMenu');
        startMenu.classList.remove('show');
        this.isStartMenuOpen = false;
    }

    openApp(appName) {
        if (this.runningApps.has(appName)) {
            this.focusApp(appName);
            return;
        }

        const appWindow = this.createAppWindow(appName);
        this.runningApps.set(appName, appWindow);
        this.addToTaskbar(appName, appWindow);
        this.showToast(`${appName} opened successfully!`, 'info');
        
        // Voice feedback with personality
        const appNames = {
            'file-explorer': 'File Explorer',
            'browser': 'Web Browser',
            'settings': 'System Settings',
            'notepad': 'Notepad',
            'calculator': 'Calculator'
        };
        const displayName = appNames[appName] || appName;
        
        // Random welcome messages for apps
        const appMessages = [
            `Opening ${displayName} for you!`,
            `Let's explore ${displayName} together!`,
            `${displayName} is ready to serve you!`,
            `Welcome to ${displayName}!`,
            `Your ${displayName} is launching!`,
            `Ready to work with ${displayName}!`,
            `Let's get started with ${displayName}!`,
            `${displayName} is now at your service!`,
            `Time to work with ${displayName}!`,
            `${displayName} is ready when you are!`,
            `Let's dive into ${displayName}!`,
            `${displayName} is here to help you!`,
            `Your personal ${displayName} is ready!`,
            `Let's make magic with ${displayName}!`,
            `Time to unleash the power of ${displayName}!`,
            `${displayName} is your digital companion!`,
            `Let's create something amazing with ${displayName}!`,
            `${displayName} is ready to inspire you!`,
            `Your ${displayName} adventure begins now!`,
            `Let's unlock the potential of ${displayName}!`,
            `Time to experience the magic of ${displayName}!`,
            `${displayName} is your gateway to creativity!`,
            `Let's embark on a ${displayName} journey!`,
            `${displayName} is your digital canvas!`,
            `Time to discover the wonders of ${displayName}!`,
            `${displayName} is your innovation hub!`,
            `Let's transform ideas with ${displayName}!`,
            `${displayName} is your productivity partner!`,
            `Time to build something incredible with ${displayName}!`,
            `${displayName} is your creative sanctuary!`,
            `Let's make dreams reality with ${displayName}!`,
            `${displayName} is your success catalyst!`,
            `Time to create your masterpiece with ${displayName}!`,
            `${displayName} is your digital destiny!`,
            `Let's write your story with ${displayName}!`,
            `${displayName} is your infinite possibility!`,
            `Time to shape the future with ${displayName}!`,
            `${displayName} is your ultimate tool!`,
            `Let's conquer the digital world with ${displayName}!`,
            `${displayName} is your power unleashed!`,
            `Time to revolutionize with ${displayName}!`,
            `${displayName} is your digital revolution!`,
            `Let's make history with ${displayName}!`,
            `${displayName} is your legacy builder!`
        ];
        const randomMessage = appMessages[Math.floor(Math.random() * appMessages.length)];
        this.speakWithPersonality(randomMessage, 'enthusiastic');
    }

    createAppWindow(appName) {
        const windowId = `window-${++this.windowCounter}`;
        const appWindow = document.createElement('div');
        appWindow.className = 'app-window';
        appWindow.id = windowId;
        appWindow.style.left = '50px';
        appWindow.style.top = '50px';
        appWindow.style.width = '600px';
        appWindow.style.height = '400px';

        const content = this.getAppContent(appName);
        appWindow.innerHTML = `
            <div class="window-header">
                <div class="window-title">
                    <i class="${content.icon}"></i>
                    ${content.title}
                </div>
                <div class="window-controls">
                    <div class="window-control minimize" data-action="minimize" data-window="${windowId}"></div>
                    <div class="window-control maximize" data-action="maximize" data-window="${windowId}"></div>
                    <div class="window-control close" data-action="close" data-window="${windowId}" data-app="${appName}"></div>
                </div>
            </div>
            <div class="window-content">
                ${content.html}
            </div>
        `;

        // Make window draggable
        this.makeWindowDraggable(appWindow);

        // Setup window controls
        this.setupWindowControls(appWindow, appName);

        // Setup app-specific functionality
        this.setupAppFunctionality(appWindow, appName);

        document.getElementById('appWindows').appendChild(appWindow);
        return appWindow;
    }

    setupAppFunctionality(appWindow, appName) {
        switch (appName) {
            case 'file-explorer':
                this.setupFileExplorer(appWindow);
                break;
            case 'browser':
                this.setupBrowser(appWindow);
                break;
            case 'settings':
                this.setupSettings(appWindow);
                break;
        }
    }

    setupFileExplorer(appWindow) {
        const filesGrid = appWindow.querySelector('#filesGrid');
        const sidebarLinks = appWindow.querySelectorAll('.sidebar a');
        
        // Sample files data
        const filesData = {
            home: [
                { name: 'Documents', type: 'folder', icon: 'fas fa-folder', size: '--' },
                { name: 'Downloads', type: 'folder', icon: 'fas fa-folder', size: '--' },
                { name: 'Pictures', type: 'folder', icon: 'fas fa-folder', size: '--' },
                { name: 'Music', type: 'folder', icon: 'fas fa-folder', size: '--' },
                { name: 'Videos', type: 'folder', icon: 'fas fa-folder', size: '--' }
            ],
            desktop: [
                { name: 'File Explorer', type: 'app', icon: 'fas fa-folder', size: '2.5 MB' },
                { name: 'Notepad', type: 'app', icon: 'fas fa-sticky-note', size: '1.8 MB' },
                { name: 'Calculator', type: 'app', icon: 'fas fa-calculator', size: '3.2 MB' },
                { name: 'Browser', type: 'app', icon: 'fas fa-globe', size: '4.1 MB' }
            ],
            documents: [
                { name: 'Project Report.docx', type: 'document', icon: 'fas fa-file-word', size: '2.3 MB' },
                { name: 'Budget.xlsx', type: 'spreadsheet', icon: 'fas fa-file-excel', size: '1.7 MB' },
                { name: 'Presentation.pptx', type: 'presentation', icon: 'fas fa-file-powerpoint', size: '5.2 MB' },
                { name: 'Notes.txt', type: 'text', icon: 'fas fa-file-alt', size: '0.1 MB' }
            ],
            downloads: [
                { name: 'image.jpg', type: 'image', icon: 'fas fa-file-image', size: '3.8 MB' },
                { name: 'video.mp4', type: 'video', icon: 'fas fa-file-video', size: '15.7 MB' },
                { name: 'archive.zip', type: 'archive', icon: 'fas fa-file-archive', size: '8.9 MB' },
                { name: 'document.pdf', type: 'pdf', icon: 'fas fa-file-pdf', size: '2.1 MB' }
            ]
        };

        const renderFiles = (path) => {
            // Get files from both static data and dynamic file system
            const staticFiles = filesData[path] || [];
            const dynamicFiles = this.fileSystem.get(path) || [];
            const allFiles = [...staticFiles, ...dynamicFiles];
            
            filesGrid.innerHTML = '';
            
            allFiles.forEach(file => {
                const fileElement = document.createElement('div');
                fileElement.className = 'file-item';
                fileElement.innerHTML = `
                    <div class="file-icon">
                        <i class="${file.icon}"></i>
                    </div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${file.size}</div>
                `;
                
                if (file.type === 'folder') {
                    fileElement.addEventListener('click', () => {
                        this.currentPath = file.name.toLowerCase();
                        renderFiles(file.name.toLowerCase());
                        appWindow.querySelector('#currentPath').textContent = file.name;
                    });
                }
                
                filesGrid.appendChild(fileElement);
            });
        };

        // Initialize with home
        this.currentPath = 'home';
        renderFiles('home');

        // Handle sidebar navigation
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all links
                sidebarLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                const path = link.dataset.path;
                this.currentPath = path;
                renderFiles(path);
                appWindow.querySelector('#currentPath').textContent = link.textContent.trim();
            });
        });

        // Handle toolbar buttons
        const newFolderBtn = appWindow.querySelector('#newFolderBtn');
        const newFileBtn = appWindow.querySelector('#newFileBtn');
        const copyBtn = appWindow.querySelector('#copyBtn');
        const cutBtn = appWindow.querySelector('#cutBtn');
        const pasteBtn = appWindow.querySelector('#pasteBtn');

        newFolderBtn.addEventListener('click', () => {
            const folderName = prompt('Enter folder name:');
            if (folderName && folderName.trim()) {
                // Create folder object
                const newFolder = {
                    name: folderName,
                    type: 'folder',
                    icon: 'fas fa-folder',
                    size: '--',
                    path: this.currentPath,
                    created: new Date().toISOString()
                };
                
                // Add to file system
                if (!this.fileSystem.has(this.currentPath)) {
                    this.fileSystem.set(this.currentPath, []);
                }
                this.fileSystem.get(this.currentPath).push(newFolder);
                
                // Re-render files to show the new folder
                renderFiles(this.currentPath);
                
                // Show success message
                this.showToast(`Created folder: ${folderName}`, 'success');
                
                // Voice feedback with personality
                this.speakWithPersonality(`Folder ${folderName} created successfully!`, 'friendly');
            }
        });

        newFileBtn.addEventListener('click', () => {
            const fileName = prompt('Enter file name:');
            if (fileName && fileName.trim()) {
                // Create file object
                const newFile = {
                    name: fileName,
                    type: 'file',
                    icon: 'fas fa-file',
                    size: '0 KB',
                    path: this.currentPath,
                    created: new Date().toISOString()
                };
                
                // Add to file system
                if (!this.fileSystem.has(this.currentPath)) {
                    this.fileSystem.set(this.currentPath, []);
                }
                this.fileSystem.get(this.currentPath).push(newFile);
                
                // Re-render files to show the new file
                renderFiles(this.currentPath);
                
                // Show success message
                this.showToast(`Created file: ${fileName}`, 'success');
                
                // Voice feedback with personality
                this.speakWithPersonality(`File ${fileName} created successfully!`, 'friendly');
            }
        });

        copyBtn.addEventListener('click', () => this.showToast('Copy feature activated', 'info'));
        cutBtn.addEventListener('click', () => this.showToast('Cut feature activated', 'info'));
        pasteBtn.addEventListener('click', () => this.showToast('Paste feature activated', 'info'));
    }

    setupBrowser(appWindow) {
        const urlInput = appWindow.querySelector('#urlInput');
        const goBtn = appWindow.querySelector('#goBtn');
        const backBtn = appWindow.querySelector('#backBtn');
        const forwardBtn = appWindow.querySelector('#forwardBtn');
        const refreshBtn = appWindow.querySelector('#refreshBtn');
        const homeBtn = appWindow.querySelector('#homeBtn');
        const bookmarkBtn = appWindow.querySelector('#bookmarkBtn');
        const settingsBtn = appWindow.querySelector('#settingsBtn');
        const browserFrame = appWindow.querySelector('#browserFrame');
        const quickLinks = appWindow.querySelectorAll('.quick-links button');

        // Handle URL navigation
        function navigateToUrl(url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            
            // Simulate loading
            browserFrame.innerHTML = `
                <div class="browser-loading">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading ${url}</p>
                </div>
            `;
            
            setTimeout(() => {
                browserFrame.innerHTML = `
                    <div class="browser-content-simulated">
                        <div class="browser-header">
                            <h4>${url}</h4>
                            <p>This is a simulated browser view. In a real application, this would show the actual webpage.</p>
                        </div>
                        <div class="browser-body">
                            <h5>Welcome to ${url}</h5>
                            <p>This is a demonstration of the browser functionality in the OS Simulator.</p>
                            <div class="browser-features">
                                <div class="feature-item">
                                    <i class="fas fa-search"></i>
                                    <span>Search functionality</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-bookmark"></i>
                                    <span>Bookmark management</span>
                                </div>
                                <div class="feature-item">
                                    <i class="fas fa-history"></i>
                                    <span>Browsing history</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }, 1500);
        }

        goBtn.addEventListener('click', () => {
            const url = urlInput.value.trim();
            if (url) {
                navigateToUrl(url);
            }
        });

        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                goBtn.click();
            }
        });

        backBtn.addEventListener('click', () => this.showToast('Back button clicked', 'info'));
        forwardBtn.addEventListener('click', () => this.showToast('Forward button clicked', 'info'));
        refreshBtn.addEventListener('click', () => {
            const url = urlInput.value.trim();
            if (url) {
                navigateToUrl(url);
            }
        });
        homeBtn.addEventListener('click', () => {
            urlInput.value = 'https://www.google.com';
            navigateToUrl('https://www.google.com');
        });
        bookmarkBtn.addEventListener('click', () => this.showToast('Page bookmarked!', 'success'));
        settingsBtn.addEventListener('click', () => this.showToast('Browser settings opened', 'info'));

        // Handle quick links
        quickLinks.forEach(link => {
            link.addEventListener('click', () => {
                const url = link.dataset.url;
                urlInput.value = url;
                navigateToUrl(url);
            });
        });
    }

    setupSettings(appWindow) {
        const settingsNav = appWindow.querySelectorAll('#settingsNav a');
        const settingsSections = appWindow.querySelectorAll('.settings-section');
        const themeSelect = appWindow.querySelector('#themeSelect');
        const animSpeedSelect = appWindow.querySelector('#animSpeedSelect');
        const notificationsToggle = appWindow.querySelector('#notificationsToggle');
        const changeWallpaperBtn = appWindow.querySelector('#changeWallpaperBtn');
        const iconSizeSelect = appWindow.querySelector('#iconSizeSelect');
        const taskbarHeightRange = appWindow.querySelector('#taskbarHeightRange');
        const currentTaskbarHeight = appWindow.querySelector('#currentTaskbarHeight');
        const languageSelect = appWindow.querySelector('#languageSelect');
        const dateFormatSelect = appWindow.querySelector('#dateFormatSelect');
        const timeFormatSelect = appWindow.querySelector('#timeFormatSelect');
        const applySystemSettings = appWindow.querySelector('#applySystemSettings');
        const applyLanguageSettings = appWindow.querySelector('#applyLanguageSettings');

        // Handle settings navigation
        settingsNav.forEach(nav => {
            nav.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all nav items
                settingsNav.forEach(n => n.classList.remove('active'));
                
                // Add active class to clicked nav
                nav.classList.add('active');
                
                // Hide all sections
                settingsSections.forEach(section => section.classList.remove('active'));
                
                // Show target section
                const targetSection = nav.dataset.section;
                const targetElement = appWindow.querySelector(`#${targetSection}Section`);
                if (targetElement) {
                    targetElement.classList.add('active');
                }
            });
        });

        // Handle system settings
        if (applySystemSettings) {
            applySystemSettings.addEventListener('click', () => {
                const theme = themeSelect.value;
                const animSpeed = animSpeedSelect.value;
                const notifications = notificationsToggle.checked;
                
                // Apply theme
                this.applyTheme(theme);
                
                // Apply animation speed
                this.applyAnimationSpeed(animSpeed);
                
                // Apply notifications setting
                localStorage.setItem('osNotifications', notifications);
                
                this.showToast('System settings applied successfully!', 'success');
            });
        }

        // Handle wallpaper change
        if (changeWallpaperBtn) {
            changeWallpaperBtn.addEventListener('click', () => {
                this.toggleWallpaperGallery();
            });
        }

        // Handle taskbar height
        if (taskbarHeightRange) {
            taskbarHeightRange.addEventListener('input', (e) => {
                const height = e.target.value;
                currentTaskbarHeight.textContent = height;
                this.applyTaskbarHeight(parseInt(height));
            });
        }

        // Handle language settings
        if (applyLanguageSettings) {
            applyLanguageSettings.addEventListener('click', () => {
                const language = languageSelect.value;
                const dateFormat = dateFormatSelect.value;
                const timeFormat = timeFormatSelect.value;
                
                // Save language preferences
                localStorage.setItem('osLanguage', language);
                localStorage.setItem('osDateFormat', dateFormat);
                localStorage.setItem('osTimeFormat', timeFormat);
                
                this.showToast('Language settings applied successfully!', 'success');
            });
        }

        // Load saved settings
        this.loadSettingsValues(appWindow);
    }

    loadSettingsValues(appWindow) {
        // Load theme
        const savedTheme = localStorage.getItem('osTheme') || 'light';
        const themeSelect = appWindow.querySelector('#themeSelect');
        if (themeSelect) {
            themeSelect.value = savedTheme;
        }

        // Load notifications setting
        const savedNotifications = localStorage.getItem('osNotifications') !== 'false';
        const notificationsToggle = appWindow.querySelector('#notificationsToggle');
        if (notificationsToggle) {
            notificationsToggle.checked = savedNotifications;
        }

        // Load language
        const savedLanguage = localStorage.getItem('osLanguage') || 'en';
        const languageSelect = appWindow.querySelector('#languageSelect');
        if (languageSelect) {
            languageSelect.value = savedLanguage;
        }

        // Load date format
        const savedDateFormat = localStorage.getItem('osDateFormat') || 'MM/DD/YYYY';
        const dateFormatSelect = appWindow.querySelector('#dateFormatSelect');
        if (dateFormatSelect) {
            dateFormatSelect.value = savedDateFormat;
        }

        // Load time format
        const savedTimeFormat = localStorage.getItem('osTimeFormat') || '24h';
        const timeFormatSelect = appWindow.querySelector('#timeFormatSelect');
        if (timeFormatSelect) {
            timeFormatSelect.value = savedTimeFormat;
        }
    }

    getAppContent(appName) {
        const apps = {
            'file-explorer': {
                title: 'File Explorer',
                icon: 'fas fa-folder',
                html: `
                    <div class="file-explorer-container">
                        <div class="toolbar mb-3">
                            <div class="btn-group" role="group">
                                <button class="btn btn-outline-primary btn-sm" id="backBtn">
                                    <i class="fas fa-arrow-left"></i>
                                </button>
                                <button class="btn btn-outline-primary btn-sm" id="forwardBtn">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                                <button class="btn btn-outline-primary btn-sm" id="upBtn">
                                    <i class="fas fa-arrow-up"></i>
                                </button>
                            </div>
                            <div class="btn-group ms-2" role="group">
                                <button class="btn btn-outline-success btn-sm" id="newFolderBtn">
                                    <i class="fas fa-folder-plus"></i> New Folder
                                </button>
                                <button class="btn btn-outline-info btn-sm" id="newFileBtn">
                                    <i class="fas fa-file-plus"></i> New File
                                </button>
                            </div>
                            <div class="btn-group ms-2" role="group">
                                <button class="btn btn-outline-warning btn-sm" id="copyBtn">
                                    <i class="fas fa-copy"></i>
                                </button>
                                <button class="btn btn-outline-warning btn-sm" id="cutBtn">
                                    <i class="fas fa-cut"></i>
                                </button>
                                <button class="btn btn-outline-success btn-sm" id="pasteBtn">
                                    <i class="fas fa-paste"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-3">
                                <div class="sidebar">
                                    <div class="list-group">
                                        <a href="#" class="list-group-item list-group-item-action active" data-path="home">
                                            <i class="fas fa-home"></i> Home
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action" data-path="desktop">
                                            <i class="fas fa-desktop"></i> Desktop
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action" data-path="documents">
                                            <i class="fas fa-file-alt"></i> Documents
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action" data-path="downloads">
                                            <i class="fas fa-download"></i> Downloads
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action" data-path="pictures">
                                            <i class="fas fa-images"></i> Pictures
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action" data-path="music">
                                            <i class="fas fa-music"></i> Music
                                        </a>
                                        <a href="#" class="list-group-item list-group-item-action" data-path="videos">
                                            <i class="fas fa-video"></i> Videos
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div class="content-area">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h6 id="currentPath">Home</h6>
                                        <div class="view-options">
                                            <button class="btn btn-outline-secondary btn-sm" id="gridViewBtn">
                                                <i class="fas fa-th"></i>
                                            </button>
                                            <button class="btn btn-outline-secondary btn-sm" id="listViewBtn">
                                                <i class="fas fa-list"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="files-grid" id="filesGrid">
                                        <!-- Files will be populated here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            'notepad': {
                title: 'Notepad',
                icon: 'fas fa-sticky-note',
                html: `
                    <div class="mb-3">
                        <div class="btn-group" role="group">
                            <button class="btn btn-outline-secondary btn-sm">
                                <i class="fas fa-file"></i> File
                            </button>
                            <button class="btn btn-outline-secondary btn-sm">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-outline-secondary btn-sm">
                                <i class="fas fa-search"></i> Search
                            </button>
                        </div>
                    </div>
                    <textarea class="form-control selectable" rows="15" placeholder="Start typing here..."></textarea>
                `
            },
            'calculator': {
                title: 'Calculator',
                icon: 'fas fa-calculator',
                html: `
                    <div class="calculator">
                        <div class="form-control mb-3 text-end" style="font-size: 24px; height: 60px;" id="calcDisplay">0</div>
                        <div class="row g-2">
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="clear">C</button></div>
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="backspace">⌫</button></div>
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="%">%</button></div>
                            <div class="col-3"><button class="btn btn-warning btn-lg w-100" data-calc="/">÷</button></div>
                            
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="7">7</button></div>
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="8">8</button></div>
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="9">9</button></div>
                            <div class="col-3"><button class="btn btn-warning btn-lg w-100" data-calc="*">×</button></div>
                            
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="4">4</button></div>
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="5">5</button></div>
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="6">6</button></div>
                            <div class="col-3"><button class="btn btn-warning btn-lg w-100" data-calc="-">−</button></div>
                            
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="1">1</button></div>
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="2">2</button></div>
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc="3">3</button></div>
                            <div class="col-3"><button class="btn btn-warning btn-lg w-100" data-calc="+">+</button></div>
                            
                            <div class="col-6"><button class="btn btn-light btn-lg w-100" data-calc="0">0</button></div>
                            <div class="col-3"><button class="btn btn-light btn-lg w-100" data-calc=".">.</button></div>
                            <div class="col-3"><button class="btn btn-success btn-lg w-100" data-calc="=">=</button></div>
                        </div>
                    </div>
                `
            },
            'browser': {
                title: 'Web Browser',
                icon: 'fas fa-globe',
                html: `
                    <div class="browser-container">
                        <div class="browser-toolbar mb-3">
                            <div class="btn-group me-2" role="group">
                                <button class="btn btn-outline-secondary btn-sm" id="backBtn">
                                    <i class="fas fa-arrow-left"></i>
                                </button>
                                <button class="btn btn-outline-secondary btn-sm" id="forwardBtn">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                                <button class="btn btn-outline-secondary btn-sm" id="refreshBtn">
                                    <i class="fas fa-redo"></i>
                                </button>
                                <button class="btn btn-outline-secondary btn-sm" id="homeBtn">
                                    <i class="fas fa-home"></i>
                                </button>
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control" id="urlInput" placeholder="Enter URL or search..." value="https://www.google.com">
                                <button class="btn btn-primary" id="goBtn">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                            <div class="btn-group ms-2" role="group">
                                <button class="btn btn-outline-info btn-sm" id="bookmarkBtn">
                                    <i class="fas fa-bookmark"></i>
                                </button>
                                <button class="btn btn-outline-secondary btn-sm" id="settingsBtn">
                                    <i class="fas fa-cog"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="browser-content">
                            <div class="browser-tabs mb-2">
                                <div class="nav nav-tabs" id="browserTabs" role="tablist">
                                    <button class="nav-link active" id="tab1" data-bs-toggle="tab" data-bs-target="#content1" type="button" role="tab">
                                        <i class="fas fa-globe"></i> Google
                                        <button type="button" class="btn-close ms-2" aria-label="Close"></button>
                                    </button>
                                    <button class="nav-link" id="newTabBtn" type="button">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="tab-content" id="browserTabContent">
                                <div class="tab-pane fade show active" id="content1" role="tabpanel">
                                    <div class="browser-frame" id="browserFrame">
                                        <div class="browser-placeholder">
                                            <i class="fas fa-globe fa-4x text-primary mb-3"></i>
                                            <h5>Welcome to Web Browser</h5>
                                            <p class="text-muted">Enter a URL above and click Go to navigate</p>
                                            <div class="quick-links mt-3">
                                                <button class="btn btn-outline-primary btn-sm me-2" data-url="https://www.google.com">Google</button>
                                                <button class="btn btn-outline-primary btn-sm me-2" data-url="https://www.github.com">GitHub</button>
                                                <button class="btn btn-outline-primary btn-sm me-2" data-url="https://www.stackoverflow.com">Stack Overflow</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            'settings': {
                title: 'Settings',
                icon: 'fas fa-cog',
                html: `
                    <div class="settings-container">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="list-group" id="settingsNav">
                                    <a href="#" class="list-group-item list-group-item-action active" data-section="system">
                                        <i class="fas fa-desktop"></i> System
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action" data-section="personalization">
                                        <i class="fas fa-palette"></i> Personalization
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action" data-section="privacy">
                                        <i class="fas fa-shield-alt"></i> Privacy
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action" data-section="network">
                                        <i class="fas fa-network-wired"></i> Network
                                    </a>
                                    <a href="#" class="list-group-item list-group-item-action" data-section="language">
                                        <i class="fas fa-language"></i> Language
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div id="settingsContent">
                                    <!-- System Settings -->
                                    <div class="settings-section active" id="systemSection">
                                        <h6><i class="fas fa-desktop"></i> System Settings</h6>
                                        <div class="mb-3">
                                            <label class="form-label">Theme</label>
                                            <select class="form-select" id="themeSelect">
                                                <option value="light">Light</option>
                                                <option value="dark">Dark</option>
                                                <option value="auto">Auto</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Animation Speed</label>
                                            <select class="form-select" id="animSpeedSelect">
                                                <option value="slow">Slow</option>
                                                <option value="normal" selected>Normal</option>
                                                <option value="fast">Fast</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Notifications</label>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="notificationsToggle" checked>
                                                <label class="form-check-label">Enable notifications</label>
                                            </div>
                                        </div>
                                        <button class="btn btn-primary" id="applySystemSettings">
                                            <i class="fas fa-save"></i> Apply Settings
                                        </button>
                                    </div>
                                    
                                    <!-- Personalization Settings -->
                                    <div class="settings-section" id="personalizationSection">
                                        <h6><i class="fas fa-palette"></i> Personalization</h6>
                                        <div class="mb-3">
                                            <label class="form-label">Wallpaper</label>
                                            <button class="btn btn-outline-primary" id="changeWallpaperBtn">
                                                <i class="fas fa-images"></i> Change Wallpaper
                                            </button>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Icon Size</label>
                                            <select class="form-select" id="iconSizeSelect">
                                                <option value="small">Small</option>
                                                <option value="medium" selected>Medium</option>
                                                <option value="large">Large</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Taskbar Height</label>
                                            <input type="range" class="form-range" id="taskbarHeightRange" min="50" max="80" value="60">
                                            <small class="text-muted">Current: <span id="currentTaskbarHeight">60</span>px</small>
                                        </div>
                                    </div>
                                    
                                    <!-- Language Settings -->
                                    <div class="settings-section" id="languageSection">
                                        <h6><i class="fas fa-language"></i> Language Settings</h6>
                                        <div class="mb-3">
                                            <label class="form-label">Interface Language</label>
                                            <select class="form-select" id="languageSelect">
                                                <option value="en" selected>English</option>
                                                <option value="fa">فارسی</option>
                                                <option value="ar">العربية</option>
                                                <option value="tr">Türkçe</option>
                                                <option value="fr">Français</option>
                                                <option value="de">Deutsch</option>
                                                <option value="es">Español</option>
                                                <option value="it">Italiano</option>
                                                <option value="ru">Русский</option>
                                                <option value="zh">中文</option>
                                                <option value="ja">日本語</option>
                                                <option value="ko">한국어</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Date Format</label>
                                            <select class="form-select" id="dateFormatSelect">
                                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Time Format</label>
                                            <select class="form-select" id="timeFormatSelect">
                                                <option value="12h">12-hour</option>
                                                <option value="24h" selected>24-hour</option>
                                            </select>
                                        </div>
                                        <button class="btn btn-primary" id="applyLanguageSettings">
                                            <i class="fas fa-save"></i> Apply Language Settings
                                        </button>
                                    </div>
                                    
                                    <!-- Privacy Settings -->
                                    <div class="settings-section" id="privacySection">
                                        <h6><i class="fas fa-shield-alt"></i> Privacy Settings</h6>
                                        <div class="mb-3">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="telemetryToggle">
                                                <label class="form-check-label">Allow telemetry and usage data</label>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="locationToggle">
                                                <label class="form-check-label">Allow location access</label>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="cameraToggle">
                                                <label class="form-check-label">Allow camera access</label>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Network Settings -->
                                    <div class="settings-section" id="networkSection">
                                        <h6><i class="fas fa-network-wired"></i> Network Settings</h6>
                                        <div class="mb-3">
                                            <label class="form-label">WiFi</label>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="wifiToggle" checked>
                                                <label class="form-check-label">Enable WiFi</label>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Bluetooth</label>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="bluetoothToggle">
                                                <label class="form-check-label">Enable Bluetooth</label>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label class="form-label">Airplane Mode</label>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="airplaneToggle">
                                                <label class="form-check-label">Enable Airplane Mode</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            'music-player': {
                title: 'Music Player',
                icon: 'fas fa-music',
                html: `
                    <div class="text-center mb-4">
                        <div class="mb-3">
                            <i class="fas fa-music fa-4x text-primary"></i>
                        </div>
                        <h5>Now Playing</h5>
                        <p class="text-muted">Beautiful Day - U2</p>
                    </div>
                    <div class="mb-3">
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar" role="progressbar" style="width: 45%"></div>
                        </div>
                        <div class="d-flex justify-content-between mt-2">
                            <small>2:15</small>
                            <small>5:00</small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center gap-3">
                        <button class="btn btn-outline-primary">
                            <i class="fas fa-step-backward"></i>
                        </button>
                        <button class="btn btn-primary btn-lg">
                            <i class="fas fa-pause"></i>
                        </button>
                        <button class="btn btn-outline-primary">
                            <i class="fas fa-step-forward"></i>
                        </button>
                    </div>
                    <div class="mt-4">
                        <h6>Playlist</h6>
                        <div class="list-group">
                            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <span>Beautiful Day</span>
                                <span class="badge bg-primary rounded-pill">3:45</span>
                            </div>
                            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <span>With or Without You</span>
                                <span class="badge bg-primary rounded-pill">4:56</span>
                            </div>
                            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <span>One</span>
                                <span class="badge bg-primary rounded-pill">4:36</span>
                            </div>
                        </div>
                    </div>
                `
            },
            'system-monitor': {
                title: 'System Monitor',
                icon: 'fas fa-chart-line',
                html: `
                    <div class="row">
                        <div class="col-md-6 mb-4">
                            <div class="card">
                                <div class="card-body text-center">
                                    <h6 class="card-title">CPU Usage</h6>
                                    <div class="display-6 text-primary">67%</div>
                                    <div class="progress mt-2">
                                        <div class="progress-bar bg-primary" style="width: 67%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <div class="card">
                                <div class="card-body text-center">
                                    <h6 class="card-title">Memory Usage</h6>
                                    <div class="display-6 text-success">42%</div>
                                    <div class="progress mt-2">
                                        <div class="progress-bar bg-success" style="width: 42%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <div class="card">
                                <div class="card-body text-center">
                                    <h6 class="card-title">Disk Usage</h6>
                                    <div class="display-6 text-warning">78%</div>
                                    <div class="progress mt-2">
                                        <div class="progress-bar bg-warning" style="width: 78%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-4">
                            <div class="card">
                                <div class="card-body text-center">
                                    <h6 class="card-title">Network</h6>
                                    <div class="display-6 text-info">23%</div>
                                    <div class="progress mt-2">
                                        <div class="progress-bar bg-info" style="width: 23%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h6>Running Processes</h6>
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Process</th>
                                        <th>CPU</th>
                                        <th>Memory</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>OS Simulator</td>
                                        <td>15%</td>
                                        <td>128 MB</td>
                                        <td><span class="badge bg-success">Running</span></td>
                                    </tr>
                                    <tr>
                                        <td>System</td>
                                        <td>8%</td>
                                        <td>256 MB</td>
                                        <td><span class="badge bg-success">Running</span></td>
                                    </tr>
                                    <tr>
                                        <td>Explorer</td>
                                        <td>5%</td>
                                        <td>64 MB</td>
                                        <td><span class="badge bg-success">Running</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `
            }
        };

        return apps[appName] || {
            title: 'Unknown App',
            icon: 'fas fa-question',
            html: '<p>App content not available</p>'
        };
    }

    makeWindowDraggable(windowElement) {
        const header = windowElement.querySelector('.window-header');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            initialX = e.clientX - windowElement.offsetLeft;
            initialY = e.clientY - windowElement.offsetTop;
            header.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                // Keep window within bounds
                currentX = Math.max(0, Math.min(currentX, window.innerWidth - windowElement.offsetWidth));
                currentY = Math.max(0, Math.min(currentY, window.innerHeight - windowElement.offsetHeight));
                
                windowElement.style.left = currentX + 'px';
                windowElement.style.top = currentY + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            header.style.cursor = 'grab';
        });
    }

    setupWindowControls(windowElement, appName) {
        const controls = windowElement.querySelectorAll('.window-control');
        controls.forEach(control => {
            control.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                const windowId = e.currentTarget.dataset.window;
                
                switch (action) {
                    case 'minimize':
                        this.minimizeWindow(windowId);
                        break;
                    case 'maximize':
                        this.maximizeWindow(windowId);
                        break;
                    case 'close':
                        this.closeWindow(appName);
                        break;
                }
            });
        });

        // Setup calculator functionality
        if (appName === 'calculator') {
            this.setupCalculator(windowElement);
        }
    }

    setupCalculator(windowElement) {
        const buttons = windowElement.querySelectorAll('[data-calc]');
        let display = windowElement.querySelector('#calcDisplay');
        let currentValue = '0';
        let previousValue = null;
        let operation = null;

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.dataset.calc;
                
                switch (value) {
                    case 'clear':
                        currentValue = '0';
                        previousValue = null;
                        operation = null;
                        break;
                    case 'backspace':
                        currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
                        break;
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                    case '%':
                        if (previousValue !== null) {
                            currentValue = this.calculate(previousValue, currentValue, operation);
                        }
                        previousValue = currentValue;
                        operation = value;
                        currentValue = '0';
                        break;
                    case '=':
                        if (previousValue !== null && operation !== null) {
                            currentValue = this.calculate(previousValue, currentValue, operation);
                            previousValue = null;
                            operation = null;
                        }
                        break;
                    case '.':
                        if (!currentValue.includes('.')) {
                            currentValue += '.';
                        }
                        break;
                    default:
                        if (currentValue === '0') {
                            currentValue = value;
                        } else {
                            currentValue += value;
                        }
                }
                
                display.textContent = currentValue;
            });
        });
    }

    calculate(a, b, operation) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        
        switch (operation) {
            case '+': return (numA + numB).toString();
            case '-': return (numA - numB).toString();
            case '*': return (numA * numB).toString();
            case '/': return numB !== 0 ? (numA / numB).toString() : 'Error';
            case '%': return (numA % numB).toString();
            default: return b;
        }
    }

    minimizeWindow(windowId) {
        const window = document.getElementById(windowId);
        window.style.display = 'none';
        
        // Find the app name for this window
        let appName = null;
        for (const [name, win] of this.runningApps) {
            if (win.id === windowId) {
                appName = name;
                break;
            }
        }
        
        if (appName) {
            // Update taskbar app to show minimized state
            const taskbarApp = document.querySelector(`[data-app="${appName}"]`);
            if (taskbarApp) {
                taskbarApp.classList.add('minimized');
            }
        }
        
        this.showToast('Window minimized', 'info');
    }

    maximizeWindow(windowId) {
        const window = document.getElementById(windowId);
        if (window.classList.contains('maximized')) {
            window.classList.remove('maximized');
            window.style.width = '600px';
            window.style.height = '400px';
            window.style.left = '50px';
            window.style.top = '50px';
        } else {
            window.classList.add('maximized');
            window.style.width = '100%';
            window.style.height = 'calc(100vh - 60px)';
            window.style.left = '0';
            window.style.top = '0';
        }
    }

    closeWindow(appName) {
        const window = this.runningApps.get(appName);
        if (window) {
            window.remove();
            this.runningApps.delete(appName);
            this.removeFromTaskbar(appName);
            this.showToast(`${appName} closed`, 'info');
        }
    }

    focusApp(appName) {
        const window = this.runningApps.get(appName);
        if (window) {
            window.style.zIndex = '201';
            this.showToast(`${appName} focused`, 'info');
        }
    }

    addToTaskbar(appName, windowElement) {
        const taskbarApps = document.getElementById('taskbarApps');
        const taskbarApp = document.createElement('div');
        taskbarApp.className = 'taskbar-app glass';
        taskbarApp.setAttribute('data-app', appName);
        taskbarApp.innerHTML = `<i class="${this.getAppContent(appName).icon}"></i>`;
        
        // Handle click to restore/focus window
        taskbarApp.addEventListener('click', () => {
            if (windowElement.style.display === 'none') {
                // Window is minimized, restore it
                windowElement.style.display = 'block';
                windowElement.style.zIndex = '201';
                taskbarApp.classList.remove('minimized');
                this.showToast(`${appName} restored`, 'info');
            } else {
                // Window is visible, focus it
                this.focusApp(appName);
            }
        });
        
        taskbarApps.appendChild(taskbarApp);
    }

    removeFromTaskbar(appName) {
        const taskbarApps = document.getElementById('taskbarApps');
        const appIcon = taskbarApps.querySelector(`[data-app="${appName}"]`);
        if (appIcon) {
            appIcon.remove();
        }
    }

    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toastId = 'toast-' + Date.now();
        
        const toast = document.createElement('div');
        toast.className = `toast show`;
        toast.id = toastId;
        
        const bgClass = {
            'success': 'bg-success',
            'error': 'bg-danger',
            'warning': 'bg-warning',
            'info': 'bg-info'
        }[type] || 'bg-info';
        
        toast.innerHTML = `
            <div class="toast-header ${bgClass} text-white">
                <i class="fas fa-info-circle me-2"></i>
                <strong class="me-auto">Advanced OS Simulator</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.add('hide');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.remove();
                    }
                }, 400);
            }
        }, 3000);
    }

    updateClock() {
        const clock = document.getElementById('clock');
        const now = new Date();
        
        // Update time
        const timeElement = clock.querySelector('.time');
        if (timeElement) {
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            });
            timeElement.textContent = timeString;
        }
        
        // Update date
        const dateElement = clock.querySelector('.date');
        if (dateElement) {
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
            dateElement.textContent = dateString;
        }
    }

    setupClockInterval() {
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }

    shutdown() {
        this.showToast('Shutting down...', 'warning');
        setTimeout(() => {
            if (window.electronAPI && window.electronAPI.platform !== 'darwin') {
                window.close();
            }
        }, 2000);
    }

    // Canvas Background Animation
    initCanvas() {
        const canvas = document.getElementById('canvasBackground');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particles = [];
        const particleCount = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const distance = Math.sqrt(
                        Math.pow(particle.x - otherParticle.x, 2) + 
                        Math.pow(particle.y - otherParticle.y, 2)
                    );
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Initialize AOS
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
        }
    }

    // Customization Panel
    toggleCustomizationPanel() {
        const panel = document.getElementById('customizationPanel');
        if (panel.classList.contains('show')) {
            panel.classList.remove('show');
        } else {
            panel.classList.add('show');
        }
    }

    // Load customization settings
    loadCustomizationSettings() {
        const settings = JSON.parse(localStorage.getItem('osCustomization') || '{}');
        
        // Load theme
        if (settings.colorScheme) {
            this.applyTheme(settings.colorScheme);
        }
        
        // Load animation speed
        if (settings.animationSpeed) {
            document.getElementById('animationSpeed').value = settings.animationSpeed;
            this.applyAnimationSpeed(settings.animationSpeed);
        }
        
        // Load blur intensity
        if (settings.blurIntensity) {
            document.getElementById('blurIntensity').value = settings.blurIntensity;
            this.applyBlurIntensity(settings.blurIntensity);
            this.updateBlurValue(settings.blurIntensity);
        }
        
        // Load particle count
        if (settings.particleCount) {
            document.getElementById('particleCount').value = settings.particleCount;
            this.updateParticleCount(settings.particleCount);
            this.updateParticleValue(settings.particleCount);
        }
        
        // Load window opacity
        if (settings.windowOpacity) {
            document.getElementById('windowOpacity').value = settings.windowOpacity;
            this.applyWindowOpacity(settings.windowOpacity);
        }
        
        // Load icon size
        if (settings.iconSize) {
            document.getElementById('iconSize').value = settings.iconSize;
            this.applyIconSize(settings.iconSize);
        }
        
        // Load taskbar height
        if (settings.taskbarHeight) {
            document.getElementById('taskbarHeight').value = settings.taskbarHeight;
            this.applyTaskbarHeight(settings.taskbarHeight);
            this.updateTaskbarValue(settings.taskbarHeight);
        }
        
        // Setup real-time updates for range inputs
        this.setupRangeInputs();
    }

    // Apply customization
    applyCustomization() {
        const settings = {
            animationSpeed: document.getElementById('animationSpeed').value,
            blurIntensity: document.getElementById('blurIntensity').value,
            particleCount: document.getElementById('particleCount').value,
            windowOpacity: document.getElementById('windowOpacity').value,
            iconSize: document.getElementById('iconSize').value,
            taskbarHeight: document.getElementById('taskbarHeight').value
        };
        
        // Apply each setting
        this.applyAnimationSpeed(settings.animationSpeed);
        this.applyBlurIntensity(settings.blurIntensity);
        this.updateParticleCount(settings.particleCount);
        this.applyWindowOpacity(settings.windowOpacity);
        this.applyIconSize(settings.iconSize);
        this.applyTaskbarHeight(settings.taskbarHeight);
        
        // Save to localStorage
        localStorage.setItem('osCustomization', JSON.stringify(settings));
        
        this.showToast('Customization applied successfully!', 'success');
        this.toggleCustomizationPanel();
    }
    
    // Setup theme selection
    setupThemeSelection() {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.applyTheme(theme);
                
                // Update active state
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                this.showToast(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme applied!`, 'success');
            });
        });
    }

    // Setup search functionality
    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            this.performSearch(query);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.toLowerCase().trim();
                if (query) {
                    this.executeSearch(query);
                }
            }
        });
    }

    // Perform search as user types
    performSearch(query) {
        if (!query) {
            this.hideSearchResults();
            return;
        }

        const results = this.searchApps(query);
        this.showSearchResults(results, query);
    }

    // Execute search action
    executeSearch(query) {
        const results = this.searchApps(query);
        if (results.length > 0) {
            // Open the first result
            const firstResult = results[0];
            if (firstResult.type === 'app') {
                this.openApp(firstResult.name);
            } else if (firstResult.type === 'action') {
                this.executeAction(firstResult.action);
            }
            this.hideSearchResults();
        }
    }

    // Search through apps and actions
    searchApps(query) {
        const results = [];
        
        // Search through desktop apps
        const desktopIcons = document.querySelectorAll('.desktop-icon');
        desktopIcons.forEach(icon => {
            const appName = icon.querySelector('.icon-label').textContent.toLowerCase();
            if (appName.includes(query)) {
                results.push({
                    type: 'app',
                    name: icon.dataset.app,
                    displayName: icon.querySelector('.icon-label').textContent,
                    icon: icon.querySelector('i').className,
                    element: icon
                });
            }
        });

        // Search through start menu apps
        const startMenuItems = document.querySelectorAll('.start-menu-item');
        startMenuItems.forEach(item => {
            const appName = item.querySelector('span').textContent.toLowerCase();
            if (appName.includes(query)) {
                const appNameAttr = item.dataset.app;
                if (appNameAttr) {
                    results.push({
                        type: 'app',
                        name: appNameAttr,
                        displayName: item.querySelector('span').textContent,
                        icon: item.querySelector('i').className,
                        element: item
                    });
                } else if (item.dataset.action) {
                    results.push({
                        type: 'action',
                        action: item.dataset.action,
                        displayName: item.querySelector('span').textContent,
                        icon: item.querySelector('i').className,
                        element: item
                    });
                }
            }
        });

        // Add system actions
        const systemActions = [
            { action: 'settings', displayName: 'Settings', icon: 'fas fa-cog' },
            { action: 'wallpaper-gallery', displayName: 'Change Wallpaper', icon: 'fas fa-images' },
            { action: 'customization', displayName: 'Personalization', icon: 'fas fa-palette' },
            { action: 'voice-assistant', displayName: 'Voice Assistant', icon: 'fas fa-microphone' }
        ];

        systemActions.forEach(action => {
            if (action.displayName.toLowerCase().includes(query)) {
                results.push({
                    type: 'action',
                    action: action.action,
                    displayName: action.displayName,
                    icon: action.icon
                });
            }
        });

        return results.slice(0, 8); // Limit to 8 results
    }

    // Show search results
    showSearchResults(results, query) {
        this.hideSearchResults(); // Clear previous results

        if (results.length === 0) {
            this.showNoSearchResults(query);
            return;
        }

        const searchBox = document.querySelector('.search-box');
        if (!searchBox) return;

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results glass';
        resultsContainer.innerHTML = `
            <div class="search-results-header">
                <span>Search results for "${query}"</span>
                <small>${results.length} result${results.length > 1 ? 's' : ''}</small>
            </div>
            <div class="search-results-list">
                ${results.map(result => `
                    <div class="search-result-item" data-type="${result.type}" data-name="${result.name || result.action}">
                        <div class="result-icon">
                            <i class="${result.icon}"></i>
                        </div>
                        <div class="result-info">
                            <div class="result-name">${result.displayName}</div>
                            <div class="result-type">${result.type === 'app' ? 'Application' : 'System Action'}</div>
                        </div>
                        <div class="result-action">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add click handlers
        resultsContainer.querySelectorAll('.search-result-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                const result = results[index];
                if (result.type === 'app') {
                    this.openApp(result.name);
                } else if (result.type === 'action') {
                    this.executeAction(result.action);
                }
                this.hideSearchResults();
            });
        });

        searchBox.appendChild(resultsContainer);
    }

    // Show no search results message
    showNoSearchResults(query) {
        const searchBox = document.querySelector('.search-box');
        if (!searchBox) return;

        const noResults = document.createElement('div');
        noResults.className = 'search-no-results glass';
        noResults.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search fa-2x text-muted"></i>
                <div class="no-results-text">
                    <div>No results found for "${query}"</div>
                    <small>Try different keywords or check spelling</small>
                </div>
            </div>
        `;

        searchBox.appendChild(noResults);
    }

    // Hide search results
    hideSearchResults() {
        const existingResults = document.querySelector('.search-results, .search-no-results');
        if (existingResults) {
            existingResults.remove();
        }
    }

    // Execute system action
    executeAction(action) {
        switch (action) {
            case 'settings':
                this.openApp('settings');
                break;
            case 'wallpaper-gallery':
                this.toggleWallpaperGallery();
                break;
            case 'customization':
                this.toggleCustomizationPanel();
                break;
            case 'voice-assistant':
                this.toggleVoiceAssistant();
                break;
            case 'shutdown':
                this.shutdown();
                break;
        }
    }

    // Voice Assistant Setup
    setupVoiceAssistant() {
        // Check if speech synthesis is supported
        if ('speechSynthesis' in window) {
            this.speechSynthesis = window.speechSynthesis;
            this.speechUtterance = null;
            this.voiceAssistantEnabled = true;
            
            // Get available voices
            this.loadVoices();
            
            // Listen for voice changes
            this.speechSynthesis.addEventListener('voiceschanged', () => {
                this.loadVoices();
                // Speak welcome message after voices are loaded
                setTimeout(() => {
                    this.speakWelcomeMessage();
                }, 1000);
            });
            
            // If voices are already available, speak welcome message
            if (this.speechSynthesis.getVoices().length > 0) {
                setTimeout(() => {
                    this.speakWelcomeMessage();
                }, 2000);
            }
        } else {
            this.voiceAssistantEnabled = false;
            console.log('Speech synthesis not supported');
        }
    }

    // Load available voices
    loadVoices() {
        if (this.speechSynthesis) {
            this.availableVoices = this.speechSynthesis.getVoices();
            
            // Try to find a good English voice
            this.selectedVoice = this.availableVoices.find(voice => 
                voice.lang.startsWith('en') && voice.name.includes('Google')
            ) || this.availableVoices.find(voice => 
                voice.lang.startsWith('en')
            ) || this.availableVoices[0];
        }
    }

    // Speak welcome message
    speakWelcomeMessage() {
        if (!this.voiceAssistantEnabled || !this.selectedVoice) {
            return;
        }

        // Get username from login or use default
        const username = this.getCurrentUsername();
        
        // Create a more engaging welcome message
        const welcomeMessages = [
            `سلام ${username}! خوش آمدید به OsMj! 🎉`,
            `Welcome ${username}! Your personal OS is ready to serve you! ✨`,
            `مرحبا ${username}! OsMj آماده کمک به شماست! 🚀`,
            `Hello ${username}! Let's make today amazing with OsMj! 🌟`
        ];
        
        const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

        // Stop any current speech
        if (this.speechSynthesis.speaking) {
            this.speechSynthesis.cancel();
        }

        // Create new utterance with enhanced personality
        this.speechUtterance = new SpeechSynthesisUtterance(welcomeMessage);
        this.speechUtterance.voice = this.selectedVoice;
        this.speechUtterance.rate = 0.85; // Slightly slower for clarity
        this.speechUtterance.pitch = 1.1; // Slightly higher pitch for enthusiasm
        this.speechUtterance.volume = 0.9;

        // Add event listeners
        this.speechUtterance.onstart = () => {
            console.log('Voice assistant speaking:', welcomeMessage);
            this.showToast('🎤 Voice assistant is speaking...', 'info');
        };

        this.speechUtterance.onend = () => {
            console.log('Voice assistant finished speaking');
            // Speak a follow-up message after a short delay
            setTimeout(() => {
                this.speakFollowUpMessage();
            }, 2000);
        };

        this.speechUtterance.onerror = (event) => {
            console.error('Voice assistant error:', event.error);
        };

        // Speak the message
        this.speechSynthesis.speak(this.speechUtterance);
    }

    // Speak follow-up message
    speakFollowUpMessage() {
        if (!this.voiceAssistantEnabled || !this.selectedVoice) {
            return;
        }

        const followUpMessages = [
            "I'm here to help you navigate and use your OS effectively!",
            "Feel free to ask me anything or use the start menu to explore!",
            "Your desktop is ready with all the tools you need!",
            "Let me know if you need assistance with any feature!"
        ];
        
        const followUpMessage = followUpMessages[Math.floor(Math.random() * followUpMessages.length)];
        
        const utterance = new SpeechSynthesisUtterance(followUpMessage);
        utterance.voice = this.selectedVoice;
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        
        this.speechSynthesis.speak(utterance);
    }

    // Get current username
    getCurrentUsername() {
        // Try to get from localStorage (set during login)
        const storedUsername = localStorage.getItem('osmj_username');
        if (storedUsername) {
            return storedUsername;
        }
        
        // Default username
        return 'admin';
    }

    // Speak custom message
    speakMessage(message, options = {}) {
        if (!this.voiceAssistantEnabled || !this.selectedVoice) {
            return;
        }

        // Stop any current speech
        if (this.speechSynthesis.speaking) {
            this.speechSynthesis.cancel();
        }

        // Create new utterance
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.voice = this.selectedVoice;
        utterance.rate = options.rate || 0.9;
        utterance.pitch = options.pitch || 1.1;
        utterance.volume = options.volume || 0.9;

        // Add event listeners for better user experience
        utterance.onstart = () => {
            console.log('Voice assistant speaking:', message);
        };

        utterance.onend = () => {
            console.log('Voice assistant finished speaking');
        };

        utterance.onerror = (event) => {
            console.error('Voice assistant error:', event.error);
        };

        // Speak the message
        this.speechSynthesis.speak(utterance);
    }

    // Toggle voice assistant
    toggleVoiceAssistant() {
        if (this.voiceAssistantEnabled) {
            if (this.speechSynthesis.speaking) {
                this.speechSynthesis.cancel();
                this.showToast('🎤 Voice assistant stopped', 'info');
            } else {
                const messages = [
                    "Hello! I'm your personal AI assistant, ready to help you navigate OsMj! 🚀",
                    "Hi there! I'm here to make your OS experience amazing! ✨",
                    "Welcome! I'm your voice companion, ready to assist you! 🌟",
                    "Greetings! Your AI assistant is at your service! 🎯"
                ];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                this.speakMessage(randomMessage);
                this.showToast('🎤 Voice assistant activated', 'success');
            }
        } else {
            this.showToast('Voice assistant not supported', 'warning');
        }
    }

    // Add voice feedback for various actions
    addVoiceFeedback(action, details = '') {
        if (!this.voiceAssistantEnabled) return;
        
        const feedbackMessages = {
            'app_opened': `Opening ${details}`,
            'folder_created': `Folder ${details} created successfully!`,
            'file_created': `File ${details} created successfully!`,
            'theme_changed': `Theme changed to ${details}`,
            'wallpaper_changed': `Wallpaper changed to ${details}`,
            'system_action': details
        };
        
        const message = feedbackMessages[action] || details;
        if (message) {
            setTimeout(() => {
                this.speakMessage(message);
            }, 500);
        }
    }

    // Enhanced voice assistant with personality
    speakWithPersonality(message, personality = 'friendly') {
        if (!this.voiceAssistantEnabled || !this.selectedVoice) return;
        
        const personalities = {
            'friendly': { rate: 0.9, pitch: 1.1, volume: 0.9 },
            'professional': { rate: 0.85, pitch: 1.0, volume: 0.8 },
            'enthusiastic': { rate: 0.95, pitch: 1.2, volume: 1.0 },
            'calm': { rate: 0.8, pitch: 0.9, volume: 0.7 }
        };
        
        const settings = personalities[personality] || personalities.friendly;
        this.speakMessage(message, settings);
    }

    // Reset customization
    resetCustomization() {
        const defaultSettings = {
            animationSpeed: 'normal',
            blurIntensity: 20,
            particleCount: 30,
            windowOpacity: 'normal',
            iconSize: 'medium',
            taskbarHeight: 60
        };
        
        // Reset form values
        Object.keys(defaultSettings).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = defaultSettings[key];
            }
        });
        
        // Apply default settings
        this.applyAnimationSpeed('normal');
        this.applyBlurIntensity(20);
        this.updateParticleCount(30);
        this.applyWindowOpacity('normal');
        this.applyIconSize('medium');
        this.applyTaskbarHeight(60);
        
        // Update display values
        this.updateBlurValue(20);
        this.updateParticleValue(30);
        this.updateTaskbarValue(60);
        
        // Clear localStorage
        localStorage.removeItem('osCustomization');
        
        this.showToast('Customization reset to default!', 'info');
    }

    // Individual customization methods
    applyTheme(theme) {
        const body = document.body;
        body.removeAttribute('data-theme');
        
        if (theme !== 'default') {
            body.setAttribute('data-theme', theme);
        }
        
        this.currentTheme = theme;
    }
    
    // Setup range input real-time updates
    setupRangeInputs() {
        const blurInput = document.getElementById('blurIntensity');
        const particleInput = document.getElementById('particleCount');
        const taskbarInput = document.getElementById('taskbarHeight');
        
        if (blurInput) {
            blurInput.addEventListener('input', (e) => {
                this.updateBlurValue(e.target.value);
            });
        }
        
        if (particleInput) {
            particleInput.addEventListener('input', (e) => {
                this.updateParticleValue(e.target.value);
            });
        }
        
        if (taskbarInput) {
            taskbarInput.addEventListener('input', (e) => {
                this.updateTaskbarValue(e.target.value);
            });
        }
    }
    
    // Update display values for range inputs
    updateBlurValue(value) {
        const blurValue = document.getElementById('blurValue');
        if (blurValue) {
            blurValue.textContent = value;
        }
    }
    
    updateParticleValue(value) {
        const particleValue = document.getElementById('particleValue');
        if (particleValue) {
            particleValue.textContent = value;
        }
    }
    
    updateTaskbarValue(value) {
        const taskbarValue = document.getElementById('taskbarValue');
        if (taskbarValue) {
            taskbarValue.textContent = value;
        }
    }

    applyAnimationSpeed(speed) {
        const body = document.body;
        body.removeAttribute('data-animation-speed');
        body.setAttribute('data-animation-speed', speed);
    }

    applyBlurIntensity(intensity) {
        const body = document.body;
        body.removeAttribute('data-blur');
        body.setAttribute('data-blur', intensity);
    }

    updateParticleCount(count) {
        const particlesContainer = document.getElementById('particles');
        particlesContainer.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    applyWindowOpacity(opacity) {
        const body = document.body;
        body.removeAttribute('data-window-opacity');
        body.setAttribute('data-window-opacity', opacity);
    }

    applyIconSize(size) {
        const body = document.body;
        body.removeAttribute('data-icon-size');
        body.setAttribute('data-icon-size', size);
    }

    applyTaskbarHeight(height) {
        document.documentElement.style.setProperty('--taskbar-height', height + 'px');
    }

    applyFontFamily(font) {
        const fonts = {
            'default': 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            'modern': 'Roboto, Arial, sans-serif',
            'classic': 'Times New Roman, serif',
            'fancy': 'Cursive, fantasy'
        };
        
        document.documentElement.style.setProperty('--font-family', fonts[font] || fonts.default);
    }
}

// Initialize the Advanced OS Simulator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedOSSimulator();
});
