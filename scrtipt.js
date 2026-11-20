(() => {
  const lightbox = document.getElementById("portfolioLightbox");
  if (!lightbox) return;
  const image = document.getElementById("portfolioImage");
  const video = document.getElementById("portfolioVideo");
  const category = document.getElementById("portfolioCategory");
  const title = document.getElementById("portfolioTitle");
  const description = document.getElementById("portfolioDescription");
  const count = document.getElementById("portfolioCount");
  const closeButton = lightbox.querySelector(".project-close");
  const prevButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");

  const webProjects = {
    scope:{category:"PROJECT SCOPE",title:"Galactic Kitchen Project Scope",description:"Explore the planning, goals, and requirements behind the website.",type:"image",media:["Assets/WebDesign/ProjectScope/Scope1.png","Assets/WebDesign/ProjectScope/Scope2.png","Assets/WebDesign/ProjectScope/Scope3.png"]},
    wireframe:{category:"WIREFRAME",title:"Galactic Kitchen Wireframe",description:"Explore the original page layouts and website structure.",type:"image",media:["Assets/WebDesign/GalacticWireframe.jpg"]},
    prototype:{category:"PROTOTYPE",title:"Galactic Kitchen Prototype",description:"Explore the interactive design and visual direction.",type:"image",media:["Assets/WebDesign/Prototype.png"]}
  };
  const videoProjects = {
    unfilteredChaos:{category:"VIDEO / MOTION DESIGN",title:"Unfiltered Chaos",description:"This fast-paced editing project demonstrates my ability to build an engaging story through pacing, transitions, and sound design. I combined music, visual effects, and creative editing techniques with clips from my personal life at school and work. I also incorporated graphic elements representing food, books, stars, and hearts.",type:"video",media:["Assets/VideoEditing/Video4.mp4"]},
    logoVid:{category:"VIDEO / MOTION DESIGN",title:"MA Visuals",description:"A promotional-style edit highlighting cinematic footage, color correction, motion graphics, smooth transitions, and carefully timed edits.",type:"video",media:["Assets/VideoEditing/Video2.mp4"]},
    VFXshot:{category:"VIDEO / GREEN SCREEN",title:"Visual Effects",description:"A visual effects project demonstrating compositing, color correction, motion graphics, and creative editing techniques.",type:"video",media:["Assets/VideoEditing/Video1.mp4"]},
    eggVideo:{category:"VIDEO / GREEN SCREEN",title:"Short Visual Effects Video",description:"I replaced a screen with a desktop that appears to move on its own, added visual effects for an unusual egg and message reveal, then color-corrected the footage so the clips had matching lighting and color.",type:"video",media:["Assets/VideoEditing/Video5.mp4"]},
    roadTrip:{category:"VIDEO / SOCIAL MEDIA",title:"Family Road Trip",description:"This travel video captures my family's road trip to the Blue Bell Ice Cream Factory in Brenham and Ripley's Museum in San Antonio. I selected wide, medium, and close-up shots to create a cohesive story, used soft wipe transitions to distinguish locations, added camera tracking for the opening title, and applied color correction for a vintage feel.",type:"video",media:["Assets/VideoEditing/Video6.mp4"]}
  };

  const internshipProjects = {
    bigGive: {
      category: "BIG GIVE",
      title: "Big Give Projects",
      description: "A collection of photography, graphics, and video content created for Big Give.",
      media: [
        { type: "video", src: "Assets/Internship/BigGive/BigGiveReel.MP4" },
        { type: "image", src: "Assets/Internship/BigGive/BigGiveBingo.png" },
        { type: "video", src: "Assets/Internship/BigGive/TimeUpdatesforLives.MP4" },
        { type: "image", src: "Assets/Internship/BigGive/BigGiveBG.JPG" },
        { type: "image", src: "Assets/Internship/BigGive/qrBeforeAfter.png" }
      ]
    },
    gala: {
      category: "GALA",
      title: "Gala Projects",
      description: "Promotional and event-related media created for the Gala.",
      media: [
        { type: "video", src: "Assets/Internship/Gala/ProgramVideo.mp4" },
        { type: "image", src: "Assets/Internship/Gala/TableTentsSS.PNG" },
        { type: "image", src: "Assets/Internship/Gala/GalaPhoto.JPG" }
      ]
    },
    reels: {
      category: "SOCIAL MEDIA REELS",
      title: "Social Media Reels",
      description: "A collection of short-form video content created for social media.",
      media: [
        { type: "video", src: "Assets/Internship/Reels/BackUpReel.MP4" },
        { type: "video", src: "Assets/Internship/Reels/Fun Dancing Reel.MP4" },
        { type: "video", src: "Assets/Internship/Reels/Pointing Reel.MP4" },
        { type: "video", src: "Assets/Internship/Reels/Sliding reel.MP4" },
        { type: "video", src: "Assets/Internship/Reels/UnBlurrReel.MP4" },
        { type: "video", src: "Assets/Internship/Reels/WalkingReel.MP4" }
      ]
    },

    otherAssets: {
      category: "OTHER ASSETS",
      title: "Additional Creative Assets",
      description: "Additional photography, graphics, and promotional materials created during the internship. From small informational posts about camps to promoting the communities trunk or treat.",
      media: [
        { type: "image", src: "Assets/Internship/otherAssets/BookDrivePhoto.jpeg" },
        { type: "image", src: "Assets/Internship/otherAssets/BrandStatmentSS.PNG" },
        { type: "image", src: "Assets/Internship/otherAssets/FallCampSS.PNG" },
        { type: "image", src: "Assets/Internship/otherAssets/WinterCampSS.PNG" },
        { type: "video", src: "Assets/Internship/TrunkorTreat/trunkOrTreatSRec.mp4" },
        { type: "image", src: "Assets/Internship/TrunkorTreat/trunkOrTreat.PNG" },
        { type: "image", src: "Assets/Internship/TrunkorTreat/MondayCaptionsSS.PNG" }
      ]
    }
  };

  let items=[]; let index=0;
  function cardData(card){const img=card.querySelector("img");return {category:card.querySelector("span")?.textContent.trim()||"",title:card.querySelector("h2")?.textContent.trim()||img?.alt||"Project",description:card.querySelector("p")?.textContent.trim()||"",type:"image",media:[img?.currentSrc||img?.src||""]};}
  function render() {
    if (!items.length) return;

    index = (index + items.length) % items.length;
    const item = items[index];
    const mediaIndex = item.page || 0;
    const mediaItem = item.media[mediaIndex];
    const src = typeof mediaItem === "string" ? mediaItem : mediaItem?.src || "";
    const mediaType = typeof mediaItem === "string" ? item.type : mediaItem?.type;

    category.textContent = item.category || "";
    title.textContent = item.title || "";
    description.textContent = item.description || "";

    if (mediaType === "video") {
      image.hidden = true;
      image.removeAttribute("src");
      video.hidden = false;
      video.pause();
      video.src = src;
      video.load();
    } else {
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.hidden = true;
      image.hidden = false;
      image.src = src;
      image.alt = item.alt || item.title || "";
    }

    count.textContent = item.media.length > 1
      ? `PAGE ${mediaIndex + 1} OF ${item.media.length}`
      : `${index + 1} / ${items.length}`;

    const nav = items.length > 1 || item.media.length > 1;
    prevButton.hidden = nextButton.hidden = !nav;
  }
  function open(list,start=0){items=list;index=start;render();lightbox.classList.add("active");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";closeButton.focus();}
  function close(){lightbox.classList.remove("active");lightbox.setAttribute("aria-hidden","true");document.body.style.overflow="";video.pause();video.removeAttribute("src");video.load();image.removeAttribute("src");items=[];index=0;}
  function move(dir){if(!items.length)return;const item=items[index];if(item.media.length>1){item.page=((item.page||0)+dir+item.media.length)%item.media.length;render();}else renderIndex(index+dir);}
  function renderIndex(next){index=(next+items.length)%items.length;render();}
  document.addEventListener("click",e=>{
    const photo=e.target.closest(".photo-gallery a[data-lightbox='photo']");
    if(photo){e.preventDefault();const links=[...photo.closest(".photo-gallery").querySelectorAll("a[data-lightbox='photo']")];const list=links.map(a=>({category:"PHOTOGRAPHY",title:a.querySelector("img")?.alt||"Photograph",description:"",type:"image",media:[a.getAttribute("href")],alt:a.querySelector("img")?.alt||"",page:0}));open(list,links.indexOf(photo));return;}
    const card=e.target.closest(".project-card[data-lightbox]");if(!card)return;const link=e.target.closest("a");if(link&&!link.classList.contains("view-project")&&link.getAttribute("href")!=="#")return;if(link)e.preventDefault();
    const grid=card.closest(".project-grid");const cards=[...(grid||document).querySelectorAll(".project-card[data-lightbox]")].filter(c=>c.dataset.lightbox===card.dataset.lightbox);
    let list;if(card.dataset.lightbox==="web")list=cards.map(c=>webProjects[c.dataset.project]||cardData(c));else if(card.dataset.lightbox==="video")list=cards.map(c=>videoProjects[c.dataset.project]||cardData(c));else if(card.dataset.lightbox==="internship")list=cards.map(c=>internshipProjects[c.dataset.project]||cardData(c));else list=cards.map(cardData);open(list,cards.indexOf(card));
  });
  closeButton.addEventListener("click",close);prevButton.addEventListener("click",()=>move(-1));nextButton.addEventListener("click",()=>move(1));lightbox.addEventListener("click",e=>{if(e.target===lightbox)close();});document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("active"))return;if(e.key==="Escape")close();if(e.key==="ArrowRight")move(1);if(e.key==="ArrowLeft")move(-1);});
})();