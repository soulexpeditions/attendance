'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, MapPin } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type AttendanceRecord = {
  date: Date
  location: string
}

export function AttendanceTrackerComponent() {
  const [date, setDate] = useState<Date>()
  const [location, setLocation] = useState<string>('')
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!date || !location) {
      alert("Please select both date and location.")
      return
    }
    
    const newRecord: AttendanceRecord = { date, location }
    setAttendanceRecords([...attendanceRecords, newRecord])
    alert(`Attendance marked for ${format(date, 'PPP')} at ${location}.`)
    setDate(undefined)
    setLocation('')
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Attendance Tracker</CardTitle>
        <CardDescription>Mark your attendance and work location</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="date" className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="location" className="text-sm font-medium">Location</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select work location" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="remote">Remote Location</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Mark Attendance</Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <h3 className="text-lg font-semibold mb-2">Recent Attendance Records</h3>
        <ul className="w-full space-y-2">
          {attendanceRecords.slice(-5).reverse().map((record, index) => (
            <li key={index} className="flex justify-between items-center p-2 bg-secondary rounded-md">
              <span>{format(record.date, 'PPP')}</span>
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {record.location}
              </span>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  )
}