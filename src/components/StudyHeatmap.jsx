import React from 'react'
import useStore from '../store'

function StudyHeatmap() {
    const studyHistory = useStore((state) => state.studyHistory)

    // Generate last 20 weeks of dates (140 days)
    const generateCalendarData = () => {
        const data = []
        const today = new Date()

        for (let i = 139; i >= 0; i--) {
            const date = new Date(today)
            date.setDate(date.getDate() - i)
            const dateStr = date.toISOString().split('T')[0]
            const count = studyHistory[dateStr] || 0
            data.push({ date: dateStr, count, dayOfWeek: date.getDay() })
        }

        return data
    }

    const calendarData = generateCalendarData()

    const getIntensity = (count) => {
        if (count === 0) return 'bg-slate-800'
        if (count <= 2) return 'bg-primary-900'
        if (count <= 5) return 'bg-primary-700'
        if (count <= 10) return 'bg-primary-500'
        return 'bg-primary-400'
    }

    // Group by weeks (columns)
    const weeks = []
    for (let i = 0; i < calendarData.length; i += 7) {
        weeks.push(calendarData.slice(i, i + 7))
    }

    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
        <div className="overflow-x-auto">
            <div className="flex gap-1">
                {/* Day labels */}
                <div className="flex flex-col gap-1 mr-2 text-xs text-slate-500">
                    {dayLabels.map((day, i) => (
                        <div key={i} className="h-3 flex items-center">
                            {i % 2 === 1 ? day : ''}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                            <div
                                key={day.date}
                                className={`heatmap-cell ${getIntensity(day.count)}`}
                                title={`${day.date}: ${day.count} cards studied`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
                <span>Less</span>
                <div className="heatmap-cell bg-slate-800" />
                <div className="heatmap-cell bg-primary-900" />
                <div className="heatmap-cell bg-primary-700" />
                <div className="heatmap-cell bg-primary-500" />
                <div className="heatmap-cell bg-primary-400" />
                <span>More</span>
            </div>
        </div>
    )
}

export default StudyHeatmap
