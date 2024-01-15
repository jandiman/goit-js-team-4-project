document.addEventListener('DOMContentLoaded', function () {
  const totalPages = 20; // Replace with the total number of pages
  const pageNumbers = document.getElementById('pageNumbers');
  let currentPage = 1;

  function setActivePage(page) {
    const lis = pageNumbers.getElementsByTagName('li');
    for (let i = 0; i < lis.length; i++) {
      lis[i].classList.remove('active');
    }
    lis[page - 1].classList.add('active');
  }

  function navigateToPage(page) {
    // Implement the logic to navigate to the selected page
    // For demonstration purposes, this alert is used
    alert('Navigate to page ' + page);
  }

  function handlePageClick(page) {
    setActivePage(page);
    navigateToPage(page);
  }

  function createPagination() {
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.textContent = i;
      li.addEventListener('click', function () {
        handlePageClick(i);
      });
      pageNumbers.appendChild(li);
    }
    setActivePage(currentPage);
  }

  createPagination();
});
