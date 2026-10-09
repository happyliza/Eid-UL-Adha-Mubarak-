let activeModals = [];
let currentZIndex = 100;

export function showToast(message, type = "info") {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.backgroundColor = type === "error" ? "var(--danger)" : type === "success" ? "var(--secondary)" : "#333";
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3500);
}

export function showLoader() {
    let el = document.getElementById('global-loader');
    if (!el) {
        el = document.createElement('div');
        el.id = 'global-loader';
        el.innerHTML = '<div class="spinner"></div><div style="margin-top:10px;font-weight:500;">Loading...</div>';
        document.body.appendChild(el);
    }
    el.style.display = 'flex';
}

export function hideLoader() {
    const el = document.getElementById('global-loader');
    if (el) el.style.display = 'none';
}

export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        currentZIndex += 10;
        modal.style.zIndex = currentZIndex;
        modal.classList.add('active');
        activeModals.push(modalId);
    }
}

export function closeTopModal() {
    if (activeModals.length === 0) {
        document.querySelectorAll('.modal-overlay.active').forEach(m => {
            m.classList.remove('active');
            m.style.zIndex = '';
        });
        currentZIndex = 100;
        return false;
    }
    const modalId = activeModals.pop();
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.style.zIndex = '';
        currentZIndex -= 10;
    }
    return true;
}

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Account number copied!", "success");
    }).catch(() => {
        showToast("Failed to copy", "error");
    });
}

export function convertVideoLink(url) {
    if (!url) return "";
    let ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/);
    if (ytMatch && ytMatch[1]) {
        return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    }
    let driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/\?id=([a-zA-Z0-9_-]+)/);
    if (driveMatch && driveMatch[1]) {
        return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }
    return url;
}

export function convertGDriveDownloadLink(url) {
    if (!url) return "";
    let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/\?id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return url;
}

export function playFullscreenVideo(url) {
    let overlay = document.getElementById('fullscreen-video-overlay');
    let player = document.getElementById('fs-video-player');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'fullscreen-video-overlay';
        overlay.className = 'hidden';
        overlay.innerHTML = `
            <button class="close-fs-btn" onclick="window.closeFullscreenVideo()"><i class="fas fa-arrow-left"></i> Back</button>
            <iframe id="fs-video-player" allow="autoplay; fullscreen" allowfullscreen></iframe>
        `;
        document.body.appendChild(overlay);
        player = document.getElementById('fs-video-player');
    }
    player.src = convertVideoLink(url);
    overlay.classList.remove('hidden');

    try {
        if (overlay.requestFullscreen) overlay.requestFullscreen().catch(() => {});
        else if (overlay.webkitRequestFullscreen) overlay.webkitRequestFullscreen().catch(() => {});
    } catch (e) {}
}

export function closeFullscreenVideo() {
    const overlay = document.getElementById('fullscreen-video-overlay');
    const player = document.getElementById('fs-video-player');
    if (player) player.src = "";
    if (overlay) overlay.classList.add('hidden');
    try {
        if (document.exitFullscreen && document.fullscreenElement) document.exitFullscreen().catch(() => {});
    } catch (e) {}
}

window.closeFullscreenVideo = closeFullscreenVideo;
window.closeTopModal = closeTopModal;
window.copyToClipboard = copyToClipboard;
