'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRefrigerioRequest(formData: FormData) {
  const supabase = await createClient();

  const data = {
    nombre_solicitante: formData.get("nombre") as string,
    cargo: formData.get("cargo") as string,
    area: formData.get("area") as string,
    jefe: formData.get("jefe") as string,
    fecha: formData.get("fecha") as string,
    motivo: formData.get("motivo") as string,
    lugar: formData.get("lugar") as string,
    hora: formData.get("hora") as string,
    tiempo_reunion: formData.get("tiempo_reunion") as string,
    cantidad_personas: parseInt(formData.get("cantidad_personas") as string || "0"),
    aprobador: formData.get("aprobador") as string,
    centro_costos: formData.get("centro_costos") as string,
    observaciones: formData.get("observaciones") as string,
  };

  const { error } = await supabase
    .from('refrigerios')
    .insert([data]);

  if (error) {
    console.error("Error inserting refrigerio request:", error);
    return { error: error.message };
  }

  revalidatePath("/refrigerios");
  redirect("/refrigerios");
}

export async function updateRefrigerioStatus(id: string, status: 'Aprobado' | 'Rechazado') {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('refrigerios')
    .update({ estado: status })
    .eq('id', id);

  if (error) {
    console.error("Error updating status:", error);
    return { error: error.message };
  }

  revalidatePath("/refrigerios");
  return { success: true };
}
