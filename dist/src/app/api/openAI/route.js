// File: src/app/api/openAI/route.ts
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
import { NextResponse } from "next/server";
export var corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export function OPTIONS() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, NextResponse.json({}, { headers: corsHeaders })];
        });
    });
}
function summarizeChunk(transcriptChunk) {
    return __awaiter(this, void 0, void 0, function () {
        var prompt, openaiResponse, openaiData, errorData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompt = "In detail, summarize this YouTube video transcript: ".concat(transcriptChunk);
                    return [4 /*yield*/, fetch("https://api.openai.com/v1/chat/completions", {
                            method: "POST",
                            body: JSON.stringify({
                                model: "gpt-3.5-turbo-1106",
                                messages: [{ role: "user", content: prompt }],
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(process.env.OPENAI_SECRET_API_KEY),
                            },
                        })];
                case 1:
                    openaiResponse = _a.sent();
                    if (!openaiResponse.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, openaiResponse.json()];
                case 2:
                    openaiData = _a.sent();
                    if (openaiData.choices && openaiData.choices.length > 0 && openaiData.choices[0].message && openaiData.choices[0].message.content) {
                        return [2 /*return*/, openaiData.choices[0].message.content];
                    }
                    else {
                        throw new Error("OpenAI response did not contain valid data.");
                    }
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, openaiResponse.json()];
                case 4:
                    errorData = _a.sent();
                    console.error("Error from OpenAI API:", errorData);
                    throw new Error("Error fetching data from OpenAI API.");
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, transcript, question, maxTokens_1, chunks_2, currentChunk_1, summaries, _i, chunks_1, chunk, summary, prompt_1, openaiResponse, openaiData, errorData, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 13, , 14]);
                    return [4 /*yield*/, request.json()
                        // Add logging to debug the transcript type
                    ];
                case 1:
                    _a = _b.sent(), transcript = _a.transcript, question = _a.question;
                    // Add logging to debug the transcript type
                    console.log("Type of transcript:", typeof transcript);
                    console.log("Transcript data:", transcript);
                    if (typeof transcript !== "string") {
                        throw new Error("Transcript is not a string.");
                    }
                    maxTokens_1 = 16000;
                    chunks_2 = [];
                    currentChunk_1 = "";
                    transcript.split(" ").forEach(function (word) {
                        if ((currentChunk_1 + " " + word).length > maxTokens_1) {
                            chunks_2.push(currentChunk_1);
                            currentChunk_1 = word;
                        }
                        else {
                            currentChunk_1 += " " + word;
                        }
                    });
                    if (currentChunk_1) {
                        chunks_2.push(currentChunk_1);
                    }
                    summaries = [];
                    _i = 0, chunks_1 = chunks_2;
                    _b.label = 2;
                case 2:
                    if (!(_i < chunks_1.length)) return [3 /*break*/, 5];
                    chunk = chunks_1[_i];
                    return [4 /*yield*/, summarizeChunk(chunk)];
                case 3:
                    summary = _b.sent();
                    summaries.push(summary);
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    if (!question) return [3 /*break*/, 11];
                    prompt_1 = "Answer this question based on the following summaries of a YouTube video transcript: ".concat(summaries.join(" "), "\nQuestion: ").concat(question);
                    return [4 /*yield*/, fetch("https://api.openai.com/v1/chat/completions", {
                            method: "POST",
                            body: JSON.stringify({
                                model: "gpt-3.5-turbo-1106",
                                messages: [{ role: "user", content: prompt_1 }],
                            }),
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(process.env.OPENAI_SECRET_API_KEY),
                            },
                        })];
                case 6:
                    openaiResponse = _b.sent();
                    if (!openaiResponse.ok) return [3 /*break*/, 8];
                    return [4 /*yield*/, openaiResponse.json()];
                case 7:
                    openaiData = _b.sent();
                    if (openaiData.choices && openaiData.choices.length > 0 && openaiData.choices[0].message && openaiData.choices[0].message.content) {
                        return [2 /*return*/, NextResponse.json({ answer: openaiData.choices[0].message.content }, { headers: corsHeaders })];
                    }
                    else {
                        return [2 /*return*/, NextResponse.json({ error: "OpenAI response did not contain valid data." }, { status: 500, headers: corsHeaders })];
                    }
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, openaiResponse.json()];
                case 9:
                    errorData = _b.sent();
                    console.error("Error from OpenAI API:", errorData);
                    return [2 /*return*/, NextResponse.json({ error: "Error fetching data from OpenAI API." }, { status: 500, headers: corsHeaders })];
                case 10: return [3 /*break*/, 12];
                case 11: return [2 /*return*/, NextResponse.json({ summaries: summaries }, { headers: corsHeaders })];
                case 12: return [3 /*break*/, 14];
                case 13:
                    error_1 = _b.sent();
                    console.error("Error in API handler:", error_1);
                    return [2 /*return*/, NextResponse.json({ error: "An error occurred." }, { status: 500, headers: corsHeaders })];
                case 14: return [2 /*return*/];
            }
        });
    });
}
