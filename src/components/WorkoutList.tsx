import React from "react";
import { Exercise } from "../App";
import { Trash2, Edit2, GripVertical } from "lucide-react";

interface WorkoutListProps {
  exercises: Exercise[];
  onRemoveExercise: (id: string) => void;
  onEditExercise: (exercise: Exercise) => void;
  onReorderExercises: (startIndex: number, endIndex: number) => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({
  exercises,
  onRemoveExercise,
  onEditExercise,
  onReorderExercises,
}) => {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

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
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      {exercises.length === 0 ? (
        <p className="text-gray-400">
          No exercises added yet. Start building your workout!
        </p>
      ) : (
        <ul className="space-y-4">
          {exercises.map((exercise, index) => (
            <li
              key={exercise.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className="flex items-center bg-gray-700 p-4 rounded-md cursor-move"
            >
              <div className="mr-4 flex-shrink-0 text-gray-400">
                <GripVertical size={18} />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-100">{exercise.name}</h3>
                <p className="text-sm text-gray-400">
                  {exercise.sets} sets x {exercise.reps} reps
                  {exercise.duration && ` (${exercise.duration} seconds)`}
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <button
                  onClick={() => onEditExercise(exercise)}
                  className="text-blue-400 hover:text-blue-300 focus:outline-none mr-4"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onRemoveExercise(exercise.id)}
                  className="text-red-400 hover:text-red-300 focus:outline-none"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;
