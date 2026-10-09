import { db, ref, get, set } from "./firebase-config.js";
import { showToast, showLoader, hideLoader } from "./common.js";

export async function exportDatabaseToJson() {
    showLoader();
    try {
        const rootSnap = await get(ref(db, '/'));
        if (!rootSnap.exists()) {
            showToast("No data found to export.", "warning");
            hideLoader();
            return;
        }
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rootSnap.val(), null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `mda_backup_${new Date().toISOString().slice(0,10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast("Database exported to JSON successfully!", "success");
    } catch (e) {
        showToast("Export failed: " + e.message, "error");
    }
    hideLoader();
}

export async function importJsonToDatabase(fileInputId) {
    const fileInput = document.getElementById(fileInputId);
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        showToast("Please choose a JSON file first.", "warning");
        return;
    }

    if (!confirm("Caution: This will merge/overwrite existing database nodes. Continue?")) return;

    showLoader();
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        try {
            const parsedData = JSON.parse(e.target.result);
            for (let node in parsedData) {
                await set(ref(db, node), parsedData[node]);
            }
            showToast("JSON imported and synced to Firebase successfully!", "success");
        } catch (err) {
            showToast("Invalid JSON file format: " + err.message, "error");
        }
        hideLoader();
    };

    reader.readAsText(file);
}
