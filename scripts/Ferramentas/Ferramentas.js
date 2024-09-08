function openTab(tabName) {

  const tabContent = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.remove('active');
  }


  const tabButtons = document.getElementsByClassName('tab-button');
  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove('active');
  }


  document.getElementById(tabName).classList.add('active');
  event.currentTarget.classList.add('active');
}