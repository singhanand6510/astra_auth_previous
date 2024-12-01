// src/extension/content.ts

chrome.runtime.sendMessage({ type: "youtubeOrNot" }, function (response) {
  if (response) {
    setTimeout(function () {
      const showTranscriptButton = document.querySelector('button[aria-label="Show transcript"]') as HTMLButtonElement
      if (showTranscriptButton) {
        showTranscriptButton.click()
        const contentWrapper = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]') as HTMLElement
        if (contentWrapper) {
          let transcript: string[] = []
          contentWrapper.style.opacity = "0"
          const contentWrap = contentWrapper.querySelector("#content") as HTMLElement
          const mainDiv = document.createElement("div")
          const MainParagraph = document.createElement("div")
          MainParagraph.style.paddingTop = "20px"
          const toggleTabs = document.createElement("div")
          mainDiv.style.display = "flex"
          mainDiv.style.flexDirection = "column"
          toggleTabs.style.display = "flex"
          toggleTabs.style.flexDirection = "row"
          toggleTabs.style.width = "100%"
          toggleTabs.style.marginBottom = "10px"
          mainDiv.appendChild(toggleTabs)
          mainDiv.appendChild(MainParagraph)
          const SummaryTab = document.createElement("button")
          SummaryTab.innerHTML = "summary"
          SummaryTab.style.cssText = `
            padding-top: 5px;
            padding-bottom: 5px;
            padding-right: 10px;
            padding-left: 10px;
            border: 1px solid #00000010;
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 17px;
            color: #000000;
            border-radius: 20px;
            opacity: 1;
            cursor: pointer;
          `
          toggleTabs.appendChild(SummaryTab)
          const ChatTab = document.createElement("button")
          ChatTab.innerHTML = "Chat"
          ChatTab.style.cssText = `
            padding-top: 5px;
            padding-bottom: 5px;
            padding-right: 10px;
            padding-left: 10px;
            border: 1px solid #00000010;
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 17px;
            color: #000000;
            border-radius: 20px;
            opacity: 0.8;
            margin-left: 10px;
            cursor: pointer;
          `
          toggleTabs.appendChild(ChatTab)
          setTimeout(() => {
            contentWrapper.style.display = "none"
            contentWrapper.insertAdjacentElement("afterend", mainDiv)
            mainDiv.style.cssText = `
              padding: 20px;
              border: 1px solid #ffffff10;
              background-color: #1d1d1d;
              font-family: Arial, sans-serif;
              font-size: 17px;
              color: #ffffff;
              border-radius: 20px;
              overflow-y: auto;
              max-height: 500px;
            `
            mainDiv.classList.add("mainDiv")

            const transcriptElement1 = contentWrap.querySelector("ytd-transcript-renderer") as HTMLElement
            const transcriptElement2 = transcriptElement1.querySelector("#segments-container") as HTMLElement
            const transcriptElement3 = transcriptElement2.querySelectorAll("yt-formatted-string")
            if (transcriptElement3) {
              transcriptElement3.forEach((string) => transcript.push(string.innerHTML))

              const input = document.createElement("input")
              input.setAttribute("type", "text")
              input.setAttribute("placeholder", "Ask a Question")
              input.style.borderRadius = "20px"
              input.style.width = "80%"
              input.style.border = "1px solid #ffffff10"
              input.style.backgroundColor = "#1d1d1d"
              input.style.color = "#ffffff"
              input.style.padding = "10px"
              input.style.outline = "none"
              input.style.fontSize = "15px"
              input.style.display = "none"

              const submitButton = document.createElement("button")
              submitButton.textContent = "Ask"
              submitButton.style.cssText = `
                padding-top: 5px;
                padding-bottom: 5px;
                padding-right: 10px;
                padding-left: 10px;
                margin-left: 5px;
                border: 1px solid #00000010;
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 17px;
                color: #000000;
                border-radius: 20px;
                cursor: pointer;
                display: none;
              `

              const wrapper = document.createElement("div")
              mainDiv.appendChild(wrapper)
              wrapper.style.display = "flex"
              wrapper.style.flexDirection = "row"
              wrapper.style.width = "100%"
              wrapper.style.padding = "5px"
              wrapper.style.justifyContent = "center"
              wrapper.style.alignItems = "center"
              wrapper.appendChild(input)
              wrapper.appendChild(submitButton)
              mainDiv.style.overflowX = "hidden"
              const answerParagraph = document.createElement("p")
              answerParagraph.style.display = "none"
              mainDiv.appendChild(answerParagraph)

              fetch("http://localhost:3000/api/openAI", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ transcript: transcript.join(" ") }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data)
                  const transcriptLines: string[] = data.summaries.join("\n").split("\n")
                  transcriptLines.forEach((line: string) => {
                    const paragraph = document.createElement("p")
                    paragraph.textContent = line
                    MainParagraph.appendChild(paragraph)
                    const lineBreak = document.createElement("br")
                    MainParagraph.appendChild(lineBreak)
                  })
                  contentWrapper.remove()
                })
                .catch((error) => {
                  console.error("Error:", error)
                })

              SummaryTab.addEventListener("click", async () => {
                SummaryTab.style.opacity = "1"
                ChatTab.style.opacity = "0.7"
                input.style.display = "none"
                submitButton.style.display = "none"
                answerParagraph.style.display = "none"
                MainParagraph.style.display = "block"
              })

              ChatTab.addEventListener("click", async () => {
                ChatTab.style.opacity = "1"
                SummaryTab.style.opacity = "0.7"
                input.style.display = "block"
                submitButton.style.display = "block"
                answerParagraph.style.display = "block"
                MainParagraph.style.display = "none"
              })

              submitButton.addEventListener("click", async () => {
                const question = input.value
                if (question.trim() === "") return
                const askQuestion = `${question}, using this knowledge from this video ${transcript.join(" ")}.`

                const openaiAnswer = await fetch("http://localhost:3000/api/openAI", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ question: askQuestion }),
                })

                if (openaiAnswer.ok) {
                  const openaiAnswerData = await openaiAnswer.json()
                  answerParagraph.style.marginTop = "10px"
                  answerParagraph.style.marginBottom = "10px"
                  answerParagraph.style.padding = "5px"

                  if (openaiAnswerData.answer) {
                    answerParagraph.textContent = openaiAnswerData.answer
                    input.value = ""
                    input.placeholder = question
                  } else {
                    console.error("OpenAI response did not contain a valid answer.")
                  }
                } else {
                  console.error("Error fetching data from OpenAI")
                }
              })
            }
          }, 3000)
        }
      }
    }, 3000)
  } else {
    console.log("This is not a YouTube video page")
  }
})

//todo:latest

// chrome.runtime.sendMessage({ type: "youtubeOrNot" }, function (response) {
//   if (response) {
//     setTimeout(function () {
//       const showTranscriptButton = document.querySelector('button[aria-label="Show transcript"]') as HTMLButtonElement
//       if (showTranscriptButton) {
//         showTranscriptButton.click()
//         const contentWrapper = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]') as HTMLElement
//         if (contentWrapper) {
//           let transcript: string[] = []
//           contentWrapper.style.opacity = "0"
//           const contentWrap = contentWrapper.querySelector("#content") as HTMLElement

//           const mainDiv = document.createElement("div")
//           const MainParagraph = document.createElement("div")
//           const toggleTabs = document.createElement("div")

//           mainDiv.style.display = "flex"
//           mainDiv.style.flexDirection = "column"
//           toggleTabs.style.display = "flex"
//           toggleTabs.style.flexDirection = "row"
//           toggleTabs.style.width = "100%"
//           toggleTabs.style.marginBottom = "10px"

//           mainDiv.appendChild(toggleTabs)
//           mainDiv.appendChild(MainParagraph)

//           const SummaryTab = document.createElement("button")
//           SummaryTab.innerHTML = "Summary"
//           SummaryTab.style.cssText = `
//             padding: 5px 10px;
//             border: 1px solid #00000010;
//             background-color: #ffffff;
//             font-family: Arial, sans-serif;
//             font-size: 17px;
//             color: #000000;
//             border-radius: 20px;
//             opacity: 1;
//             cursor: pointer;
//           `
//           toggleTabs.appendChild(SummaryTab)

//           const ChatTab = document.createElement("button")
//           ChatTab.innerHTML = "Chat"
//           ChatTab.style.cssText = `
//             padding: 5px 10px;
//             border: 1px solid #00000010;
//             background-color: #ffffff;
//             font-family: Arial, sans-serif;
//             font-size: 17px;
//             color: #000000;
//             border-radius: 20px;
//             opacity: 0.8;
//             margin-left: 10px;
//             cursor: pointer;
//           `
//           toggleTabs.appendChild(ChatTab)

//           setTimeout(() => {
//             contentWrapper.style.display = "none"
//             contentWrapper.insertAdjacentElement("afterend", mainDiv)
//             mainDiv.style.cssText = `
//               padding: 20px;
//               border: 1px solid #ffffff10;
//               background-color: #1d1d1d;
//               font-family: Arial, sans-serif;
//               font-size: 17px;
//               color: #ffffff;
//               border-radius: 20px;
//               overflow-y: auto;
//               max-height: 500px;
//             `
//             mainDiv.classList.add("mainDiv")

//             const transcriptElement1 = contentWrap.querySelector("ytd-transcript-renderer") as HTMLElement
//             const transcriptElement2 = transcriptElement1.querySelector("#segments-container") as HTMLElement
//             const transcriptElement3 = transcriptElement2.querySelectorAll("yt-formatted-string")

//             if (transcriptElement3) {
//               transcriptElement3.forEach((string) => transcript.push(string.innerHTML))

//               const input = document.createElement("input")
//               input.setAttribute("type", "text")
//               input.setAttribute("placeholder", "Ask a Question")
//               input.style.borderRadius = "20px"
//               input.style.width = "80%"
//               input.style.border = "1px solid #ffffff10"
//               input.style.backgroundColor = "#1d1d1d"
//               input.style.color = "#ffffff"
//               input.style.padding = "10px"
//               input.style.outline = "none"
//               input.style.fontSize = "15px"
//               input.style.display = "none"
//               input.style.cssText = `
//                 border-radius: 20px;
//                 width: 80%;
//                 border: 1px solid #ffffff10;
//                 background-color: #1d1d1d;
//                 color: #ffffff;
//                 padding: 10px;
//                 outline: none;
//                 font-size: 15px;
//                 display: none;
//               `

//               const submitButton = document.createElement("button")
//               submitButton.textContent = "Ask"
//               submitButton.style.cssText = `
//                 padding: 5px 10px;
//                 margin-left: 5px;
//                 border: 1px solid #00000010;
//                 background-color: #ffffff;
//                 font-family: Arial, sans-serif;
//                 font-size: 17px;
//                 color: #000000;
//                 border-radius: 20px;
//                 cursor: pointer;
//                 display: none;
//               `

//               const wrapper = document.createElement("div")
//               mainDiv.appendChild(wrapper)
//               wrapper.style.display = "flex"
//               wrapper.style.flexDirection = "row"
//               wrapper.style.width = "100%"
//               wrapper.style.padding = "5px"
//               wrapper.style.justifyContent = "center"
//               wrapper.style.alignItems = "center"
//               wrapper.appendChild(input)
//               wrapper.appendChild(submitButton)
//               mainDiv.style.overflowX = "hidden"
//               const answerParagraph = document.createElement("p")
//               answerParagraph.style.display = "none"
//               mainDiv.appendChild(answerParagraph)
//               wrapper.style.cssText = `
//                 display: flex;
//                 flex-direction: row;
//                 width: 100%;
//                 padding: 5px;
//                 justify-content: center;
//                 align-items: center;
//               `

//               fetch("http://localhost:3000/api/openAI", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ transcript }),
//               })
//                 .then((response) => response.json())
//                 .then((data) => {
//                   const transcriptLines: string[] = data.summaryText.split("\n")
//                   transcriptLines.forEach((line: string) => {
//                     const paragraph = document.createElement("p")
//                     paragraph.textContent = line
//                     MainParagraph.appendChild(paragraph)
//                     const lineBreak = document.createElement("br")
//                     MainParagraph.appendChild(lineBreak)
//                   })
//                   contentWrapper.remove()
//                 })
//                 .catch((error) => console.error("Error:", error))

//               SummaryTab.addEventListener("click", () => {
//                 SummaryTab.style.opacity = "1"
//                 ChatTab.style.opacity = "0.7"
//                 input.style.display = "none"
//                 submitButton.style.display = "none"
//                 answerParagraph.style.display = "none"
//                 MainParagraph.style.display = "block"
//               })

//               ChatTab.addEventListener("click", () => {
//                 ChatTab.style.opacity = "1"
//                 SummaryTab.style.opacity = "0.7"
//                 input.style.display = "block"
//                 submitButton.style.display = "block"
//                 answerParagraph.style.display = "block"
//                 MainParagraph.style.display = "none"
//               })

//               submitButton.addEventListener("click", async () => {
//                 const question = input.value
//                 if (question.trim() === "") return
//                 const askQuestion = `${question}, using this knowledge from this video ${transcript}.`

//                 const openaiAnswer = await fetch("http://localhost:3000/api/openAI", {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({ question: askQuestion }),
//                 })

//                 if (openaiAnswer.ok) {
//                   const openaiAnswerData = await openaiAnswer.json()
//                   answerParagraph.style.marginTop = "10px"
//                   answerParagraph.style.marginBottom = "10px"
//                   answerParagraph.style.padding = "5px"

//                   if (openaiAnswerData.answer) {
//                     answerParagraph.textContent = openaiAnswerData.answer
//                     input.value = ""
//                     input.placeholder = question
//                   } else {
//                     console.error("OpenAI response did not contain a valid answer.")
//                   }
//                 } else {
//                   console.error("Error fetching data from OpenAI")
//                 }
//               })
//             }
//           }, 3000)
//         }
//       }
//     }, 3000)
//   } else {
//     console.log("This is not a YouTube video page")
//   }
// })

// //todo: before chunk

// // src/extension/content.ts

// chrome.runtime.sendMessage({ type: "youtubeOrNot" }, function (response) {
//   if (response) {
//     setTimeout(function () {
//       const showTranscriptButton = document.querySelector('button[aria-label="Show transcript"]') as HTMLButtonElement
//       if (showTranscriptButton) {
//         showTranscriptButton.click()
//         const contentWrapper = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]') as HTMLElement
//         if (contentWrapper) {
//           let transcript: string[] = []
//           contentWrapper.style.opacity = "0"
//           const contentWrap = contentWrapper.querySelector("#content") as HTMLElement

//           const mainDiv = document.createElement("div")
//           const MainParagraph = document.createElement("div")
//           const toggleTabs = document.createElement("div")

//           mainDiv.style.display = "flex"
//           mainDiv.style.flexDirection = "column"
//           toggleTabs.style.display = "flex"
//           toggleTabs.style.flexDirection = "row"
//           toggleTabs.style.width = "100%"
//           toggleTabs.style.marginBottom = "10px"

//           mainDiv.appendChild(toggleTabs)
//           mainDiv.appendChild(MainParagraph)

//           const SummaryTab = document.createElement("button")
//           SummaryTab.innerHTML = "Summary"
//           SummaryTab.style.cssText = `
//             padding: 5px 10px;
//             border: 1px solid #00000010;
//             background-color: #ffffff;
//             font-family: Arial, sans-serif;
//             font-size: 17px;
//             color: #000000;
//             border-radius: 20px;
//             opacity: 1;
//             cursor: pointer;
//           `
//           toggleTabs.appendChild(SummaryTab)

//           const ChatTab = document.createElement("button")
//           ChatTab.innerHTML = "Chat"
//           ChatTab.style.cssText = `
//             padding: 5px 10px;
//             border: 1px solid #00000010;
//             background-color: #ffffff;
//             font-family: Arial, sans-serif;
//             font-size: 17px;
//             color: #000000;
//             border-radius: 20px;
//             opacity: 0.8;
//             margin-left: 10px;
//             cursor: pointer;
//           `
//           toggleTabs.appendChild(ChatTab)

//           setTimeout(() => {
//             contentWrapper.style.display = "none"
//             contentWrapper.insertAdjacentElement("afterend", mainDiv)
//             mainDiv.style.cssText = `
//               padding: 20px;
//               border: 1px solid #ffffff10;
//               background-color: #1d1d1d;
//               font-family: Arial, sans-serif;
//               font-size: 17px;
//               color: #ffffff;
//               border-radius: 20px;
//               overflow-y: auto;
//               max-height: 500px;
//             `
//             mainDiv.classList.add("mainDiv")

//             const transcriptElement1 = contentWrap.querySelector("ytd-transcript-renderer") as HTMLElement
//             const transcriptElement2 = transcriptElement1.querySelector("#segments-container") as HTMLElement
//             const transcriptElement3 = transcriptElement2.querySelectorAll("yt-formatted-string")

//             if (transcriptElement3) {
//               transcriptElement3.forEach((string) => transcript.push(string.innerHTML))

//               const input = document.createElement("input")
//               input.setAttribute("type", "text")
//               input.setAttribute("placeholder", "Ask a Question")
//               input.style.cssText = `
//                 border-radius: 20px;
//                 width: 80%;
//                 border: 1px solid #ffffff10;
//                 background-color: #1d1d1d;
//                 color: #ffffff;
//                 padding: 10px;
//                 outline: none;
//                 font-size: 15px;
//                 display: none;
//               `

//               const submitButton = document.createElement("button")
//               submitButton.textContent = "Ask"
//               submitButton.style.cssText = `
//                 padding: 5px 10px;
//                 margin-left: 5px;
//                 border: 1px solid #00000010;
//                 background-color: #ffffff;
//                 font-family: Arial, sans-serif;
//                 font-size: 17px;
//                 color: #000000;
//                 border-radius: 20px;
//                 cursor: pointer;
//                 display: none;
//               `

//               const wrapper = document.createElement("div")
//               wrapper.style.cssText = `
//                 display: flex;
//                 flex-direction: row;
//                 width: 100%;
//                 padding: 5px;
//                 justify-content: center;
//                 align-items: center;
//               `
//               wrapper.appendChild(input)
//               wrapper.appendChild(submitButton)

//               mainDiv.appendChild(wrapper)
//               mainDiv.style.overflowX = "hidden"

//               const answerParagraph = document.createElement("p")
//               answerParagraph.style.display = "none"
//               mainDiv.appendChild(answerParagraph)

//               fetch("http://localhost:3000/api/openAI", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ transcript }),
//               })
//                 .then((response) => response.json())
//                 .then((data) => {
//                   const transcriptLines: string[] = data.summaryText.split("\n")
//                   transcriptLines.forEach((line: string) => {
//                     const paragraph = document.createElement("p")
//                     paragraph.textContent = line
//                     MainParagraph.appendChild(paragraph)
//                     const lineBreak = document.createElement("br")
//                     MainParagraph.appendChild(lineBreak)
//                   })
//                   contentWrapper.remove()
//                 })
//                 .catch((error) => console.error("Error:", error))

//               SummaryTab.addEventListener("click", () => {
//                 SummaryTab.style.opacity = "1"
//                 ChatTab.style.opacity = "0.7"
//                 input.style.display = "none"
//                 submitButton.style.display = "none"
//                 answerParagraph.style.display = "none"
//                 MainParagraph.style.display = "block"
//               })

//               ChatTab.addEventListener("click", () => {
//                 ChatTab.style.opacity = "1"
//                 SummaryTab.style.opacity = "0.7"
//                 input.style.display = "block"
//                 submitButton.style.display = "block"
//                 answerParagraph.style.display = "block"
//                 MainParagraph.style.display = "none"
//               })

//               submitButton.addEventListener("click", async () => {
//                 const question = input.value
//                 if (question.trim() === "") return
//                 const askQuestion = `${question}, using this knowledge from this video ${transcript}.`

//                 const openaiAnswer = await fetch("http://localhost:3000/api/openAI", {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                   },
//                   body: JSON.stringify({ question: askQuestion }),
//                 })

//                 if (openaiAnswer.ok) {
//                   const openaiAnswerData = await openaiAnswer.json()
//                   answerParagraph.style.marginTop = "10px"
//                   answerParagraph.style.marginBottom = "10px"
//                   answerParagraph.style.padding = "5px"

//                   if (openaiAnswerData.answer) {
//                     answerParagraph.textContent = openaiAnswerData.answer
//                     input.value = ""
//                     input.placeholder = question
//                   } else {
//                     console.error("OpenAI response did not contain a valid answer.")
//                   }
//                 } else {
//                   console.error("Error fetching data from OpenAI")
//                 }
//               })
//             }
//           }, 3000)
//         }
//       }
//     }, 3000)
//   } else {
//     console.log("This is not a YouTube video page")
//   }
// })

// src/extension/content.ts

// chrome.runtime.sendMessage({ type: "youtubeOrNot" }, function (response) {
//   if (response) {
//     setTimeout(function () {
//       const showTranscriptButton = document.querySelector('button[aria-label="Show transcript"]') as HTMLButtonElement
//       if (showTranscriptButton) {
//         showTranscriptButton.click()
//         const contentWrapper = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]') as HTMLElement
//         if (contentWrapper) {
//           let transcript: string[] = []
//           contentWrapper.style.opacity = "0"
//           const contentWrap = contentWrapper.querySelector("#content") as HTMLElement
//           const mainDiv = document.createElement("div")
//           const MainParagraph = document.createElement("div")
//           MainParagraph.style.paddingTop = "20px"
//           const toggleTabs = document.createElement("div")
//           mainDiv.style.display = "flex"
//           mainDiv.style.flexDirection = "column"
//           toggleTabs.style.display = "flex"
//           toggleTabs.style.flexDirection = "row"
//           toggleTabs.style.width = "100%"
//           toggleTabs.style.marginBottom = "10px"
//           mainDiv.appendChild(toggleTabs)
//           mainDiv.appendChild(MainParagraph)
//           const SummaryTab = document.createElement("button")
//           SummaryTab.innerHTML = "summary"
//           SummaryTab.style.cssText = `
//             padding-top: 5px;
//             padding-bottom: 5px;
//             padding-right: 10px;
//             padding-left: 10px;
//             border: 1px solid #00000010;
//             background-color: #ffffff;
//             font-family: Arial, sans-serif;
//             font-size: 17px;
//             color: #000000;
//             border-radius: 20px;
//             opacity: 1;
//             cursor: pointer;
//           `
//           toggleTabs.appendChild(SummaryTab)
//           const ChatTab = document.createElement("button")
//           ChatTab.innerHTML = "Chat"
//           ChatTab.style.cssText = `
//             padding-top: 5px;
//             padding-bottom: 5px;
//             padding-right: 10px;
//             padding-left: 10px;
//             border: 1px solid #00000010;
//             background-color: #ffffff;
//             font-family: Arial, sans-serif;
//             font-size: 17px;
//             color: #000000;
//             border-radius: 20px;
//             opacity: 0.8;
//             margin-left: 10px;
//             cursor: pointer;
//           `
//           toggleTabs.appendChild(ChatTab)
//           setTimeout(() => {
//             contentWrapper.style.display = "none"
//             contentWrapper.insertAdjacentElement("afterend", mainDiv)
//             mainDiv.style.cssText = `
//               padding: 20px;
//               border: 1px solid #ffffff10;
//               background-color: #1d1d1d;
//               font-family: Arial, sans-serif;
//               font-size: 17px;
//               color: #ffffff;
//               border-radius: 20px;
//               overflow-y: auto;
//               max-height: 500px;
//             `
//             mainDiv.classList.add("mainDiv")

//             const transcriptElement1 = contentWrap.querySelector("ytd-transcript-renderer") as HTMLElement
//             const transcriptElement2 = transcriptElement1.querySelector("#segments-container") as HTMLElement
//             const transcriptElement3 = transcriptElement2.querySelectorAll("yt-formatted-string")
//             if (transcriptElement3) {
//               transcriptElement3.forEach((string) => transcript.push(string.innerHTML))

//               const input = document.createElement("input")
//               input.setAttribute("type", "text")
//               input.setAttribute("placeholder", "Ask a Question")
//               input.style.borderRadius = "20px"
//               input.style.width = "80%"
//               input.style.border = "1px solid #ffffff10"
//               input.style.backgroundColor = "#1d1d1d"
//               input.style.color = "#ffffff"
//               input.style.padding = "10px"
//               input.style.outline = "none"
//               input.style.fontSize = "15px"
//               input.style.display = "none"
//               //             const subscribeButton = document.createElement("button");
//               //             subscribeButton.textContent = "subscribe";
//               //             subscribeButton.style.cssText = `
//               //   padding-top: 5px;
//               //   padding-bottom: 5px;
//               //   padding-right: 10px;
//               //   padding-left: 10px;
//               //   margin-left: 5px;
//               //   border: 1px solid #00000010;
//               //   background-color: #ffffff;
//               //   font-family: Arial, sans-serif;
//               //   font-size: 17px;
//               //   color: #000000;
//               //   border-radius: 20px;
//               //   cursor: pointer;
//               //   display:none;
//               // `

//               const submitButton = document.createElement("button")
//               submitButton.textContent = "Ask"
//               submitButton.style.cssText = `
//                 padding-top: 5px;
//                 padding-bottom: 5px;
//                 padding-right: 10px;
//                 padding-left: 10px;
//                 margin-left: 5px;
//                 border: 1px solid #00000010;
//                 background-color: #ffffff;
//                 font-family: Arial, sans-serif;
//                 font-size: 17px;
//                 color: #000000;
//                 border-radius: 20px;
//                 cursor: pointer;
//                 display:none;
//               `

//               const wrapper = document.createElement("div")
//               mainDiv.appendChild(wrapper)
//               wrapper.style.display = "flex"
//               wrapper.style.flexDirection = "row"
//               wrapper.style.width = "100%"
//               wrapper.style.padding = "5px"
//               wrapper.style.justifyContent = "center"
//               wrapper.style.alignItems = "center"
//               wrapper.appendChild(input)
//               wrapper.appendChild(submitButton)
//               mainDiv.style.overflowX = "hidden"
//               const answerParagraph = document.createElement("p")
//               answerParagraph.style.display = "none"
//               mainDiv.appendChild(answerParagraph)
//               //           const loginButton = document.createElement("button");
//               //           mainDiv.appendChild(loginButton);
//               //           loginButton.innerText = "Log In";
//               //           loginButton.style.cssText = ` padding-top: 5px;
//               // padding-bottom: 5px;
//               // padding-right: 10px;
//               // padding-left: 10px;
//               // margin-left: 5px;
//               // border: 1px solid #00000010;
//               // background-color: #ffffff;
//               // font-family: Arial, sans-serif;
//               // font-size: 17px;
//               // color: #000000;
//               // border-radius: 20px;
//               // cursor: pointer;
//               // display:none;`

//               fetch("http://localhost:3000/api/openAI", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ transcript }),
//               })
//                 .then((response) => response.json())
//                 .then((data) => {
//                   console.log(data)
//                   // Display the summary in the UI
//                   const transcriptLines: string[] = data.summaryText.split("\n")
//                   transcriptLines.forEach((line: string) => {
//                     const paragraph = document.createElement("p")
//                     paragraph.textContent = line
//                     MainParagraph.appendChild(paragraph)
//                     const lineBreak = document.createElement("br")
//                     MainParagraph.appendChild(lineBreak)
//                   })
//                   contentWrapper.remove()
//                 })
//                 .catch((error) => {
//                   console.error("Error:", error)
//                 })

//               SummaryTab.addEventListener("click", async () => {
//                 SummaryTab.style.opacity = "1"
//                 ChatTab.style.opacity = "0.7"
//                 input.style.display = "none"
//                 submitButton.style.display = "none"
//                 answerParagraph.style.display = "none"
//                 MainParagraph.style.display = "block"
//               })

//               ChatTab.addEventListener("click", async () => {
//                 ChatTab.style.opacity = "1"
//                 SummaryTab.style.opacity = "0.7"
//                 input.style.display = "block"
//                 submitButton.style.display = "block"
//                 answerParagraph.style.display = "block"
//                 MainParagraph.style.display = "none"
//               })
//               submitButton.addEventListener("click", async () => {
//                 const question = input.value;
//                 if (question.trim() == "") return;
//                 const askQuestion = `${question}, using this knowledge from this video ${transcript}.`;
//                 const openaiAnswer = await fetch(
//                   "https://api.openai.com/v1/chat/completions",
//                   {
//                     method: "POST",
//                     headers: {
//                       "Content-Type": "application/json",
//                       Authorization: `Bearer ${apiKey}`,
//                     },
//                     body: JSON.stringify({
//                       model: "gpt-3.5-turbo-1106",
//                       messages: [{ role: "user", content: askQuestion }],
//                     }),
//                   }
//                 );

//                 if (openaiAnswer.ok) {
//                   const openaiAnswerData = await openaiAnswer.json();

//                   // Display the response from OpenAI in the same mainDiv
//                   answerParagraph.style.marginTop = "10px";
//                   answerParagraph.style.marginBottom = "10px";
//                   answerParagraph.style.padding = "5px";
//                   if (
//                     openaiAnswerData.choices &&
//                     openaiAnswerData.choices.length > 0 &&
//                     openaiAnswerData.choices[0].message &&
//                     openaiAnswerData.choices[0].message.content
//                   ) {
//                     answerParagraph.textContent =
//                       openaiAnswerData.choices[0].message.content;
//                     input.value = "";
//                     input.placeholder = question;
//                   } else {
//                   }
//                 } else {
//                   console.error("Error fetching data from OpenAI");
//                 }
//               })
//             }
//           }, 3000)
//         }
//       }
//     }, 3000)
//   } else {
//     console.log("This is not a YouTube video page")
//   }
// })

// // src/extension/content.ts

// chrome.runtime.sendMessage({ type: "youtubeOrNot" }, function (response) {
//   if (response) {
//     setTimeout(function () {
//       const showTranscriptButton = document.querySelector('button[aria-label="Show transcript"]') as HTMLButtonElement
//       if (showTranscriptButton) {
//         showTranscriptButton.click()
//         const contentWrapper = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]') as HTMLElement
//         if (contentWrapper) {
//           let transcript: string[] = []
//           contentWrapper.style.opacity = "0"
//           const contentWrap = contentWrapper.querySelector("#content") as HTMLElement
//           const mainDiv = document.createElement("div")
//           const MainParagraph = document.createElement("div")
//           MainParagraph.style.paddingTop = "20px"
//           const toggleTabs = document.createElement("div")
//           mainDiv.style.display = "flex"
//           mainDiv.style.flexDirection = "column"
//           toggleTabs.style.display = "flex"
//           toggleTabs.style.flexDirection = "row"
//           toggleTabs.style.width = "100%"
//           toggleTabs.style.marginBottom = "10px"
//           mainDiv.appendChild(toggleTabs)
//           mainDiv.appendChild(MainParagraph)
//           const SummaryTab = document.createElement("button")
//           SummaryTab.innerHTML = "summary"
//           SummaryTab.style.cssText = `
//             padding-top: 5px;
//             padding-bottom: 5px;
//             padding-right: 10px;
//             padding-left: 10px;
//             border: 1px solid #00000010;
//             background-color: #ffffff;
//             font-family: Arial, sans-serif;
//             font-size: 17px;
//             color: #000000;
//             border-radius: 20px;
//             opacity: 1;
//             cursor: pointer;
//           `
//           toggleTabs.appendChild(SummaryTab)
//           const ChatTab = document.createElement("button")
//           ChatTab.innerHTML = "Chat"
//           ChatTab.style.cssText = `
//             padding-top: 5px;
//             padding-bottom: 5px;
//             padding-right: 10px;
//             padding-left: 10px;
//             border: 1px solid #00000010;
//             background-color: #ffffff;
//             font-family: Arial, sans-serif;
//             font-size: 17px;
//             color: #000000;
//             border-radius: 20px;
//             opacity: 0.8;
//             margin-left: 10px;
//             cursor: pointer;
//           `
//           toggleTabs.appendChild(ChatTab)
//           setTimeout(() => {
//             contentWrapper.style.display = "none"
//             contentWrapper.insertAdjacentElement("afterend", mainDiv)
//             mainDiv.style.cssText = `
//               padding: 20px;
//               border: 1px solid #ffffff10;
//               background-color: #1d1d1d;
//               font-family: Arial, sans-serif;
//               font-size: 17px;
//               color: #ffffff;
//               border-radius: 20px;
//               overflow-y: auto;
//               max-height: 500px;
//             `
//             mainDiv.classList.add("mainDiv")

//             const transcriptElement1 = contentWrap.querySelector("ytd-transcript-renderer") as HTMLElement
//             const transcriptElement2 = transcriptElement1.querySelector("#segments-container") as HTMLElement
//             const transcriptElement3 = transcriptElement2.querySelectorAll("yt-formatted-string")
//             if (transcriptElement3) {
//               transcriptElement3.forEach((string) => transcript.push(string.innerHTML))

//               const input = document.createElement("input")
//               input.setAttribute("type", "text")
//               input.setAttribute("placeholder", "Ask a Question")
//               input.style.borderRadius = "20px"
//               input.style.width = "80%"
//               input.style.border = "1px solid #ffffff10"
//               input.style.backgroundColor = "#1d1d1d"
//               input.style.color = "#ffffff"
//               input.style.padding = "10px"
//               input.style.outline = "none"
//               input.style.fontSize = "15px"
//               input.style.display = "none"
//               //             const subscribeButton = document.createElement("button");
//               //             subscribeButton.textContent = "subscribe";
//               //             subscribeButton.style.cssText = `
//               //   padding-top: 5px;
//               //   padding-bottom: 5px;
//               //   padding-right: 10px;
//               //   padding-left: 10px;
//               //   margin-left: 5px;
//               //   border: 1px solid #00000010;
//               //   background-color: #ffffff;
//               //   font-family: Arial, sans-serif;
//               //   font-size: 17px;
//               //   color: #000000;
//               //   border-radius: 20px;
//               //   cursor: pointer;
//               //   display:none;
//               // `

//               const submitButton = document.createElement("button")
//               submitButton.textContent = "Ask"
//               submitButton.style.cssText = `
//                 padding-top: 5px;
//                 padding-bottom: 5px;
//                 padding-right: 10px;
//                 padding-left: 10px;
//                 margin-left: 5px;
//                 border: 1px solid #00000010;
//                 background-color: #ffffff;
//                 font-family: Arial, sans-serif;
//                 font-size: 17px;
//                 color: #000000;
//                 border-radius: 20px;
//                 cursor: pointer;
//                 display:none;
//               `

//               const wrapper = document.createElement("div")
//               mainDiv.appendChild(wrapper)
//               wrapper.style.display = "flex"
//               wrapper.style.flexDirection = "row"
//               wrapper.style.width = "100%"
//               wrapper.style.padding = "5px"
//               wrapper.style.justifyContent = "center"
//               wrapper.style.alignItems = "center"
//               wrapper.appendChild(input)
//               wrapper.appendChild(submitButton)
//               mainDiv.style.overflowX = "hidden"
//               const answerParagraph = document.createElement("p")
//               answerParagraph.style.display = "none"
//               mainDiv.appendChild(answerParagraph)
//               //           const loginButton = document.createElement("button");
//               //           mainDiv.appendChild(loginButton);
//               //           loginButton.innerText = "Log In";
//               //           loginButton.style.cssText = ` padding-top: 5px;
//               // padding-bottom: 5px;
//               // padding-right: 10px;
//               // padding-left: 10px;
//               // margin-left: 5px;
//               // border: 1px solid #00000010;
//               // background-color: #ffffff;
//               // font-family: Arial, sans-serif;
//               // font-size: 17px;
//               // color: #000000;
//               // border-radius: 20px;
//               // cursor: pointer;
//               // display:none;`

//               fetch("http://localhost:3000/api/openAI", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ transcript }),
//               })
//                 .then((response) => response.json())
//                 .then((data) => {
//                   console.log(data)
//                   // Display the summary in the UI
//                   const transcriptLines: string[] = data.summaryText.split("\n")
//                   transcriptLines.forEach((line: string) => {
//                     const paragraph = document.createElement("p")
//                     paragraph.textContent = line
//                     MainParagraph.appendChild(paragraph)
//                     const lineBreak = document.createElement("br")
//                     MainParagraph.appendChild(lineBreak)
//                   })
//                   contentWrapper.remove()
//                 })
//                 .catch((error) => {
//                   console.error("Error:", error)
//                 })

//               SummaryTab.addEventListener("click", async () => {
//                 SummaryTab.style.opacity = "1"
//                 ChatTab.style.opacity = "0.7"
//                 input.style.display = "none"
//                 submitButton.style.display = "none"
//                 answerParagraph.style.display = "none"
//                 MainParagraph.style.display = "block"
//               })

//               ChatTab.addEventListener("click", async () => {
//                 ChatTab.style.opacity = "1"
//                 SummaryTab.style.opacity = "0.7"
//                 input.style.display = "block"
//                 submitButton.style.display = "block"
//                 answerParagraph.style.display = "block"
//                 MainParagraph.style.display = "none"
//               })
//             }
//           }, 3000)
//         }
//       }
//     }, 3000)
//   } else {
//     console.log("This is not a YouTube video page")
//   }
// })
