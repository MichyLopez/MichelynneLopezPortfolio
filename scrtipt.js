console.log(
    "Project cards found:",
    document.querySelectorAll(".project-card").length
  );
  
  // ======================================
  // SHARED LIGHTBOX HELPERS
  // ======================================
  
  let activeLightbox = null;
  
  function openLightbox(lightbox) {
    if (!lightbox) return;
    lightbox.classList.add("active");
    activeLightbox = lightbox;
    document.body.style.overflow = "hidden";
  }
  
  function closeLightbox(lightbox) {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    activeLightbox = null;
  }
  
  // One shared keyboard listener for all lightboxes
  document.addEventListener("keydown", function (event) {
    if (!activeLightbox) return;
  
    const id = activeLightbox.id;
  
    if (event.key === "Escape") {
      if (id === "lightbox" && activeLightbox.closePhoto) {
        activeLightbox.closePhoto();
      } else if (id === "projectLightbox") {
        closeProjectLightbox();
      } else if (id === "webProjectLightbox") {
        closeWebProject();
      }
    }
  
    if (event.key === "ArrowRight") {
      if (id === "lightbox" && activeLightbox.nextPhoto) {
        activeLightbox.nextPhoto();
      } else if (id === "projectLightbox") {
        nextProject();
      } else if (id === "webProjectLightbox") {
        changeWebProjectPage(1);
      }
    }
  
    if (event.key === "ArrowLeft") {
      if (id === "lightbox" && activeLightbox.previousPhoto) {
        activeLightbox.previousPhoto();
      } else if (id === "projectLightbox") {
        previousProject();
      } else if (id === "webProjectLightbox") {
        changeWebProjectPage(-1);
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
      if (!selectedImage) return;
  
      lightboxImage.src = selectedImage.href;
      lightboxImage.alt = selectedImage.querySelector("img")?.alt || "";
      counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    }
  
    function nextPhoto() {
      currentIndex = (currentIndex + 1) % currentGallery.length;
      showImage(currentIndex);
    }
  
    function previousPhoto() {
      currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
      showImage(currentIndex);
    }
  
    function closePhotoLightbox() {
      closeLightbox(lightbox);
      lightboxImage.src = "";
    }
  
    document.querySelectorAll(".photo-gallery a").forEach((link) => {
      link.addEventListener("click", function (event) {
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
  
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closePhotoLightbox();
    });
  
    // Expose methods for shared keyboard handler
    lightbox.nextPhoto = nextPhoto;
    lightbox.previousPhoto = previousPhoto;
    lightbox.closePhoto = closePhotoLightbox;
  }
  
  // ======================================
  // GRAPHIC DESIGN PROJECT LIGHTBOX
  // ======================================
  
  const projectLightbox = document.getElementById("projectLightbox");
  const projects = Array.from(document.querySelectorAll(".project-card"));
  
  if (projectLightbox && projects.length > 0) {
    const projectImage = document.getElementById("projectImage");
    const projectCategory = document.getElementById("projectCategory");
    const projectTitle = document.getElementById("projectTitle");
    const projectDescription = document.getElementById("projectDescription");
    const projectCount = document.getElementById("projectCount");
  
    const projectClose = document.querySelector(".project-close");
    const projectPrev = document.querySelector(".project-prev");
    const projectNext = document.querySelector(".project-next");
  
    let currentProject = 0;
  
    function showProject(index) {
      currentProject = index;
      const project = projects[currentProject];
      if (!project) return;
  
      const image = project.querySelector("img");
      const category = project.querySelector("span");
      const title = project.querySelector("h2");
      const description = project.querySelector("p");
  
      if (image) {
        projectImage.src = image.src;
        projectImage.alt = image.alt || "";
      }
  
      projectCategory.textContent = category?.textContent || "";
      projectTitle.textContent = title?.textContent || "";
      projectDescription.textContent = description?.textContent || "";
      projectCount.textContent = `${currentProject + 1} / ${projects.length}`;
    }
  
    function nextProject() {
      currentProject = (currentProject + 1) % projects.length;
      showProject(currentProject);
    }
  
    function previousProject() {
      currentProject = (currentProject - 1 + projects.length) % projects.length;
      showProject(currentProject);
    }
  
    function closeProjectLightbox() {
      closeLightbox(projectLightbox);
      projectImage.src = "";
    }
  
    // Make functions available to the shared keyboard handler
    window.nextProject = nextProject;
    window.previousProject = previousProject;
    window.closeProjectLightbox = closeProjectLightbox;
  
    projects.forEach((project, index) => {
      project.style.cursor = "pointer";
      project.addEventListener("click", () => {
        showProject(index);
        openLightbox(projectLightbox);
        projectClose?.focus();
      });
    });
  
    projectNext?.addEventListener("click", nextProject);
    projectPrev?.addEventListener("click", previousProject);
    projectClose?.addEventListener("click", closeProjectLightbox);
  
    projectLightbox.addEventListener("click", (event) => {
      if (event.target === projectLightbox) closeProjectLightbox();
    });
  }
  
  // ======================================
  // WEB DESIGN PROJECT LIGHTBOX
  // ======================================
  
  const webProjectLightbox = document.getElementById("webProjectLightbox");
  
  if (webProjectLightbox) {
    const webProjectImage = document.getElementById("webProjectImage");
    const webProjectCategory = document.getElementById("webProjectCategory");
    const webProjectTitle = document.getElementById("webProjectTitle");
    const webProjectDescription = document.getElementById("webProjectDescription");
    const webProjectCount = document.getElementById("webProjectCount");
  
    const webProjectClose = document.querySelector(".web-project-close");
    const webProjectPrev = document.querySelector(".web-project-prev");
    const webProjectNext = document.querySelector(".web-project-next");
  
    const webProjectData = {
      scope: {
        category: "PROJECT SCOPE",
        title: "Galactic Kitchen Project Scope",
        description: "Explore the planning, goals, and requirements behind the website.",
        images: [
          "Assets/WebDesign/ProjectScope/Scope1.png",
          "Assets/WebDesign/ProjectScope/Scope2.png",
          "Assets/WebDesign/ProjectScope/Scope3.png",
        ],
      },
      wireframe: {
        category: "WIREFRAME",
        title: "Galactic Kitchen Wireframe",
        description: "Explore the original page layouts and website structure.",
        images: ["Assets/WebDesign/GalacticWireframe.jpg"],
      },
      prototype: {
        category: "PROTOTYPE",
        title: "Galactic Kitchen Prototype",
        description: "Explore the interactive design and visual direction.",
        images: ["Assets/WebDesign/Prototype.png"],
      },
    };
  
    let activeWebProject = null;
    let activeWebPage = 0;
  
    function openWebProject(projectName) {
      const project = webProjectData[projectName];
      if (!project) return;
  
      activeWebProject = project;
      activeWebPage = 0;
  
      webProjectCategory.textContent = project.category;
      webProjectTitle.textContent = project.title;
      webProjectDescription.textContent = project.description;
  
      webProjectLightbox.classList.toggle("single-image", project.images.length === 1);
  
      updateWebProject();
      openLightbox(webProjectLightbox); // ← now uses shared helper
      webProjectClose?.focus();
    }
  
    function updateWebProject() {
      if (!activeWebProject) return;
  
      webProjectImage.src = activeWebProject.images[activeWebPage];
      webProjectImage.alt = `${activeWebProject.title}, page ${activeWebPage + 1}`;
  
      webProjectCount.textContent =
        activeWebProject.images.length > 1
          ? `PAGE ${activeWebPage + 1} OF ${activeWebProject.images.length}`
          : "";
    }
  
    function changeWebProjectPage(direction) {
      if (!activeWebProject || activeWebProject.images.length <= 1) return;
  
      activeWebPage =
        (activeWebPage + direction + activeWebProject.images.length) %
        activeWebProject.images.length;
  
      updateWebProject();
    }
  
    function closeWebProject() {
      closeLightbox(webProjectLightbox);
      webProjectLightbox.classList.remove("single-image");
      webProjectImage.src = "";
      activeWebProject = null;
      activeWebPage = 0;
    }
  
    // Expose for shared keyboard handler
    window.changeWebProjectPage = changeWebProjectPage;
    window.closeWebProject = closeWebProject;
  
    // Card clicks
    document.querySelectorAll(".web-project-card").forEach((card) => {
      card.addEventListener("click", function (event) {
        event.preventDefault();
        openWebProject(this.dataset.project);
      });
    });
  
    // Buttons
    webProjectClose?.addEventListener("click", closeWebProject);
    webProjectPrev?.addEventListener("click", () => changeWebProjectPage(-1));
    webProjectNext?.addEventListener("click", () => changeWebProjectPage(1));
  
    // Click outside
    webProjectLightbox.addEventListener("click", (event) => {
      if (event.target === webProjectLightbox) closeWebProject();
    });
  }