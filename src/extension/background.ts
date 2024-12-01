chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (message.type === "youtubeOrNot") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const currentTab = tabs[0]
      function isYouTubeVideo(url: string): boolean {
        return url.includes("youtube.com") && url.includes("/watch")
      }

      const isYouTube = isYouTubeVideo(currentTab.url!)
      sendResponse(isYouTube) // Send the result back to the content script
    })

    // Return true to indicate that sendResponse will be used asynchronously
    return true
  }
})

// chrome.runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
//   if (request.type === "getSession") {
//     fetch("http://localhost:3000/api/mongoDBUserData", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Failed to retrieve session data");
//         }
//       })
//       .then((user) => {
//         // Check if the user has enough credit balance
//         if (user.creditBalance > 0) {
//           sendResponse({ status: "success", user });
//         } else {
//           sendResponse({ status: "error", message: "Insufficient credit balance" });
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         sendResponse({ status: "error", message: "Failed to retrieve user data" });
//       });
//     return true; // Indicate that sendResponse will be used asynchronously
//   }
// });

// chrome.runtime.onMessage.addListener((message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
//   if (message.createNewTab) {
//     chrome.tabs.update(sender.tab!.id!, { url: message.url });
//   }
// });

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.tabs.create({ url: "http://localhost:3000/installed" });
// });

// chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
//   chrome.tabs.create({ url: "http://localhost:3000/installed" });
// });

// chrome.runtime.onMessage.addListener((request: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
//   if (request.type === "getPlan") {
//     fetch("http://localhost:3000/api/plan_extension", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error("Failed to retrieve plan data");
//         }
//       })
//       .then((data) => {
//         sendResponse(data);
//       })
//       .catch((error) => {
//         console.error(error);
//         sendResponse({ error: "Failed to retrieve plan data" });
//       });
//     return true;
//   }
// });
