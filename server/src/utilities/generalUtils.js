// generalUtils.js
// contains general helper methods used throughout the application


// function responsible for choosing random color
const randomColor = () => {
  const colorOptions = [
    `#0078D4`, // blue
    `#DB1CD3`, // purple
    `#1CDB24`, // light-green
    `#DB1C3F`, // red
    `#DBD31C`, // yellow
  ];
  // generating random index
  const randomIndex = Math.floor(Math.random() * colorOptions.length);
  return colorOptions[randomIndex];
};

module.exports = {
    randomColor,
};