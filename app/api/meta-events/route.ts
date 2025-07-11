import { NextResponse } from 'next/server';

const META_ACCESS_TOKEN =
  'EAAJ92ZCmLbAsBPEdZBTypbUnGk1lEAVPixPYW4GYe99qLFyrgcy8q4jIHZAFvaI4M1KEeK4ZAT0F3zuxMnEkMo1GZBOydoVJ9yw090xydvmon9yZCnlKDyvxaKUEtpgSInIGoqrZCBtdWKCBoLWBZAAS7p0O6BAcpIZCaP6GLsDtX8TrXIHoZC5Hgu0tvsZBPiz49LZA2gZDZD';
const PIXEL_ID = '1769045330671882';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventName, eventId, eventSourceUrl, userData } = body;

    // Prepara os dados do usuário
    const user_data = {
      client_ip_address:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip'),
      client_user_agent: request.headers.get('user-agent'),
      ...userData?.user_data,
    };

    // Remove user_data do objeto de dados para não duplicar
    const eventData = { ...userData };
    delete eventData.user_data;

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${META_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          data: [
            {
              event_name: eventName,
              event_time: Math.floor(Date.now() / 1000),
              event_id: eventId,
              event_source_url: eventSourceUrl,
              action_source: 'website',
              user_data,
              custom_data: eventData,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Meta API Error:', error);
      return NextResponse.json(
        { error: 'Failed to send event to Meta' },
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log('Meta API Success:', result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error processing Meta event:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
