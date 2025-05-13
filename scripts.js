const folderData = {
    "Advanced Server": [
        { fileName: "Introduction", subFolder: "advanced-server/intro", icon: "graphical-berries/default.ico" },
        { fileName: "Commands Docs", subFolder: "advanced-server/commands", icon: "graphical-berries/default.ico" },
        { fileName: "Config Docs", subFolder: "advanced-server/config", icon: "graphical-berries/default.ico" },
        { fileName: "Download", subFolder: "advanced-server/downloads", icon: "graphical-berries/default.ico" },
        { fileName: "Proceed to GitHub Repo", icon: "graphical-berries/link.ico", action: "openLink", link: "https://github.com/thearcticfox25/AdvancedServer" }
    ],
    "Ice Star (Test Deployment)": [
        { fileName: "About", subFolder: "ice-star/about", icon: "graphical-berries/default.ico" },
        { fileName: "Rules", subFolder: "ice-star/rules", icon: "graphical-berries/default.ico" },
        { fileName: "How to join", subFolder: "ice-star/how2join", icon: "graphical-berries/default.ico" }
    ]
};

const desktop = document.getElementById("desktop");
const windowEl = document.getElementById("window");
const windowTitle = document.getElementById("window-title");
const windowContent = document.getElementById("window-content");
const closeWindowBtn = document.getElementById("close-window");

function renderDesktop() {
    desktop.innerHTML = "";
    Object.entries(folderData).forEach(([category, files]) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category";

        const title = document.createElement("h2");
        title.textContent = category;
        categoryDiv.appendChild(title);

        const fileContainer = document.createElement("div");
        fileContainer.style.display = 'flex';
        fileContainer.style.justifyContent = 'center';
        fileContainer.style.flexWrap = 'wrap';

        files.forEach(file => {
            const fileDiv = document.createElement("div");
            fileDiv.className = "file";

            const icon = document.createElement("img");
            icon.src = file.icon;
            icon.alt = file.fileName;
            icon.className = "file-icon";

            const label = document.createElement("span");
            label.textContent = file.fileName;

            if (file.action === "openLink" && file.link) {
                fileDiv.onclick = () => {
                    window.open(file.link, '_blank');
                };
            } else {
                fileDiv.onclick = () => openWindow(file.fileName, `${file.subFolder}/index.html`);
            }

            fileDiv.appendChild(icon);
            fileDiv.appendChild(label);
            fileContainer.appendChild(fileDiv);
        });

        categoryDiv.appendChild(fileContainer);
        desktop.appendChild(categoryDiv);
    });
}

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function openWindow(title, url) {
    windowTitle.textContent = title;
    windowContent.src = url;
    windowEl.style.display = "flex";
    
    windowEl.style.top = `${12 + Math.random() * 5}%`;
    windowEl.style.left = `${12 + Math.random() * 5}%`;
}

closeWindowBtn.onclick = () => {
    windowEl.style.display = "none";
    windowContent.src = "";
};

let isDragging = false;
let offsetX = 0, offsetY = 0;
const header = document.querySelector('.window-header');

header.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = windowEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        windowEl.style.left = `${e.clientX - offsetX}px`;
        windowEl.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

if (isTouchDevice()) {
    document.getElementById('touch-warning').style.display = 'flex';
} else {
    renderDesktop();
}

const warningEl = document.getElementById("domain-warning");
const originalDomainName = "thearcticfox25.github.io";
if (window.location.hostname !== originalDomainName) {
    const footer = document.createElement("div");
    footer.className = "domain-warning";

    const triangle = document.createElement("span");
    triangle.innerHTML = "&#9888;";

    const message = document.createElement("span");
    message.innerHTML = `Warning: You are accessing this site through an unverified source or mirror.
        For your safety and to ensure accurate information, please browse the website through the official URL: <span class="copy-domain" title="Click to copy">` + originalDomainName + `</span>.
        Using unofficial mirrors may lead to misinformation or security risks.`;

    message.querySelector(".copy-domain").style.cursor = "pointer";
    message.querySelector(".copy-domain").onclick = () => {
        navigator.clipboard.writeText(originalDomainName).then(() => {
            alert("Domain URL copied to clipboard!");
        });
    };

    footer.appendChild(triangle);
    footer.appendChild(message);
    document.body.appendChild(footer);
}
