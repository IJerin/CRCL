export default (TimeDifference = (endTImestamp, startTimestamp) => {
  var difference = endTImestamp - startTimestamp;
  var diff;
  if (difference / (1000 * 60 * 60 * 24) >= 1) {
    diff = Math.round(difference / (1000 * 60 * 60 * 24));
    if (diff === 1) {
      return {
        duration: "days",
        text: "A day ago"
        };
    } else {
      return {
        duration: "days",
        text: diff + " days ago"
        };
    }
  } else if (difference / (1000 * 60 * 60) >= 1) {
    diff = Math.round(difference / (1000 * 60 * 60));
    if (diff === 1) {
      return {
        duration: "hours",
        text: "An hour ago"
        };
    } else {
      return {
        duration: "hours",
        text: diff + " hours ago"
        };
    }
  } else if (difference / (1000 * 60) >= 1) {
    diff = Math.round(difference / (1000 * 60));
    if (diff === 1) {
      return {
        duration: "minutes",
        text: "A minute ago"
        };
    } else {
      return {
        duration: "minutes",
        text: diff + " minutes ago"
        };
    }
  } else {
    return {
      duration: "seconds",
      text: "Few seconds ago"
      };
  }
});
