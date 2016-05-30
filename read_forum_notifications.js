console.log("Updating notifications");
keys = Object.keys(document.getElementById("contentBody").contentDocument.getElementById("rawContent").contentDocument.defaultView.window.messages);

for (var i = 0, l = keys.length; i < l; i ++) {
  notificationId = keys[i];
  if (notificationId !== "discussionRoot") {
    var url = "https://siglo21.epic-sam.net/Content/Forum/Update.ashx?courseid=" + courseId +"&sectionid=" + sectionId + "&enrollmentid=" + enrollmentId + "&itemid=" + itemId + "&messageid=" + notificationId + "  &actiontype=updateviewed&_dc=14339";

    sGet(
        url,
        {},
        "Message ID: " + notificationId + " readed."
    );
  }
}
