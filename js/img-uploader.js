import { showToast } from "./common.js";

let IMGBB_API_KEY = "";

export function setImgBbKey(key) {
    IMGBB_API_KEY = key || "";
}

export function resolveImageUrl(imageUrl, fallbackType = 'course') {
    if (!imageUrl || imageUrl.trim() === "") {
        if (fallbackType === 'avatar') return 'images/default-avatar.png';
        if (fallbackType === 'book') return 'images/default-book.png';
        return 'images/default-course.png';
    }

    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    return `images/${imageUrl.replace(/^\/+/, '')}`;
}

export async function uploadToImgBB(fileElementId) {
    const fileInput = document.getElementById(fileElementId);
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return null;
    
    if (!IMGBB_API_KEY) {
        showToast("ImgBB API Key missing in Settings. Enter key in Admin Panel.", "error");
        return null;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            return data.data.url;
        }
        throw new Error(data.error?.message || "Upload Failed");
    } catch (e) {
        showToast("Image Upload Failed. Check network connection or API Key.", "error");
        return null;
    }
}
