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
    const circumference = 2 * Math.PI * 140

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">Pomodoro Timer</h1>
                <p className="text-slate-400">Stay focused and productive with timed work sessions</p>
            </div>

            {/* Mode Toggle */}
            <div className="glass-card p-2 flex gap-2 max-w-sm mx-auto">
                <button
                    onClick={() => setTimerMode('work')}
                    className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${timerMode === 'work'
                            ? 'bg-gradient-to-r from-primary-500 to-cyan-500 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                >
                    <Brain className="w-5 h-5" />
                    Focus
                </button>
                <button
                    onClick={() => setTimerMode('break')}
                    className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${timerMode === 'break'
                            ? 'bg-gradient-to-r from-accent-500 to-pink-500 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                >
                    <Coffee className="w-5 h-5" />
                    Break
                </button>
            </div>

            {/* Timer Circle */}
            <div className="glass-card p-8 lg:p-12">
                <div className="relative w-72 h-72 mx-auto">
                    {/* Background circle */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 300 300">
                        <circle
                            cx="150"
                            cy="150"
                            r="140"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="8"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="150"
                            cy="150"
                            r="140"
                            fill="none"
                            stroke={timerMode === 'work' ? '#0ea5e9' : '#d946ef'}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference - (progress / 100) * circumference}
                            className="transition-all duration-1000"
                            style={{
                                filter: `drop-shadow(0 0 10px ${timerMode === 'work' ? '#0ea5e9' : '#d946ef'})`
                            }}
                        />
                    </svg>

                    {/* Timer display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl lg:text-7xl font-bold tabular-nums">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </span>
                        <span className="text-slate-400 mt-2 uppercase tracking-wider text-sm">
                            {timerMode === 'work' ? 'Focus Time' : 'Break Time'}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={resetTimer}
                        className="w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                    >
                        <RotateCcw className="w-6 h-6 text-slate-400" />
                    </button>

                    <button
                        onClick={isTimerRunning ? pauseTimer : startTimer}
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-105 ${timerMode === 'work'
                                ? 'bg-gradient-to-br from-primary-500 to-cyan-500 glow-primary'
                                : 'bg-gradient-to-br from-accent-500 to-pink-500 glow-accent'
                            }`}
                    >
                        {isTimerRunning ? (
                            <Pause className="w-8 h-8 text-white" />
                        ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                        )}
                    </button>

                    <div className="w-14 h-14" /> {/* Spacer for symmetry */}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 text-center">
                    <p className="text-4xl font-bold text-primary-400">{pomodoroCount}</p>
                    <p className="text-slate-400 text-sm mt-1">Sessions Completed</p>
                </div>
                <div className="glass-card p-6 text-center">
                    <p className="text-4xl font-bold text-accent-400">{pomodoroCount * 25}</p>
                    <p className="text-slate-400 text-sm mt-1">Minutes Focused</p>
                </div>
            </div>

            {/* Tips */}
            <div className="glass-card p-6">
                <h3 className="font-semibold mb-3">💡 Pomodoro Technique</h3>
                <ul className="text-slate-400 text-sm space-y-2">
                    <li>• Work for 25 minutes with full focus</li>
                    <li>• Take a 5-minute break between sessions</li>
                    <li>• After 4 sessions, take a longer 15-30 minute break</li>
                    <li>• Stay hydrated and stretch during breaks!</li>
                </ul>
            </div>
        </div>
    )
}

export default PomodoroTimer
