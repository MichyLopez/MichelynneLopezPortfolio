console.log("Project lightbox script loaded!");

console.log(
    "Project cards found:",
    document.querySelectorAll(".project-card").length
);

// ======================================
// SHARED LIGHTBOX CONTROLS
// ======================================

let activeLightbox = null;

function openLightbox(lightbox) {
    lightbox.classList.add("active");
    activeLightbox = lightbox;
    document.body.style.overflow = "hidden";
}

function closeLightbox(lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    activeLightbox = null;
}

// One keyboard listener for both lightboxes
document.addEventListener("keydown", function(event) {
    if (!activeLightbox) return;

    if (event.key === "Escape") {
        if (activeLightbox.id === "lightbox") {
            activeLightbox.closePhoto();
        } else {
            closeProjectLightbox();
        }
    }

    if (event.key === "ArrowRight") {
        if (activeLightbox.id === "lightbox") {
            activeLightbox.nextPhoto();
        } else {
            nextProject();
        }
    }

    if (event.key === "ArrowLeft") {
        if (activeLightbox.id === "lightbox") {
            activeLightbox.previousPhoto();
        } else {
            previousProject();
        }
    }
});




// ======================================
// PHOTOGRAPHY LIGHTBOX
// ======================================

const lightbox = document.getElementById("lightbox");

if (lightbox) {

    const lightboxImage = document.getElementById("lightbox-image");
    const counter = document.getElementById("lightbox-counter");

    const closeButton = document.querySelector(".lightbox-close");
    const prevButton = document.querySelector(".lightbox-prev");
    const nextButton = document.querySelector(".lightbox-next");

    let currentGallery = [];
    let currentIndex = 0;

    function showImage(index) {
        currentIndex = index;

        const selectedImage = currentGallery[currentIndex];

        lightboxImage.src = selectedImage.href;
        lightboxImage.alt = selectedImage.querySelector("img").alt;

        counter.textContent =
            `${currentIndex + 1} / ${currentGallery.length}`;
    }

    function nextPhoto() {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        showImage(currentIndex);
    }

    function previousPhoto() {
        currentIndex =
            (currentIndex - 1 + currentGallery.length) % currentGallery.length;

        showImage(currentIndex);
    }

    function closePhotoLightbox() {
        closeLightbox(lightbox);
        lightboxImage.src = "";
    }

    document.querySelectorAll(".photo-gallery a").forEach(link => {

        link.addEventListener("click", function(event) {
            event.preventDefault();

            const gallery = this.closest(".photo-gallery");

            currentGallery = Array.from(gallery.querySelectorAll("a"));
            currentIndex = currentGallery.indexOf(this);

            showImage(currentIndex);
            openLightbox(lightbox);
        });

    });

    nextButton?.addEventListener("click", nextPhoto);
    prevButton?.addEventListener("click", previousPhoto);
    closeButton?.addEventListener("click", closePhotoLightbox);

    lightbox.addEventListener("click", function(event) {
        if (event.target === lightbox) {
            closePhotoLightbox();
        }
    });

    // Make navigation functions available to shared keyboard controls
    lightbox.nextPhoto = nextPhoto;
    lightbox.previousPhoto = previousPhoto;
    lightbox.closePhoto = closePhotoLightbox;
}



// ======================================
// GRAPHIC DESIGN PROJECT LIGHTBOX
// ======================================

const projectLightbox = document.getElementById("projectLightbox");

const projectImage = document.getElementById("projectImage");
const projectCategory = document.getElementById("projectCategory");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const projectCount = document.getElementById("projectCount");

const projectClose = document.querySelector(".project-close");
const projectPrev = document.querySelector(".project-prev");
const projectNext = document.querySelector(".project-next");

const projects = Array.from(
    document.querySelectorAll(".project-card")
);

let currentProject = 0;

function showProject(index) {
    currentProject = index;

    const project = projects[currentProject];

    const image = project.querySelector("img");
    const category = project.querySelector("span");
    const title = project.querySelector("h2");
    const description = project.querySelector("p");

    projectImage.src = image.src;
    projectImage.alt = image.alt;

    projectCategory.textContent = category.textContent;
    projectTitle.textContent = title.textContent;
    projectDescription.textContent = description.textContent;

    projectCount.textContent =
        `${currentProject + 1} / ${projects.length}`;
}

projects.forEach((project, index) => {

    project.style.cursor = "pointer";

    project.addEventListener("click", function() {
        showProject(index);
        openLightbox(projectLightbox);
        projectClose.focus();
    });

});

function nextProject() {
    currentProject = (currentProject + 1) % projects.length;
    showProject(currentProject);
}

function previousProject() {
    currentProject =
        (currentProject - 1 + projects.length) % projects.length;

    showProject(currentProject);
}

function closeProjectLightbox() {
    closeLightbox(projectLightbox);
    projectImage.src = "";
}

projectNext.addEventListener("click", nextProject);
projectPrev.addEventListener("click", previousProject);
projectClose.addEventListener("click", closeProjectLightbox);

projectLightbox.addEventListener("click", function(event) {
    if (event.target === projectLightbox) {
        closeProjectLightbox();
    }
});

