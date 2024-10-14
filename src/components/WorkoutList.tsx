import React, { useState } from 'react';
import { Exercise } from '../App';
import { Trash2, Edit2, GripVertical } from 'lucide-react';

interface WorkoutListProps {
  exercises: Exercise[];
  onRemoveExercise: (id: string) => void;
  onUpdateExercise: (exercise: Exercise) => void;
  onReorderExercises: (startIndex: number, endIndex: number) => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ 
  exercises, 
  onRemoveExercise, 
  onUpdateExercise,
  onReorderExercises
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleEdit = (exercise: Exercise) => {
    setEditingId(exercise.id);
  };

  const handleSave = (exercise: Exercise) => {
    onUpdateExercise(exercise);
    setEditingId(null);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (draggedIndex !== index) {
      onReorderExercises(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Workout Plan</h2>
      {exercises.length === 0 ? (
        <p className="text-gray-500">No exercises added yet. Start building your workout!</p>
      ) : (
        <ul className="space-y-4">
          {exercises.map((exercise, index) => (
            <li
              key={exercise.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-md cursor-move"
            >
              <div className="mr-2">
                <GripVertical size={18} />
              </div>
              {editingId === exercise.id ? (
                <EditExerciseForm 
                  exercise={exercise} 
                  onSave={handleSave} 
                  onCancel={() => setEditingId(null)} 
                />
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold">{exercise.name}</h3>
                    <p className="text-sm text-gray-600">
                      {exercise.sets} sets x {exercise.reps} reps
                      {exercise.duration && ` (${exercise.duration} seconds)`}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEdit(exercise)}
                      className="text-blue-600 hover:text-blue-800 focus:outline-none mr-2"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onRemoveExercise(exercise.id)}
                      className="text-red-600 hover:text-red-800 focus:outline-none"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface EditExerciseFormProps {
  exercise: Exercise;
  onSave: (exercise: Exercise) => void;
  onCancel: () => void;
}

const EditExerciseForm: React.FC<EditExerciseFormProps> = ({ exercise, onSave, onCancel }) => {
  const [name, setName] = useState(exercise.name);
  const [sets, setSets] = useState(exercise.sets.toString());
  const [reps, setReps] = useState(exercise.reps.toString());
  const [duration, setDuration] = useState(exercise.duration?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...exercise,
      name,
      sets: parseInt(sets),
      reps: parseInt(reps),
      duration: duration ? parseInt(duration) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-wrap items-center space-x-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-2"
          required
        />
        <input
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className="w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-2"
          required
          min="1"
        />
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-2"
          required
          min="1"
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (s)"
          className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-2"
          min="1"
        />
        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 mb-2">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400 mb-2">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WorkoutList;