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

  // function responsible for generating header title for chat
  const formatDefaultConversationTitle = () => {
    let title = "";
    for (let i = 0; i < chatParticipants.length; ++i) {
      if (i === chatParticipants.length - 1) {
        title += chatParticipants[i].username;
      }
      else if (i === chatParticipants.length - 2) {
        title += chatParticipants[i].username + " & ";
      }
      else {
        title += chatParticipants[i].username + ", ";
      }
    }
    return title;
  };

module.exports = {
    randomColor,
    formatDefaultConversationTitle,
};