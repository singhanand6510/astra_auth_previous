"use strict";
// src/extension/content.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
chrome.runtime.sendMessage({ type: "youtubeOrNot" }, function (response) {
    if (response) {
        setTimeout(function () {
            var _this = this;
            var showTranscriptButton = document.querySelector('button[aria-label="Show transcript"]');
            if (showTranscriptButton) {
                showTranscriptButton.click();
                var contentWrapper_1 = document.querySelector('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]');
                if (contentWrapper_1) {
                    var transcript_1 = [];
                    contentWrapper_1.style.opacity = "0";
                    var contentWrap_1 = contentWrapper_1.querySelector("#content");
                    var mainDiv_1 = document.createElement("div");
                    var MainParagraph_1 = document.createElement("div");
                    MainParagraph_1.style.paddingTop = "20px";
                    var toggleTabs = document.createElement("div");
                    mainDiv_1.style.display = "flex";
                    mainDiv_1.style.flexDirection = "column";
                    toggleTabs.style.display = "flex";
                    toggleTabs.style.flexDirection = "row";
                    toggleTabs.style.width = "100%";
                    toggleTabs.style.marginBottom = "10px";
                    mainDiv_1.appendChild(toggleTabs);
                    mainDiv_1.appendChild(MainParagraph_1);
                    var SummaryTab_1 = document.createElement("button");
                    SummaryTab_1.innerHTML = "summary";
                    SummaryTab_1.style.cssText = "\n            padding-top: 5px;\n            padding-bottom: 5px;\n            padding-right: 10px;\n            padding-left: 10px;\n            border: 1px solid #00000010;\n            background-color: #ffffff;\n            font-family: Arial, sans-serif;\n            font-size: 17px;\n            color: #000000;\n            border-radius: 20px;\n            opacity: 1;\n            cursor: pointer;\n          ";
                    toggleTabs.appendChild(SummaryTab_1);
                    var ChatTab_1 = document.createElement("button");
                    ChatTab_1.innerHTML = "Chat";
                    ChatTab_1.style.cssText = "\n            padding-top: 5px;\n            padding-bottom: 5px;\n            padding-right: 10px;\n            padding-left: 10px;\n            border: 1px solid #00000010;\n            background-color: #ffffff;\n            font-family: Arial, sans-serif;\n            font-size: 17px;\n            color: #000000;\n            border-radius: 20px;\n            opacity: 0.8;\n            margin-left: 10px;\n            cursor: pointer;\n          ";
                    toggleTabs.appendChild(ChatTab_1);
                    setTimeout(function () {
                        contentWrapper_1.style.display = "none";
                        contentWrapper_1.insertAdjacentElement("afterend", mainDiv_1);
                        mainDiv_1.style.cssText = "\n              padding: 20px;\n              border: 1px solid #ffffff10;\n              background-color: #1d1d1d;\n              font-family: Arial, sans-serif;\n              font-size: 17px;\n              color: #ffffff;\n              border-radius: 20px;\n              overflow-y: auto;\n              max-height: 500px;\n            ";
                        mainDiv_1.classList.add("mainDiv");
                        var transcriptElement1 = contentWrap_1.querySelector("ytd-transcript-renderer");
                        var transcriptElement2 = transcriptElement1.querySelector("#segments-container");
                        var transcriptElement3 = transcriptElement2.querySelectorAll("yt-formatted-string");
                        if (transcriptElement3) {
                            transcriptElement3.forEach(function (string) { return transcript_1.push(string.innerHTML); });
                            var input_1 = document.createElement("input");
                            input_1.setAttribute("type", "text");
                            input_1.setAttribute("placeholder", "Ask a Question");
                            input_1.style.borderRadius = "20px";
                            input_1.style.width = "80%";
                            input_1.style.border = "1px solid #ffffff10";
                            input_1.style.backgroundColor = "#1d1d1d";
                            input_1.style.color = "#ffffff";
                            input_1.style.padding = "10px";
                            input_1.style.outline = "none";
                            input_1.style.fontSize = "15px";
                            input_1.style.display = "none";
                            var submitButton_1 = document.createElement("button");
                            submitButton_1.textContent = "Ask";
                            submitButton_1.style.cssText = "\n                padding-top: 5px;\n                padding-bottom: 5px;\n                padding-right: 10px;\n                padding-left: 10px;\n                margin-left: 5px;\n                border: 1px solid #00000010;\n                background-color: #ffffff;\n                font-family: Arial, sans-serif;\n                font-size: 17px;\n                color: #000000;\n                border-radius: 20px;\n                cursor: pointer;\n                display: none;\n              ";
                            var wrapper = document.createElement("div");
                            mainDiv_1.appendChild(wrapper);
                            wrapper.style.display = "flex";
                            wrapper.style.flexDirection = "row";
                            wrapper.style.width = "100%";
                            wrapper.style.padding = "5px";
                            wrapper.style.justifyContent = "center";
                            wrapper.style.alignItems = "center";
                            wrapper.appendChild(input_1);
                            wrapper.appendChild(submitButton_1);
                            mainDiv_1.style.overflowX = "hidden";
                            var answerParagraph_1 = document.createElement("p");
                            answerParagraph_1.style.display = "none";
                            mainDiv_1.appendChild(answerParagraph_1);
                            fetch("http://localhost:3000/api/openAI", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ transcript: transcript_1.join(" ") }),
                            })
                                .then(function (response) { return response.json(); })
                                .then(function (data) {
                                console.log(data);
                                var transcriptLines = data.summaries.join("\n").split("\n");
                                transcriptLines.forEach(function (line) {
                                    var paragraph = document.createElement("p");
                                    paragraph.textContent = line;
                                    MainParagraph_1.appendChild(paragraph);
                                    var lineBreak = document.createElement("br");
                                    MainParagraph_1.appendChild(lineBreak);
                                });
                                contentWrapper_1.remove();
                            })
                                .catch(function (error) {
                                console.error("Error:", error);
                            });
                            SummaryTab_1.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    SummaryTab_1.style.opacity = "1";
                                    ChatTab_1.style.opacity = "0.7";
                                    input_1.style.display = "none";
                                    submitButton_1.style.display = "none";
                                    answerParagraph_1.style.display = "none";
                                    MainParagraph_1.style.display = "block";
                                    return [2 /*return*/];
                                });
                            }); });
                            ChatTab_1.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    ChatTab_1.style.opacity = "1";
                                    SummaryTab_1.style.opacity = "0.7";
                                    input_1.style.display = "block";
                                    submitButton_1.style.display = "block";
                                    answerParagraph_1.style.display = "block";
                                    MainParagraph_1.style.display = "none";
                                    return [2 /*return*/];
                                });
                            }); });
                            submitButton_1.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                                var question, askQuestion, openaiAnswer, openaiAnswerData;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            question = input_1.value;
                                            if (question.trim() === "")
                                                return [2 /*return*/];
                                            askQuestion = "".concat(question, ", using this knowledge from this video ").concat(transcript_1.join(" "), ".");
                                            return [4 /*yield*/, fetch("http://localhost:3000/api/openAI", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                    },
                                                    body: JSON.stringify({ question: askQuestion }),
                                                })];
                                        case 1:
                                            openaiAnswer = _a.sent();
                                            if (!openaiAnswer.ok) return [3 /*break*/, 3];
                                            return [4 /*yield*/, openaiAnswer.json()];
                                        case 2:
                                            openaiAnswerData = _a.sent();
                                            answerParagraph_1.style.marginTop = "10px";
                                            answerParagraph_1.style.marginBottom = "10px";
                                            answerParagraph_1.style.padding = "5px";
                                            if (openaiAnswerData.answer) {
                                                answerParagraph_1.textContent = openaiAnswerData.answer;
                                                input_1.value = "";
                                                input_1.placeholder = question;
                                            }
                                            else {
                                                console.error("OpenAI response did not contain a valid answer.");
                                            }
                                            return [3 /*break*/, 4];
                                        case 3:
                                            console.error("Error fetching data from OpenAI");
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                    }, 3000);
                }
            }
        }, 3000);
    }
    else {
        console.log("This is not a YouTube video page");
    }
});
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
