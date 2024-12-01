// File: src/app/api/openAI/route.ts

import { NextRequest, NextResponse } from "next/server"

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

async function summarizeChunk(transcriptChunk: string): Promise<string> {
  const prompt = `In detail, summarize this YouTube video transcript: ${transcriptChunk}`

  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo-1106",
      messages: [{ role: "user", content: prompt }],
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_SECRET_API_KEY}`,
    },
  })

  if (openaiResponse.ok) {
    const openaiData = await openaiResponse.json()
    if (openaiData.choices && openaiData.choices.length > 0 && openaiData.choices[0].message && openaiData.choices[0].message.content) {
      return openaiData.choices[0].message.content
    } else {
      throw new Error("OpenAI response did not contain valid data.")
    }
  } else {
    const errorData = await openaiResponse.json()
    console.error("Error from OpenAI API:", errorData)
    throw new Error("Error fetching data from OpenAI API.")
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { transcript, question } = await request.json()

    // Add logging to debug the transcript type
    console.log("Type of transcript:", typeof transcript)
    console.log("Transcript data:", transcript)

    if (typeof transcript !== "string") {
      throw new Error("Transcript is not a string.")
    }

    const maxTokens = 16000
    const chunks: string[] = []
    let currentChunk = ""

    transcript.split(" ").forEach((word: string) => {
      if ((currentChunk + " " + word).length > maxTokens) {
        chunks.push(currentChunk)
        currentChunk = word
      } else {
        currentChunk += " " + word
      }
    })
    if (currentChunk) {
      chunks.push(currentChunk)
    }

    const summaries = []
    for (const chunk of chunks) {
      const summary = await summarizeChunk(chunk)
      summaries.push(summary)
    }

    if (question) {
      const prompt = `Answer this question based on the following summaries of a YouTube video transcript: ${summaries.join(" ")}\nQuestion: ${question}`
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo-1106",
          messages: [{ role: "user", content: prompt }],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_SECRET_API_KEY}`,
        },
      })

      if (openaiResponse.ok) {
        const openaiData = await openaiResponse.json()
        if (openaiData.choices && openaiData.choices.length > 0 && openaiData.choices[0].message && openaiData.choices[0].message.content) {
          return NextResponse.json({ answer: openaiData.choices[0].message.content }, { headers: corsHeaders })
        } else {
          return NextResponse.json({ error: "OpenAI response did not contain valid data." }, { status: 500, headers: corsHeaders })
        }
      } else {
        const errorData = await openaiResponse.json()
        console.error("Error from OpenAI API:", errorData)
        return NextResponse.json({ error: "Error fetching data from OpenAI API." }, { status: 500, headers: corsHeaders })
      }
    } else {
      return NextResponse.json({ summaries }, { headers: corsHeaders })
    }
  } catch (error) {
    console.error("Error in API handler:", error)
    return NextResponse.json({ error: "An error occurred." }, { status: 500, headers: corsHeaders })
  }
}
