const FindMatch = (user, discoveredUser) => {
  //Will be checking
  //FB mutual friends
  //work_history
  //education_history
  //hometown
  // gender
  //lives in
  //relationship status
  //gender, relationship status and lives matches will be qualified for a push
  //same hometown will be qualified for a push
  //same education will be qualified for a push
  //same mutual friends will be qualified for a push
  //same work history will be qualified for a push
  const matchedCriterias = [];
  let returnMessage = "";
  //matching work
  if (user.work_history !== "none" && discoveredUser.work_history !== "none") {
    user.work_history.forEach(userWork => {
      discoveredUser.work_history.forEach(discoveredWork => {
        if (userWork.employer.name === discoveredWork.employer.name) {
          matchedCriterias.push(
            `Both of you worked at ${discoveredWork.employer.name}`
          );
        } else if (userWork.location.name === discoveredWork.location.name) {
          matchedCriterias.push(
            `Both of you worked at ${discoveredWork.location.name}`
          );
        } else if (userWork.position.name === discoveredWork.position.name) {
          if (userWork.location.name === discoveredWork.location.name) {
            matchedCriterias.push(
              `Both of you are ${
                discoveredWork.position.name
              }s who have worked at ${discoveredWork.location.name}`
            );
          }
        }
      });
    });
  }
  //matching education
  if (
    user.education_history !== "none" &&
    discoveredUser.education_history !== "none"
  ) {
    user.education_history.forEach(userEducation => {
      discoveredUser.education_history.forEach(discoveredEducation => {
        if (userEducation.school.name === discoveredEducation.school.name) {
          matchedCriterias.push(
            `Both of you studied at ${discoveredEducation.school.name}`
          );
        }
      });
    });
  }
  //matching hometown
  if (
    user.hometown !== "none" &&
    discoveredUser.hometown !== "none" &&
    user.hometown === discoveredUser.hometown
  ) {
    matchedCriterias.push(`Both of you are from ${discoveredUser.hometown}`);
  }

  //matching fb friends
  //   if (user.FBFriends.data !== undefined && discoveredUser.FBFriends.data !== undefined) {
  //     // user.FBFriends.data.forEach((userFreind) => {
  //     //   discoveredUser.FBFriends.data.forEach((discoveredFriend) => {
  //     //     if (userFreind.id === discoveredFriend.id) {
  //     //       matchedCriterias.push(`Both of you has a same friend named ${discoveredFriend.name}`);
  //     //     }
  //     //   });
  //     // });
  //   }

  //matching location, rel status and place of living
  if (
    user.location !== "none" &&
    discoveredUser.location !== "none" &&
    user.location === discoveredUser.location
  ) {
    if (
      user.relationship_status === "Single" &&
      discoveredUser.relationship_status === "Single"
    ) {
      if (user.gender === "male" && discoveredUser.gender === "female") {
        matchedCriterias.push(
          `Both of you live in ${discoveredUser.location}, and are single.`
        );
      } else if (user.gender === "female" && discoveredUser.gender === "male") {
        matchedCriterias.push(
          `Both of you live in ${discoveredUser.location}, and are single.`
        );
      }
    }
  }

  for (let i = 0; i < matchedCriterias.length; i += 1) {
    returnMessage += matchedCriterias[i];
  }

  return {
    type: true,
    message: returnMessage
  };
};

export default FindMatch;
