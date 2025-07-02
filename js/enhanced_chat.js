// Enhanced Chat Interface - Relocated Under Input Bar
// Phase 2 Enhancement for Apex Agent - Repositioned Version

class ChatEnhancer {
    constructor() {
        this.messageThreads = new Map();
        this.searchIndex = new Map();
        this.messageReactions = new Map();
        this.messageExportFormats = ['json', 'markdown', 'html', 'txt'];
        this.isExpanded = false;
        this.init();
    }

    init() {
        this.createEnhancedFeaturesPanel();
        this.addMessageIds();
        this.addKeyboardShortcuts();
    }

    // Create enhanced features panel positioned under the input bar
    createEnhancedFeaturesPanel() {
        // Find the chat input container
        const chatInputContainer = document.getElementById('chat-input-container');
        const chatButtonsWrapper = document.getElementById('chat-buttons-wrapper');
        
        if (!chatInputContainer) {
            console.warn('Chat input container not found, falling back to body');
            this.createFallbackPanel();
            return;
        }

        // Create the enhanced panel container
        const enhancedPanel = document.createElement('div');
        enhancedPanel.id = 'enhanced-chat-panel';
        enhancedPanel.className = 'enhanced-chat-panel-under-input';
        enhancedPanel.innerHTML = `
            <!-- Compact Toggle Button -->
            <div class="enhanced-toggle-compact" onclick="chatEnhancer.togglePanel()">
                <span class="toggle-icon-compact">⚡</span>
                <span class="toggle-text-compact">Enhanced Features</span>
                <span class="toggle-arrow">▼</span>
            </div>

            <!-- Features Panel (Initially Hidden) -->
            <div class="enhanced-content-compact" id="enhanced-content">
                
                <!-- Feature Tabs - Compact -->
                <div class="enhanced-tabs-compact">
                    <button class="tab-btn-compact active" onclick="chatEnhancer.showTab('threading')">
                        🧵
                    </button>
                    <button class="tab-btn-compact" onclick="chatEnhancer.showTab('search')">
                        🔍
                    </button>
                    <button class="tab-btn-compact" onclick="chatEnhancer.showTab('export')">
                        📄
                    </button>
                    <button class="tab-btn-compact" onclick="chatEnhancer.showTab('reactions')">
                        😊
                    </button>
                    <button class="tab-btn-compact" onclick="chatEnhancer.showTab('analytics')">
                        📊
                    </button>
                </div>

                <!-- Threading Tab -->
                <div class="tab-content-compact active" id="tab-threading">
                    <div class="feature-section-compact">
                        <div class="feature-header">
                            <h4>Message Threading</h4>
                            <p>Ctrl+click messages, then create threads</p>
                        </div>
                        <div class="thread-controls-compact">
                            <button id="create-thread-btn" class="feature-btn-compact" disabled>
                                Create Thread (0)
                            </button>
                            <button id="clear-selection-btn" class="feature-btn-compact">
                                Clear
                            </button>
                        </div>
                        <div class="thread-list-compact" id="thread-list">
                            <p class="empty-state-compact">No threads yet</p>
                        </div>
                    </div>
                </div>

                <!-- Search Tab -->
                <div class="tab-content-compact" id="tab-search">
                    <div class="feature-section-compact">
                        <div class="feature-header">
                            <h4>Search Messages</h4>
                        </div>
                        <div class="search-controls-compact">
                            <input type="text" id="message-search" placeholder="Search..." class="search-input-compact">
                            <div class="search-filters-compact">
                                <select id="search-type" class="select-compact">
                                    <option value="all">All</option>
                                    <option value="user">User</option>
                                    <option value="agent">Agent</option>
                                </select>
                            </div>
                        </div>
                        <div id="search-results" class="search-results-compact">
                            <p class="empty-state-compact">Enter search terms</p>
                        </div>
                    </div>
                </div>

                <!-- Export Tab -->
                <div class="tab-content-compact" id="tab-export">
                    <div class="feature-section-compact">
                        <div class="feature-header">
                            <h4>Export Chat</h4>
                        </div>
                        <div class="export-controls-compact">
                            <select id="export-format" class="select-compact">
                                <option value="json">JSON</option>
                                <option value="markdown">Markdown</option>
                                <option value="html">HTML</option>
                                <option value="txt">Text</option>
                            </select>
                            <button id="export-btn" class="feature-btn-compact primary">
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Reactions Tab -->
                <div class="tab-content-compact" id="tab-reactions">
                    <div class="feature-section-compact">
                        <div class="feature-header">
                            <h4>Reactions</h4>
                            <p>Hover messages to add reactions</p>
                        </div>
                        <div class="reaction-stats-compact">
                            <span id="total-reactions">0</span> reactions on <span id="reacted-messages">0</span> messages
                        </div>
                    </div>
                </div>

                <!-- Analytics Tab -->
                <div class="tab-content-compact" id="tab-analytics">
                    <div class="feature-section-compact">
                        <div class="feature-header">
                            <h4>Analytics</h4>
                        </div>
                        <div class="analytics-grid-compact">
                            <div class="analytic-item-compact">
                                <span id="total-messages">0</span>
                                <small>Total</small>
                            </div>
                            <div class="analytic-item-compact">
                                <span id="user-messages">0</span>
                                <small>User</small>
                            </div>
                            <div class="analytic-item-compact">
                                <span id="agent-messages">0</span>
                                <small>Agent</small>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        `;

        // Insert after the chat input container but before chat buttons
        if (chatButtonsWrapper) {
            chatButtonsWrapper.parentNode.insertBefore(enhancedPanel, chatButtonsWrapper);
        } else {
            chatInputContainer.parentNode.insertBefore(enhancedPanel, chatInputContainer.nextSibling);
        }
        
        // Initialize features
        this.attachEventListeners();
        this.updateAnalytics();
    }

    createFallbackPanel() {
        // Fallback to bottom if input container not found
        const enhancedPanel = document.createElement('div');
        enhancedPanel.id = 'enhanced-chat-panel';
        enhancedPanel.className = 'enhanced-chat-panel-fallback';
        enhancedPanel.innerHTML = `
            <div class="enhanced-toggle-compact" onclick="chatEnhancer.togglePanel()">
                <span class="toggle-icon-compact">⚡</span>
                <span class="toggle-text-compact">Enhanced Features</span>
                <span class="toggle-arrow">▼</span>
            </div>
            <div class="enhanced-content-compact" id="enhanced-content" style="display: none;">
                <p>Enhanced features loaded in fallback mode</p>
            </div>
        `;
        document.body.appendChild(enhancedPanel);
    }

    togglePanel() {
        this.isExpanded = !this.isExpanded;
        const content = document.getElementById('enhanced-content');
        const arrow = document.querySelector('.toggle-arrow');
        
        if (this.isExpanded) {
            content.style.display = 'block';
            if (arrow) arrow.textContent = '▲';
        } else {
            content.style.display = 'none';
            if (arrow) arrow.textContent = '▼';
        }
    }

    showTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content-compact').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-btn-compact').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        document.getElementById(`tab-${tabName}`).classList.add('active');
        event.target.classList.add('active');
    }

    attachEventListeners() {
        // Threading
        document.getElementById('create-thread-btn')?.addEventListener('click', () => {
            this.createThread();
        });
        
        document.getElementById('clear-selection-btn')?.addEventListener('click', () => {
            this.clearSelection();
        });

        // Search
        document.getElementById('message-search')?.addEventListener('input', 
            this.debounce((e) => this.performSearch(e.target.value), 300)
        );

        // Export
        document.getElementById('export-btn')?.addEventListener('click', () => {
            this.exportChat();
        });

        // Add message selection functionality
        this.addMessageSelection();
    }

    addMessageSelection() {
        // Add click handlers to existing messages
        const messages = document.querySelectorAll('.message, [class*="message-"]');
        messages.forEach((msg, index) => {
            if (!msg.dataset.messageId) {
                msg.dataset.messageId = `msg_${index}_${Date.now()}`;
            }
            
            msg.addEventListener('click', (e) => {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.toggleMessageSelection(msg);
                }
            });

            // Add hover reaction button
            if (!msg.querySelector('.reaction-hover-btn')) {
                const reactionBtn = document.createElement('button');
                reactionBtn.className = 'reaction-hover-btn';
                reactionBtn.innerHTML = '😊';
                reactionBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.showReactionMenu(e, msg);
                };
                msg.style.position = 'relative';
                msg.appendChild(reactionBtn);
            }
        });
    }

    addMessageIds() {
        const messages = document.querySelectorAll('.message, [class*="message-"]');
        messages.forEach((msg, index) => {
            if (!msg.dataset.messageId) {
                msg.dataset.messageId = `msg_${index}_${Date.now()}`;
                msg.dataset.timestamp = new Date().toISOString();
            }
        });
    }

    toggleMessageSelection(messageEl) {
        messageEl.classList.toggle('message-selected');
        this.updateSelectionUI();
    }

    updateSelectionUI() {
        const selected = document.querySelectorAll('.message-selected');
        const btn = document.getElementById('create-thread-btn');
        if (btn) {
            btn.disabled = selected.length === 0;
            btn.textContent = `Create Thread (${selected.length})`;
        }
    }

    clearSelection() {
        document.querySelectorAll('.message-selected').forEach(msg => {
            msg.classList.remove('message-selected');
        });
        this.updateSelectionUI();
    }

    createThread() {
        const selected = document.querySelectorAll('.message-selected');
        if (selected.length === 0) return;

        const threadTitle = prompt('Enter thread title:') || `Thread ${new Date().toLocaleString()}`;
        const threadId = `thread_${Date.now()}`;
        
        this.messageThreads.set(threadId, {
            title: threadTitle,
            messages: Array.from(selected).map(msg => msg.dataset.messageId),
            created: new Date().toISOString()
        });

        this.updateThreadList();
        this.clearSelection();
        this.showNotification(`Thread "${threadTitle}" created`);
    }

    updateThreadList() {
        const threadList = document.getElementById('thread-list');
        if (this.messageThreads.size === 0) {
            threadList.innerHTML = '<p class="empty-state-compact">No threads yet</p>';
            return;
        }

        let html = '';
        this.messageThreads.forEach((thread, id) => {
            html += `
                <div class="thread-item-compact">
                    <span class="thread-title-compact">${thread.title}</span>
                    <span class="thread-count-compact">${thread.messages.length}</span>
                    <button onclick="chatEnhancer.deleteThread('${id}')" class="thread-btn-compact">×</button>
                </div>
            `;
        });
        threadList.innerHTML = html;
    }

    performSearch(query) {
        const resultsDiv = document.getElementById('search-results');
        if (!query || query.length < 2) {
            resultsDiv.innerHTML = '<p class="empty-state-compact">Enter search terms</p>';
            return;
        }

        const messages = document.querySelectorAll('.message, [class*="message-"]');
        const results = [];
        
        messages.forEach((msg, index) => {
            const text = msg.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                results.push({
                    element: msg,
                    text: msg.textContent.substring(0, 100) + '...',
                    index
                });
            }
        });

        if (results.length === 0) {
            resultsDiv.innerHTML = '<p class="empty-state-compact">No results</p>';
            return;
        }

        let html = `<div class="search-count">${results.length} found</div>`;
        results.forEach((result, index) => {
            html += `
                <div class="search-result-compact" onclick="chatEnhancer.scrollToMessage(${result.index})">
                    ${this.highlightText(result.text, query)}
                </div>
            `;
        });
        resultsDiv.innerHTML = html;
    }

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    scrollToMessage(index) {
        const messages = document.querySelectorAll('.message, [class*="message-"]');
        if (messages[index]) {
            messages[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            messages[index].style.backgroundColor = '#fff3cd';
            setTimeout(() => {
                messages[index].style.backgroundColor = '';
            }, 2000);
        }
    }

    exportChat() {
        const format = document.getElementById('export-format').value;
        const messages = this.extractMessages(true);
        let content = '';
        let filename = `chat_${new Date().toISOString().split('T')[0]}`;

        switch (format) {
            case 'json':
                content = JSON.stringify(messages, null, 2);
                filename += '.json';
                break;
            case 'markdown':
                content = this.convertToMarkdown(messages);
                filename += '.md';
                break;
            case 'html':
                content = this.convertToHTML(messages);
                filename += '.html';
                break;
            case 'txt':
                content = this.convertToText(messages);
                filename += '.txt';
                break;
        }

        this.downloadFile(content, filename);
        this.showNotification(`Exported as ${filename}`);
    }

    extractMessages(includeMetadata) {
        const messages = document.querySelectorAll('.message, [class*="message-"]');
        return Array.from(messages).map((msg, index) => ({
            id: msg.dataset.messageId || `msg_${index}`,
            content: msg.textContent.trim(),
            timestamp: includeMetadata ? (msg.dataset.timestamp || new Date().toISOString()) : undefined,
            type: this.getMessageType(msg),
            index
        }));
    }

    getMessageType(messageEl) {
        if (messageEl.className.includes('user')) return 'user';
        if (messageEl.className.includes('agent')) return 'agent';
        if (messageEl.className.includes('tool')) return 'tool';
        return 'unknown';
    }

    convertToMarkdown(messages) {
        let md = `# Chat Export - ${new Date().toLocaleDateString()}\n\n`;
        messages.forEach(msg => {
            md += `## ${msg.type.toUpperCase()}\n${msg.content}\n\n---\n\n`;
        });
        return md;
    }

    convertToHTML(messages) {
        let html = `<!DOCTYPE html><html><head><title>Chat Export</title></head><body>`;
        html += `<h1>Chat Export</h1>`;
        messages.forEach(msg => {
            html += `<div><h3>${msg.type}</h3><p>${msg.content}</p></div>`;
        });
        html += `</body></html>`;
        return html;
    }

    convertToText(messages) {
        let text = `Chat Export - ${new Date().toLocaleDateString()}\n\n`;
        messages.forEach(msg => {
            text += `[${msg.type.toUpperCase()}]\n${msg.content}\n\n`;
        });
        return text;
    }

    updateAnalytics() {
        const messages = document.querySelectorAll('.message, [class*="message-"]');
        const userMessages = Array.from(messages).filter(msg => this.getMessageType(msg) === 'user');
        const agentMessages = Array.from(messages).filter(msg => this.getMessageType(msg) === 'agent');

        document.getElementById('total-messages').textContent = messages.length;
        document.getElementById('user-messages').textContent = userMessages.length;
        document.getElementById('agent-messages').textContent = agentMessages.length;
        document.getElementById('total-reactions').textContent = this.messageReactions.size;
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+E to toggle enhanced panel
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.togglePanel();
            }
        });
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'enhancement-notification-compact';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.chatEnhancer = new ChatEnhancer();
    });
} else {
    window.chatEnhancer = new ChatEnhancer();
}

export { ChatEnhancer };