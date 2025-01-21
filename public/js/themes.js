const themeSwitch = document.getElementById('theme-switch');
    const icons = themeSwitch.querySelectorAll('svg');
  
    // Initial state: Assuming bright mode by default
    let isDarkMode = false;
  
    // Hide one icon initially
    icons[1].style.display = 'none'; // Hide moon icon in bright mode
  
    themeSwitch.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
  
      // Toggle between sun and moon icons
      if (isDarkMode) {
        icons[0].style.display = 'none'; // Hide sun icon
        icons[1].style.display = 'inline'; // Show moon icon
        document.getElementById('theme-stylesheet').setAttribute('href', 'css/styles_dark.css'); // Load dark theme
      } else {
        icons[0].style.display = 'inline'; // Show sun icon
        icons[1].style.display = 'none'; // Hide moon icon
        document.getElementById('theme-stylesheet').setAttribute('href', 'css/styles_bright.css'); // Load bright theme
      }
    });