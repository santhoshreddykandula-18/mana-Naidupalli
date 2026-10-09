// ========================================
// NAIDUPALLI PIRATES
// WEBSITE JAVASCRIPT
// ========================================


// ========================================
// CELEBRATION PHOTOS
// ========================================

const photos = [

    "IMG_20250123_181753_414.jpg",
    "IMG_20250123_181753_487.jpg",
    "IMG-20250111-WA0004.jpg",
    "IMG-20250116-WA0014.jpg",
    "IMG-20250116-WA0018.jpg",
    "IMG-20250116-WA0021.jpg",
    "IMG-20250116-WA0022.jpg",
    "IMG-20250116-WA0027.jpg",
    "IMG-20250116-WA0032.jpg",
    "IMG-20250116-WA0035.jpg",
    "IMG-20250116-WA0042.jpg",
    "IMG-20250116-WA0044.jpg",
    "IMG-20250116-WA0045.jpg",
    "IMG-20250116-WA0047.jpg",
    "IMG-20250116-WA0048.jpg",
    "IMG-20250116-WA0050.jpg",
    "IMG-20250116-WA0054.jpg",
    "IMG-20250116-WA0056.jpg",
    "IMG-20250116-WA0057.jpg",
    "IMG-20250116-WA0058.jpg",
    "IMG-20250116-WA0059.jpg",
    "IMG-20250116-WA0060.jpg",
    "IMG-20250116-WA0062.jpg",
    "IMG-20250116-WA0065.jpg",
    "IMG-20250116-WA0070.jpg",
    "IMG-20250116-WA0077.jpg",
    "IMG-20250116-WA0079.jpg",
    "IMG-20250116-WA0083.jpg",
    "IMG-20250116-WA0089.jpg",
    "IMG-20250116-WA0094.jpg",
    "IMG-20250116-WA0095.jpg",
    "IMG-20250116-WA0098.jpg",
    "IMG-20250116-WA0102.jpg",
    "IMG-20250119-WA0002.jpg",
    "IMG-20250119-WA0007.jpg",
    "IMG-20250119-WA0015.jpg",
    "IMG-20250119-WA0018.jpg",
    "IMG-20250119-WA0019.jpg",
    "IMG-20250119-WA0020.jpg",
    "IMG-20250120-WA0001.jpg",
    "IMG-20250120-WA0002.jpg",
    "IMG-20250120-WA0004.jpg",
    "IMG-20250120-WA0005.jpg",
    "IMG-20250120-WA0007.jpg",
    "IMG-20250120-WA0013.jpg",
    "IMG-20250120-WA0015.jpg",
    "IMG-20250120-WA0021.jpg",
    "IMG-20250120-WA0022.jpg",
    "IMG-20250120-WA0023.jpg",
    "IMG-20250120-WA0024.jpg",
    "IMG-20250120-WA0025.jpg",
    "IMG-20250120-WA0030.jpg",
    "IMG-20250120-WA0033.jpg",
    "IMG-20250120-WA0034.jpg"

];


// ========================================
// DISPLAY PHOTOS
// ========================================

const photoGallery = document.getElementById("photoGallery");

photos.forEach((photo, index) => {

    const div = document.createElement("div");

    div.className = "gallery-item";

    div.innerHTML = `
        <img
            src="Images/${photo}"
            alt="Naidupalli Pirates Celebration Photo ${index + 1}"
            loading="lazy"
        >
    `;

    photoGallery.appendChild(div);

});


// ========================================
// CELEBRATION VIDEOS
// ========================================

const videos = [

    "VID-20250116-WA0103.mp4",
    "VID-20250116-WA0104.mp4",
    "VID-20250116-WA0106.mp4",
    "VID-20250116-WA0107.mp4",
    "VID-20250117-WA0012.mp4",
    "VID-20250119-WA0023.mp4",
    "VID-20250120-WA0036.mp4"

];


// ========================================
// DISPLAY VIDEOS
// ========================================

const videoGallery = document.getElementById("videoGallery");

videos.forEach((video, index) => {

    const div = document.createElement("div");

    div.className = "video-item";

    div.innerHTML = `
        <video
            controls
            preload="metadata"
            playsinline
        >
            <source
                src="Videos/${video}"
                type="video/mp4"
            >

            Your browser does not support video playback.
        </video>
    `;

    videoGallery.appendChild(div);

});


// ========================================
// EXPLORE TEAM BUTTON
// ========================================

const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", () => {

        const playersSection = document.getElementById("players");

        if (playersSection) {

            playersSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}


// ========================================
// PHOTO LIGHTBOX
// ========================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");


// Open photo when clicked

if (photoGallery && lightbox && lightboxImage) {

    photoGallery.addEventListener("click", (event) => {

        const image = event.target.closest("img");

        if (!image) {
            return;
        }

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("active");

        document.body.classList.add("no-scroll");

    });

}


// ========================================
// CLOSE LIGHTBOX
// ========================================

function closePhoto() {

    if (!lightbox || !lightboxImage) {
        return;
    }

    lightbox.classList.remove("active");

    lightboxImage.src = "";

    document.body.classList.remove("no-scroll");

}


if (closeLightbox) {

    closeLightbox.addEventListener("click", closePhoto);

}


// Close when clicking outside image

if (lightbox) {

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closePhoto();

        }

    });

}


// Close with Escape key

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closePhoto();

    }

});


// ========================================
// SHARE WEBSITE
// ========================================

const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {

    shareBtn.addEventListener("click", async () => {

        const websiteUrl = window.location.href;

        const shareData = {
            title: "Naidupalli Pirates",
            text: "Check out the Naidupalli Pirates cricket team website!",
            url: websiteUrl
        };


        // Native mobile/browser sharing

        if (navigator.share) {

            try {

                await navigator.share(shareData);

            } catch (error) {

                // User cancelled sharing.
                console.log("Share cancelled.");

            }

            return;

        }


        // Clipboard fallback

        try {

            await navigator.clipboard.writeText(websiteUrl);

            alert("Website link copied! You can now share it.");

        } catch (error) {

            // Older browser fallback

            const temporaryInput = document.createElement("input");

            temporaryInput.value = websiteUrl;

            document.body.appendChild(temporaryInput);

            temporaryInput.select();

            document.execCommand("copy");

            temporaryInput.remove();

            alert("Website link copied! You can now share it.");

        }

    });

}