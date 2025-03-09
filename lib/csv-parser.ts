export type CSVReservation = {
  ID: string
  Item: string
  Boss: string
  Attendee: string
  Class: string
  Specialization: string
  Comment: string | null
  "Date (GMT)": string
}

export function parseCSV(text: string): CSVReservation[] {
  const lines = text.split("\n")
  if (lines.length <= 1) {
    throw new Error("CSV file is empty or has only headers")
  }

  const headers = lines[0].split(",").map((h) => h.trim())

  const results: CSVReservation[] = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue

    const values = lines[i].split(",").map((v) => v.trim())

    if (values.length !== headers.length) {
      console.warn(`Line ${i} has ${values.length} values, expected ${headers.length}`)
      continue
    }

    const reservation = {} as any

    headers.forEach((header, index) => {
      reservation[header] = values[index]
    })

    results.push(reservation as CSVReservation)
  }

  return results
}

