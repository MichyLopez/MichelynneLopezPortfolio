
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const counter = document.getElementById("lightbox-counter");

const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentGallery = [];
let currentIndex = 0;

// Open image
document.querySelectorAll(".photo-gallery a").forEach(link => {

    link.addEventListener("click", function(event) {
        event.preventDefault();

        // Only collect images from the selected category
        const gallery = this.closest(".photo-gallery");

        currentGallery = Array.from(
            gallery.querySelectorAll("a")
        );

        currentIndex = currentGallery.indexOf(this);

        showImage(currentIndex);

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    });

});

// Display selected image
function showImage(index) {

    currentIndex = index;

    const selectedImage = currentGallery[currentIndex];

    lightboxImage.src = selectedImage.href;

    lightboxImage.alt =
        selectedImage.querySelector("img").alt;

    counter.textContent =
        `${currentIndex + 1} / ${currentGallery.length}`;
}

// Next image
nextButton.addEventListener("click", function() {

    currentIndex++;

    if (currentIndex >= currentGallery.length) {
        currentIndex = 0;
    }

    showImage(currentIndex);

});

// Previous image
prevButton.addEventListener("click", function() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentGallery.length - 1;
    }

    showImage(currentIndex);

});

// Close lightbox
function closeLightbox() {

    lightbox.classList.remove("active");
    lightboxImage.src = "";

    document.body.style.overflow = "";

}

closeButton.addEventListener("click", closeLightbox);

// Close when clicking outside the image
lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});

// Keyboard navigation
document.addEventListener("keydown", function(event) {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "ArrowRight") {
        nextButton.click();
    }

    if (event.key === "ArrowLeft") {
        prevButton.click();
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

});
