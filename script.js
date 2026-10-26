
/* ==================================================
   1. DROPDOWN DOWNLOAD CV
================================================== */

function toggleCVDropdown() {
    const menu = document.getElementById("cvDropdownMenu");

    if (menu) {
        menu.classList.toggle("show");
    }
}

document.addEventListener("click", function (event) {
    const dropdown = document.querySelector(".cv-dropdown");
    const menu = document.getElementById("cvDropdownMenu");

    if (dropdown && menu && !dropdown.contains(event.target)) {
        menu.classList.remove("show");
    }
});


/* ==================================================
   2. GALERI DOKUMENTASI PENGALAMAN MAGANG
================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const documentationToggle =
        document.getElementById("documentationToggle");

    const projectGallery =
        document.getElementById("projectGallery");

    if (documentationToggle && projectGallery) {
        documentationToggle.addEventListener("click", function () {
            const isExpanded =
                documentationToggle.getAttribute("aria-expanded") === "true";

            documentationToggle.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            projectGallery.hidden = isExpanded;

            const arrow =
                documentationToggle.querySelector(".documentation-arrow");

            if (arrow) {
                arrow.textContent = isExpanded ? "⌄" : "⌃";
            }
        });
    }
});


/* ==================================================
   3. PERBESAR FOTO DOKUMENTASI (LIGHTBOX)
================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const photoLightbox = document.getElementById("photoLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    // Klik foto untuk memperbesar
    document.querySelectorAll(
        ".gallery-photo img, .project-main-image img"
    ).forEach(function (photo) {
        photo.style.cursor = "zoom-in";

        photo.addEventListener("click", function () {
            if (!photoLightbox || !lightboxImage) return;

            lightboxImage.src = photo.src;
            lightboxImage.alt = photo.alt || "Foto dokumentasi";
            photoLightbox.hidden = false;

            document.body.style.overflow = "hidden";
        });
    });

    // Tutup foto
    function hidePhotoLightbox() {
        if (photoLightbox) {
            photoLightbox.hidden = true;
        }

        if (lightboxImage) {
            lightboxImage.src = "";
        }

        document.body.style.overflow = "";
    }

    if (closeLightbox) {
        closeLightbox.addEventListener("click", hidePhotoLightbox);
    }

    // Tutup jika latar belakang diklik
    if (photoLightbox) {
        photoLightbox.addEventListener("click", function (event) {
            if (event.target === photoLightbox) {
                hidePhotoLightbox();
            }
        });
    }

    // Tutup dengan tombol Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            hidePhotoLightbox();
        }
    });
});


/* ==================================================
   4. ANIMASI ELEMEN SAAT SCROLL
   Muncul saat masuk layar dan menghilang saat keluar.
   Berlaku saat scroll ke bawah maupun ke atas.
================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!("IntersectionObserver" in window) || reduceMotion) {
        return;
    }

    const selectors = [
        "#home .hero-content",
        "#home .hero-image-area",
        "section:not(.biografi-page) .section-title",
        "#about .about-left",
        "#about .about-right",
        ".education-card",
        ".software-card",
        ".certificate-card",
        ".project-card",
        ".experience-card",
        ".gallery-item",
        ".contact-info",
        ".contact-right",
        ".biografi-content h1",
        ".biografi-card",
        ".experience-detail-container > *",
        ".internship-project > *",

        // Kartu pada section Projek Digital
        "#digital-projects .digital-project-card"
    ].join(", ");

    const elements = Array.from(
        document.querySelectorAll(selectors)
    );

    const staggerSelectors = [
        ".education-card",
        ".software-card",
        ".certificate-card",
        ".project-card",
        ".experience-card",
        ".gallery-item",
        ".digital-project-card"
    ].join(", ");

    // Tambahkan class animasi ke elemen
    elements.forEach(function (element) {
        element.classList.add("reveal");

        if (
            element.matches(staggerSelectors) &&
            element.parentElement
        ) {
            const siblings = Array.from(
                element.parentElement.children
            ).filter(function (sibling) {
                return sibling.matches(staggerSelectors);
            });

            const index = siblings.indexOf(element);

            // Animasi kartu muncul bergantian
            element.style.transitionDelay =
                `${Math.max(0, index % 5) * 90}ms`;
        }
    });

    // Pantau apakah elemen sedang berada di layar
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    // Hapus class agar animasi dapat berulang
                    // ketika elemen masuk layar kembali.
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elements.forEach(function (element) {
        observer.observe(element);
    });
});


/* ==================================================
   5. MODAL PREVIEW SERTIFIKAT
================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(
        "#certificates .certificate-card"
    );

    // Hindari membuat modal ganda jika script terpasang lebih dari sekali
    let modal = document.querySelector(".certificate-modal");

    if (!modal) {
        modal = document.createElement("div");
        modal.className = "certificate-modal";

        modal.innerHTML = `
            <button class="certificate-modal-close"
                    type="button"
                    aria-label="Tutup">&times;</button>
            <img src="" alt="Sertifikat diperbesar">
        `;

        document.body.appendChild(modal);
    }

    const modalImage = modal.querySelector("img");
    const closeButton = modal.querySelector(
        ".certificate-modal-close"
    );

    function closeModal() {
        modal.classList.remove("active");
        modalImage.src = "";
    }

    cards.forEach(function (card) {
        const button = card.querySelector(".btn-preview");
        const image = card.querySelector(".certificate-image img");

        if (!button || !image) return;

        button.addEventListener("click", function () {
            modalImage.src = image.src;
            modalImage.alt = image.alt || "Sertifikat diperbesar";
            modal.classList.add("active");
        });
    });

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });
});


/* ==================================================
   6. MICROSOFT OFFICE - SKILL LEVEL PER APLIKASI
================================================== */

function changeOfficeSkill() {
    const officeSkill = document.getElementById("officeSkill");
    const officePercent = document.getElementById("officePercent");
    const officeProgress = document.getElementById("officeProgress");
    const officeDescription = document.getElementById("officeDescription");

    if (
        !officeSkill ||
        !officePercent ||
        !officeProgress ||
        !officeDescription
    ) {
        return;
    }

    const skills = {
        word: {
            percent: 85,
            description:
                "Mampu membuat dokumen profesional, mengatur format, menggunakan mail merge, dan membuat template dokumen."
        },

        excel: {
            percent: 75,
            description:
                "Mampu mengolah data, menggunakan rumus, membuat tabel, dan menyajikan data dalam bentuk grafik."
        },

        powerpoint: {
            percent: 80,
            description:
                "Mampu membuat presentasi profesional dengan tata letak terstruktur, visual menarik, dan animasi."
        }
    };

    const selectedSkill = skills[officeSkill.value];

    if (!selectedSkill) return;

    officePercent.textContent = selectedSkill.percent + "%";
    officeProgress.style.width = selectedSkill.percent + "%";
    officeDescription.textContent = selectedSkill.description;
}

// Atur tampilan awal sesuai pilihan dropdown
document.addEventListener("DOMContentLoaded", function () {
    changeOfficeSkill();
});

/* ==================================================
   7. PROJEK DIGITAL - TOMBOL DAN NOTIFIKASI
================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("digitalProjectModal");
    const closeButton = document.getElementById("digitalModalClose");
    const okButton = document.getElementById("digitalModalOk");
    const developingButton = document.querySelector(
        '[data-project-action="developing"]'
    );

    if (!modal) return;

    function openDevelopingNotice() {
        modal.hidden = false;
        document.body.style.overflow = "hidden";

        if (okButton) {
            okButton.focus();
        }
    }

    function closeDevelopingNotice() {
        modal.hidden = true;
        document.body.style.overflow = "";
    }

    if (developingButton) {
        developingButton.addEventListener("click", openDevelopingNotice);
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeDevelopingNotice);
    }

    if (okButton) {
        okButton.addEventListener("click", closeDevelopingNotice);
    }

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeDevelopingNotice();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) {
            closeDevelopingNotice();
        }
    });
});

/* ==================================================
   GALLERY - ZOOM / FOKUS FOTO
================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector("#gallery .gallery-grid");

    if (!gallery) return;

    // Buat modal zoom secara otomatis
    let modal = document.getElementById("galleryZoomModal");

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "galleryZoomModal";
        modal.hidden = true;

        modal.innerHTML = `
            <button
                type="button"
                id="galleryZoomClose"
                aria-label="Tutup foto">&times;</button>
            <img src="" alt="Foto galeri diperbesar">
        `;

        document.body.appendChild(modal);
    }

    const modalImage = modal.querySelector("img");
    const closeButton = modal.querySelector("#galleryZoomClose");

    function openGalleryPhoto(photo) {
        modalImage.src = photo.currentSrc || photo.src;
        modalImage.alt = photo.alt || "Foto galeri diperbesar";
        modal.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function closeGalleryPhoto() {
        modal.hidden = true;
        modalImage.src = "";
        document.body.style.overflow = "";
    }

    gallery.querySelectorAll(".gallery-item img").forEach(function (photo) {
        photo.addEventListener("click", function () {
            openGalleryPhoto(photo);
        });
    });

    closeButton.addEventListener("click", closeGalleryPhoto);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeGalleryPhoto();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) {
            closeGalleryPhoto();
        }
    });
});
