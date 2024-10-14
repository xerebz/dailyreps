import React, { useState, useEffect } from 'react';
import { Dumbbell } from 'lucide-react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number; // Add optional duration field
}

function App() {
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    const savedExercises = localStorage.getItem('workoutExercises');
    return savedExercises ? JSON.parse(savedExercises) : [];
  });

  useEffect(() => {
    localStorage.setItem('workoutExercises', JSON.stringify(exercises));
  }, [exercises]);

  const addExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const updateExercise = (updatedExercise: Exercise) => {
    setExercises(exercises.map(exercise => 
      exercise.id === updatedExercise.id ? updatedExercise : exercise
    ));
  };

  const reorderExercises = (startIndex: number, endIndex: number) => {
    const result = Array.from(exercises);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setExercises(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
            <Dumbbell className="mr-2" />
            Workout Maker
          </h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <WorkoutForm onAddExercise={addExercise} />
          <WorkoutList 
            exercises={exercises} 
            onRemoveExercise={removeExercise}
            onUpdateExercise={updateExercise}
            onReorderExercises={reorderExercises}
          />
        </div>
      </div>
    </div>
  );
}

export default App;