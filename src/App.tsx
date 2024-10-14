import React, { useState, useEffect } from 'react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutList from './components/WorkoutList';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: number;
}

function App() {
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    const savedExercises = localStorage.getItem('workoutExercises');
    return savedExercises ? JSON.parse(savedExercises) : [];
  });
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

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
    setEditingExercise(null);
  };

  const reorderExercises = (startIndex: number, endIndex: number) => {
    const result = Array.from(exercises);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setExercises(result);
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl w-full">
        <div className="grid grid-cols-1 gap-8">
          <WorkoutForm 
            onAddExercise={addExercise} 
            onUpdateExercise={updateExercise}
            editingExercise={editingExercise}
            setEditingExercise={setEditingExercise}
          />
          <WorkoutList 
            exercises={exercises} 
            onRemoveExercise={removeExercise}
            onEditExercise={handleEditExercise}
            onReorderExercises={reorderExercises}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
