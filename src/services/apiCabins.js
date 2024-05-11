import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export const getCabines = async () => {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("Cabins could not be loaded");
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
};

export const deleteCabines = async (id) => {
  const { data: cabins, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);
  if (error) {
    console.log("Cabins could not be deleted");
    throw new Error("Cabins could not be deleted");
  }
  return cabins;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(newCabin, id);
  console.log(hasImagePath);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imageUrl = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //Create & Edit Cabin
  let query = await supabase.from("cabins");

  //CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imageUrl }]);

  //EDIT
  if (id) query = query.update({ ...newCabin, image: imageUrl }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    if (id) throw new Error("Cabins could not be updated");
    else throw new Error("Cabins could not be added");
  }
  console.log(newCabin);

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (hasImagePath) return data;

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
};
