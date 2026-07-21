import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      email,
      total,
      positive,
      neutral,
      negative,
      urgent,
      highPriority,
    } = body;

    await sendMail({
      to: email,
      subject: "Project LOOP Dashboard Report",
      html: `
        <h2>Project LOOP Dashboard Report</h2>

        <table border="1" cellpadding="8" cellspacing="0">
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>

          <tr>
            <td>Total Feedback</td>
            <td>${total}</td>
          </tr>

          <tr>
            <td>Positive</td>
            <td>${positive}</td>
          </tr>

          <tr>
            <td>Neutral</td>
            <td>${neutral}</td>
          </tr>

          <tr>
            <td>Negative</td>
            <td>${negative}</td>
          </tr>

          <tr>
            <td>High Priority</td>
            <td>${highPriority}</td>
          </tr>

          <tr>
            <td>Urgent</td>
            <td>${urgent}</td>
          </tr>
        </table>

        <br/>

        <p>
          Generated automatically by
          <strong>Project LOOP</strong>.
        </p>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}