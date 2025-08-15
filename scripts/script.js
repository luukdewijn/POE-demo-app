// Modal functionality
function openModal(workflowType) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = getModalTitle(workflowType);
    modalBody.innerHTML = getModalContent(workflowType);
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function getModalTitle(workflowType) {
    const titles = {
        'data-sourcing': 'Data Sourcing Configuration',
        'data-cleaning': 'Data Cleaning Rules',
        'data-enrichment': 'Enrichment Sources',
        'ai-content': 'AI Content Preview',
        'outreach': 'Campaign Scheduler',
        'follow-up': 'Follow-up Rules'
    };
    return titles[workflowType] || 'Configuration';
}

function getModalContent(workflowType) {
    const content = {
        'data-sourcing': `
            <div class="form-group">
                <label class="form-label">Data Source</label>
                <select class="form-input">
                    <option>Upload CSV File</option>
                    <option>LinkedIn Sales Navigator</option>
                    <option>Apollo.io Integration</option>
                    <option>Custom API</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">File Upload</label>
                <input type="file" class="form-input" accept=".csv,.xlsx">
            </div>
            <button class="btn btn-primary" onclick="uploadData()">Upload & Process</button>
        `,
        'data-cleaning': `
            <div class="form-group">
                <label class="form-label">Duplicate Detection</label>
                <select class="form-input">
                    <option>Email Address</option>
                    <option>Company + First Name</option>
                    <option>LinkedIn URL</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Data Validation Rules</label>
                <textarea class="form-input form-textarea" placeholder="Enter validation rules..."></textarea>
            </div>
            <button class="btn btn-primary" onclick="saveCleaningRules()">Save Rules</button>
        `,
        'data-enrichment': `
            <div class="form-group">
                <label class="form-label">Enrichment Providers</label>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <label><input type="checkbox" checked> Apollo.io</label>
                    <label><input type="checkbox" checked> ZoomInfo</label>
                    <label><input type="checkbox"> Clearbit</label>
                    <label><input type="checkbox"> Hunter.io</label>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Data Points to Enrich</label>
                <textarea class="form-input form-textarea" placeholder="Company size, industry, recent news..."></textarea>
            </div>
            <button class="btn btn-primary" onclick="startEnrichment()">Start Enrichment</button>
        `,
        'ai-content': `
            <div class="form-group">
                <label class="form-label">Email Template Preview</label>
                <textarea class="form-input form-textarea" readonly>Hi {{first_name}},

I noticed {{company}} recently {{recent_news}}. This caught my attention because...

Would you be open to a brief conversation about how we've helped similar {{industry}} companies achieve {{benefit}}?

Best regards,
{{sender_name}}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">Personalization Level</label>
                <input type="range" min="1" max="10" value="8" class="form-input">
            </div>
            <button class="btn btn-primary" onclick="regenerateContent()">Regenerate Content</button>
        `,
        'outreach': `
            <div class="form-group">
                <label class="form-label">Campaign Schedule</label>
                <input type="datetime-local" class="form-input">
            </div>
            <div class="form-group">
                <label class="form-label">Send Rate (emails per hour)</label>
                <input type="number" class="form-input" value="50" min="1" max="100">
            </div>
            <div class="form-group">
                <label class="form-label">Time Zone</label>
                <select class="form-input">
                    <option>UTC+1 (Amsterdam)</option>
                    <option>UTC-5 (New York)</option>
                    <option>UTC-8 (Los Angeles)</option>
                </select>
            </div>
            <button class="btn btn-primary" onclick="scheduleCampaign()">Schedule Campaign</button>
        `,
        'follow-up': `
            <div class="form-group">
                <label class="form-label">Follow-up Delay (days)</label>
                <input type="number" class="form-input" value="3" min="1" max="30">
            </div>
            <div class="form-group">
                <label class="form-label">Follow-up Conditions</label>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <label><input type="checkbox" checked> No reply after X days</label>
                    <label><input type="checkbox" checked> Email opened but no response</label>
                    <label><input type="checkbox"> LinkedIn profile viewed</label>
                </div>
            </div>
            <button class="btn btn-primary" onclick="saveFollowupRules()">Save Rules</button>
        `
    };
    return content[workflowType] || '<p>Configuration options will appear here.</p>';
}

// Workflow actions
function triggerWorkflow(workflowType) {
    showNotification(`${workflowType} workflow triggered successfully!`);
    // Here you would make an API call to your n8n webhook
    // fetch(`/api/trigger/${workflowType}`, { method: 'POST' });
}

function pauseWorkflow(workflowType) {
    showNotification(`${workflowType} workflow paused.`);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Modal actions
function uploadData() {
    showNotification('Data upload initiated!');
    closeModal();
}

function saveCleaningRules() {
    showNotification('Cleaning rules saved successfully!');
    closeModal();
}

function startEnrichment() {
    showNotification('Data enrichment started!');
    closeModal();
}

function regenerateContent() {
    showNotification('AI content regenerated!');
    closeModal();
}

function scheduleCampaign() {
    showNotification('Campaign scheduled successfully!');
    closeModal();
}

function saveFollowupRules() {
    showNotification('Follow-up rules saved!');
    closeModal();
}

function viewResponses() {
    showNotification('Opening response dashboard...');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Simulate real-time updates
function updateMetrics() {
    // Simulate changing metrics
    const metrics = ['total-prospects', 'emails-sent', 'response-rate', 'meetings-booked'];
    metrics.forEach(metric => {
        const element = document.getElementById(metric);
        if (element && Math.random() > 0.9) { // 10% chance to update
            // Add small random changes to simulate real updates
            // In real implementation, this would come from your n8n webhooks
        }
    });
}

// Update metrics every 30 seconds
setInterval(updateMetrics, 30000);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Personalized Outreach Engine loaded');
});
