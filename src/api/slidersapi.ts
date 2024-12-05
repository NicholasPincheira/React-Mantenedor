import axios from "axios";

export interface Slider {
  _id: string;
  title: string;
  imageUrl: string;
  customCss?: string;
}

export const fetchSliders = async (): Promise<Slider[]> => {
  const response = await axios.get("/api/sliders");
  return response.data;
};

export const createSlider = async (slider: Omit<Slider, "_id">): Promise<Slider> => {
  const response = await axios.post("/api/sliders", slider);
  return response.data;
};

export const deleteSlider = async (id: string): Promise<void> => {
  await axios.delete(`/api/sliders/${id}`);
};

export const updateSlider = async (
  id: string,
  updatedData: Partial<{ title: string; imageUrl: string; customCss: string }>
): Promise<void> => {
  await axios.put(`/api/sliders/${id}`, updatedData);
};