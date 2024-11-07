function toggleMobileMenu() {
  const navMenuMobile = document.getElementById("navMenuMobile");
  navMenuMobile.classList.toggle("nav-menu-active");
}

document.querySelectorAll('.nav-menu-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById("navMenuMobile").classList.remove("nav-menu-active");
  });
});
