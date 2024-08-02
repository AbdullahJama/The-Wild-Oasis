import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabin can not be loaded");
  }

  return data;
}

export async function createEditCabins(newCabin, id) {
  const hasImagePath = newCabin.image.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/Cabin-Images/${imageName}`;

  //create/edit code reused
  let query = supabase.from("Cabins");

  //create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("cabin can not be created");
  }

  //upload Image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("Cabin-Images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    const { data, error } = await supabase
      .from("Cabins")
      .delete()
      .eq("id", data.id);
    throw new Error(
      "Cabin image can not be Uploaded and the cabin can not be created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabin can not be deleted");
  }
  return data;
}
