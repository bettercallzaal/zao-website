import type { ApiEvent } from './types'

function parseIcsDate(icsDate: string): string {
  // Convert ICS datetime format (e.g., "20240701T183000Z") to ISO 8601
  const year = icsDate.substring(0, 4)
  const month = icsDate.substring(4, 6)
  const day = icsDate.substring(6, 8)
  const hour = icsDate.substring(9, 11)
  const minute = icsDate.substring(11, 13)
  const second = icsDate.substring(13, 15)

  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
}

function unescapeIcsText(text: string): string {
  return text
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
}

export function parseIcs(icsContent: string): ApiEvent[] {
  const events: ApiEvent[] = []
  const eventRegex =
    /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g

  let match
  while ((match = eventRegex.exec(icsContent)) !== null) {
    const eventContent = match[1]
    const rawEvent = parseVEvent(eventContent)

    if (rawEvent) {
      events.push(rawEvent)
    }
  }

  return events
}

function parseVEvent(eventContent: string): ApiEvent | null {
  const lines = eventContent.split(/\r?\n/)
  const props: Record<string, string> = {}

  // Parse properties, handling line folding
  let currentProp = ''
  let currentValue = ''

  for (const line of lines) {
    if (line.match(/^\s/) && currentProp) {
      // Continuation of previous line
      currentValue += line.trim()
    } else {
      if (currentProp) {
        props[currentProp] = currentValue
      }

      const colonIndex = line.indexOf(':')
      if (colonIndex > -1) {
        const prop = line.substring(0, colonIndex).split(';')[0]
        currentProp = prop
        currentValue = line.substring(colonIndex + 1)
      }
    }
  }

  // Don't forget the last property
  if (currentProp) {
    props[currentProp] = currentValue
  }

  const summary = unescapeIcsText(props.SUMMARY || '')
  const dtstart = props.DTSTART || ''
  const dtend = props.DTEND || ''
  // DESCRIPTION is still ICS-escaped here, so a newline is the two characters "\n". Stop the
  // link at a backslash as well as at whitespace, or Luma's "...\n\nAddress:..." tail rides along.
  const url = props.URL || props.DESCRIPTION?.match(/https?:\/\/[^\s\\]+/)?.[0] || ''
  const location = unescapeIcsText(props.LOCATION || '') || null

  if (!summary || !dtstart || !dtend) {
    return null
  }

  return {
    title: summary,
    start: parseIcsDate(dtstart),
    end: parseIcsDate(dtend),
    url,
    location: location && location.length > 0 ? location : null,
  }
}

export function splitEventsByTime(
  events: ApiEvent[],
  now: Date = new Date()
): { upcoming: ApiEvent[]; recent: ApiEvent[] } {
  const upcoming: ApiEvent[] = []
  const recent: ApiEvent[] = []

  for (const event of events) {
    const eventStart = new Date(event.start)
    if (eventStart >= now) {
      upcoming.push(event)
    } else {
      recent.push(event)
    }
  }

  // Sort upcoming by start time ascending, recent by start time descending
  upcoming.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  )
  recent.sort(
    (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
  )

  return { upcoming, recent }
}
