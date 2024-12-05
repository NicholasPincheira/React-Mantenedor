import { useEffect, useState } from "react";
import { fetchSliders, createSlider, deleteSlider, updateSlider, Slider } from "../../api/slidersapi";
import axios from "axios";

const Sliders = () => {
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [editingSlider, setEditingSlider] = useState<Slider | null>(null);

    // Fetch sliders on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSliders();
                setSliders(data);
            } catch (error) {
                console.error("Error fetching sliders:", error);
            }
        };

        fetchData();
    }, []);

    // Handle slider creation
    const handleCreate = async () => {
        try {
            const newSlider = await createSlider({ title, imageUrl });
            setSliders([...sliders, newSlider]);
            setTitle("");
            setImageUrl("");
        } catch (error) {
            console.error("Error creating slider:", error);
        }
    };

    // Handle slider deletion
    const handleDelete = async (id: string) => {
        try {
            await deleteSlider(id);
            setSliders(sliders.filter((slider) => slider._id !== id));
        } catch (error) {
            console.error("Error deleting slider:", error);
        }
    };

    // Handle slider update
    const handleUpdate = async () => {
        if (editingSlider) {
            try {
                await updateSlider(editingSlider._id, {
                    title: editingSlider.title,
                    imageUrl: editingSlider.imageUrl,
                });
                setSliders(sliders.map((slider) =>
                    slider._id === editingSlider._id ? editingSlider : slider
                ));
                setEditingSlider(null);
            } catch (error) {
                console.error("Error updating slider:", error);
            }
        }
    };

    const handleSetFeatured = async (id: string) => {
        try {
            await axios.put(`/api/sliders/${id}`, { isFeatured: true });
            setSliders(sliders.map((slider) =>
                ({ ...slider, isFeatured: slider._id === id })
            ));
        } catch (error) {
            console.error("Error setting featured slider:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Sliders</h1>

            {editingSlider ? (
                // Edit Form
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Edit Slider</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={editingSlider.title}
                        onChange={(e) =>
                            setEditingSlider({ ...editingSlider, title: e.target.value })
                        }
                        className="border rounded p-2 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={editingSlider.imageUrl}
                        onChange={(e) =>
                            setEditingSlider({ ...editingSlider, imageUrl: e.target.value })
                        }
                        className="border rounded p-2 mr-2"
                    />
                    <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setEditingSlider(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                // Add Form
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Add New Slider</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded p-2 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="border rounded p-2 mr-2"
                    />
                    <button
                        onClick={handleCreate}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Slider
                    </button>
                </div>
            )}

            <ul>
                {sliders.map((slider) => (
                    <li key={slider._id} className="mb-2 flex justify-between items-center">
                        <div>
                            <p className="font-bold">{slider.title}</p>
                            <img
                                src={slider.imageUrl}
                                alt={slider.title}
                                className="h-20 w-auto"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setEditingSlider(slider)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(slider._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                            <button onClick={() => handleSetFeatured(slider._id)}>Set as Featured</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sliders;
