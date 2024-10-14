import React, { useState, useEffect } from "react";
import { Exercise } from "../App";
import { Plus, Save } from "lucide-react";

interface WorkoutFormProps {
  onAddExercise: (exercise: Exercise) => void;
  onUpdateExercise: (exercise: Exercise) => void;
  editingExercise: Exercise | null;
  setEditingExercise: React.Dispatch<React.SetStateAction<Exercise | null>>;
}

const WorkoutForm: React.FC<WorkoutFormProps> = ({
  onAddExercise,
  onUpdateExercise,
  editingExercise,
  setEditingExercise,
}) => {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingExercise) {
      setName(editingExercise.name);
      setSets(editingExercise.sets.toString());
      setReps(editingExercise.reps.toString());
      setDuration(editingExercise.duration?.toString() || "");
      setIsEditing(true);
    } else {
      resetForm();
    }
  }, [editingExercise]);

  const resetForm = () => {
    setName("");
    setSets("");
    setReps("");
    setDuration("");
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && sets && reps) {
      const exercise: Exercise = {
        id: isEditing ? editingExercise!.id : Date.now().toString(),
        name,
        sets: parseInt(sets),
        reps: parseInt(reps),
        duration: duration ? parseInt(duration) : undefined,
      };

      if (isEditing) {
        onUpdateExercise(exercise);
      } else {
        onAddExercise(exercise);
      }

      resetForm();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Exercise Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="sets"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Sets
            </label>
            <input
              type="number"
              id="sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              className="input"
              required
              min="1"
            />
          </div>
          <div>
            <label
              htmlFor="reps"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Reps
            </label>
            <input
              type="number"
              id="reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="input"
              required
              min="1"
            />
          </div>
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Duration (seconds)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="input"
              min="1"
            />
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center"
          >
            {isEditing ? (
              <>
                <Save className="mr-2" size={18} />
                Save Exercise
              </>
            ) : (
              <>
                <Plus className="mr-2" size={18} />
                Add Exercise
              </>
            )}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                resetForm();
                setEditingExercise(null);
              }}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
