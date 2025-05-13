document.addEventListener('DOMContentLoaded', function() {
  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Search functionality
  const searchBox = document.querySelector('.search-box');
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-input');

  searchBtn.addEventListener('click', function() {
    searchBox.classList.toggle('active');
    if (searchBox.classList.contains('active')) {
      searchInput.focus();
    }
  });

  document.addEventListener('click', function(e) {
    if (!searchBox.contains(e.target) && searchBox.classList.contains('active')) {
      searchBox.classList.remove('active');
    }
  });

  // Row navigation
  const rowNavBtns = document.querySelectorAll('.row-nav-btn');
  rowNavBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const direction = this.classList.contains('row-nav-left') ? -1 : 1;
      const rowContent = this.parentElement.querySelector('.row-content');
      const scrollAmount = rowContent.clientWidth * 0.75 * direction;
      rowContent.scrollLeft += scrollAmount;
    });
  });

  // Modal functionality
  const modal = document.getElementById('movie-modal');
  const modalClose = document.querySelector('.modal-close');
  const thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      const movieId = this.getAttribute('data-id');
      openMovieModal(movieId);
    });
  });

  modalClose.addEventListener('click', function() {
    closeMovieModal();
  });

  // Close modal when clicking outside content
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeMovieModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeMovieModal();
    }
  });

  // Featured content "More Info" button
  const moreInfoBtn = document.querySelector('.btn-more-info');
  moreInfoBtn.addEventListener('click', function() {
    openMovieModal('featured');
  });

  function openMovieModal(movieId) {
    // In a real app, you would fetch movie details based on the ID
    // For this demo, we'll just update the title
    const modalTitle = document.querySelector('.modal-title');
    modalTitle.textContent = movieId === 'featured' ? 'Stranger Things' : `Movie Title ${movieId}`;
    
    // Update modal backdrop
    const modalBackdrop = document.querySelector('.modal-backdrop');
    modalBackdrop.style.backgroundImage = `url('https://via.placeholder.com/950x500?text=Movie+${movieId}')`;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  function closeMovieModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Simulate loading more content when scrolling to bottom
  let loadingMore = false;
  window.addEventListener('scroll', function() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;
    
    if (scrollPosition >= pageHeight - 500 && !loadingMore) {
      loadMoreContent();
    }
  });

  function loadMoreContent() {
    loadingMore = true;
    
    // Simulate loading delay
    setTimeout(() => {
      // Clone the last row and append it
      const lastRow = document.querySelector('.content-section .row:last-child');
      const newRow = lastRow.cloneNode(true);
      
      // Update the title
      const rowTitle = newRow.querySelector('.row-title');
      const titles = ['Action Movies', 'Comedies', 'Documentaries', 'Horror', 'International Films'];
      rowTitle.textContent = titles[Math.floor(Math.random() * titles.length)];
      
      // Update the thumbnails
      const thumbnails = newRow.querySelectorAll('.thumbnail');
      let startId = Math.floor(Math.random() * 100) + 25;
      thumbnails.forEach((thumbnail, index) => {
        const newId = startId + index;
        thumbnail.setAttribute('data-id', newId);
        const img = thumbnail.querySelector('img');
        img.src = `https://via.placeholder.com/240x135?text=Movie+${newId}`;
        img.alt = `Movie ${newId}`;
        
        // Reattach event listener
        thumbnail.addEventListener('click', function() {
          openMovieModal(this.getAttribute('data-id'));
        });
      });
      
      // Reattach navigation button event listeners
      const navBtns = newRow.querySelectorAll('.row-nav-btn');
      navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const direction = this.classList.contains('row-nav-left') ? -1 : 1;
          const rowContent = this.parentElement.querySelector('.row-content');
          const scrollAmount = rowContent.clientWidth * 0.75 * direction;
          rowContent.scrollLeft += scrollAmount;
        });
      });
      
      // Append the new row
      document.querySelector('.content-section').appendChild(newRow);
      
      loadingMore = false;
    }, 1000);
  }
});