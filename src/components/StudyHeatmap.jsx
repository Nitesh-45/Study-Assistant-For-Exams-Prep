import React from 'react'
import useStore from '../store'

function StudyHeatmap() {
    const studyHistory = useStore((state) => state.studyHistory)

    // Generate last 12 weeks of dates (84 days)
    const generateCalendarData = () => {
        const data = []
        const today = new Date()

        for (let i = 83; i >= 0; i--) {
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
        if (count === 0) return 'bg-[#1e293b]'
        if (count <= 2) return 'bg-blue-900'
        if (count <= 5) return 'bg-blue-700'
        if (count <= 10) return 'bg-blue-500'
        return 'bg-blue-400'
    }

    // Group by weeks (columns)
    const weeks = []
    for (let i = 0; i < calendarData.length; i += 7) {
        weeks.push(calendarData.slice(i, i + 7))
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex gap-[3px] min-w-fit">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                        {week.map((day) => (
                            <div
                                key={day.date}
                                className={`heatmap-cell ${getIntensity(day.count)}`}
                                title={`${day.date}: ${day.count} cards`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1 mt-3 text-[10px] text-slate-500">
                <span>Less</span>
                <div className="heatmap-cell bg-[#1e293b]" />
                <div className="heatmap-cell bg-blue-900" />
                <div className="heatmap-cell bg-blue-700" />
                <div className="heatmap-cell bg-blue-500" />
                <div className="heatmap-cell bg-blue-400" />
                <span>More</span>
            </div>
        </div>
    )
}

export default StudyHeatmap
