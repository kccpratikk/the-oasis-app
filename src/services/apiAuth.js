import supabase, { supabaseUrl } from "./supabase";

export async function signup({ email, password, fullName }) {
  console.log(email, password, fullName);
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ password, fullName, avatar }) {
  let dataToUpdate;

  if (password) dataToUpdate = { password };
  if (fullName) dataToUpdate = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(dataToUpdate);

  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;

  const imageName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, avatar);

  console.log(imageName);
  if (storageError) throw new Error(storageError.message);

  const { error: error1 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`,
    },
  });

  if (error1) throw new Error(error1.message);

  return updateUser;
}
