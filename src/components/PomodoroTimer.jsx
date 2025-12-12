import React, { useEffect, useRef } from 'react'
import useStore from '../store'
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react'

function PomodoroTimer() {
    const {
        timerMode,
        timerSeconds,
        isTimerRunning,
        pomodoroCount,
        startTimer,
        pauseTimer,
        resetTimer,
        tickTimer,
        setTimerMode
    } = useStore()

    const intervalRef = useRef(null)

    useEffect(() => {
        if (isTimerRunning) {
            intervalRef.current = setInterval(() => {
                tickTimer()
            }, 1000)
        } else {
            clearInterval(intervalRef.current)
        }
        return () => clearInterval(intervalRef.current)
    }, [isTimerRunning, tickTimer])

    const minutes = Math.floor(timerSeconds / 60)
    const seconds = timerSeconds % 60

    const totalSeconds = timerMode === 'work' ? 25 * 60 : 5 * 60
    const progress = ((totalSeconds - timerSeconds) / totalSeconds) * 100
    const circumference = 2 * Math.PI * 90

    return (
        <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Focus Timer</h1>
                <p className="text-sm text-slate-500 mt-1">Stay focused with the Pomodoro technique</p>
            </div>

            {/* Mode Toggle */}
            <div className="card p-1 flex gap-1">
                <button
                    onClick={() => setTimerMode('work')}
                    className={`flex-1 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all ${timerMode === 'work' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                >
                    <Brain className="w-4 h-4" />
                    Focus
                </button>
                <button
                    onClick={() => setTimerMode('break')}
                    className={`flex-1 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all ${timerMode === 'break' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                >
                    <Coffee className="w-4 h-4" />
                    Break
                </button>
            </div>

            {/* Timer Circle */}
            <div className="card p-8">
                <div className="relative w-48 h-48 mx-auto">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#334155" strokeWidth="6" />
                        <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke={timerMode === 'work' ? '#3b82f6' : '#8b5cf6'}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference - (progress / 100) * circumference}
                            className="transition-all duration-1000"
                        />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-white tabular-nums">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                            {timerMode === 'work' ? 'Focus' : 'Break'}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3 mt-6">
                    <button
                        onClick={resetTimer}
                        className="w-10 h-10 rounded-full bg-[#0f172a] hover:bg-slate-800 flex items-center justify-center transition-colors"
                    >
                        <RotateCcw className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                        onClick={isTimerRunning ? pauseTimer : startTimer}
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${timerMode === 'work' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'
                            }`}
                    >
                        {isTimerRunning ? (
                            <Pause className="w-5 h-5 text-white" />
                        ) : (
                            <Play className="w-5 h-5 text-white ml-0.5" />
                        )}
                    </button>

                    <div className="w-10 h-10" />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
                <div className="stat-card text-center">
                    <p className="text-2xl font-bold text-white">{pomodoroCount}</p>
                    <p className="text-xs text-slate-500">Sessions</p>
                </div>
                <div className="stat-card text-center">
                    <p className="text-2xl font-bold text-white">{pomodoroCount * 25}</p>
                    <p className="text-xs text-slate-500">Minutes</p>
                </div>
            </div>
        </div>
    )
}

export default PomodoroTimer
