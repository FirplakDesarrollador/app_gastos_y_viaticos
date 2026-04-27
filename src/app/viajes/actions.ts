'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTravelRequest(formData: FormData) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const data: any = {
    nombre_solicitante: formData.get("nombre") as string,
    cargo: formData.get("cargo") as string,
    area: formData.get("area") as string,
    jefe: formData.get("jefe") as string,
    tipo_viaje: formData.get("tipo_viaje") as string,
    origen: formData.get("origen") as string,
    destino: formData.get("destino") as string,
    fecha_ida: formData.get("fecha_ida") as string,
    fecha_regreso: formData.get("fecha_regreso") as string,
    necesita_tiquete: formData.get("necesita_tiquete") === "Si",
    necesita_hospedaje: formData.get("necesita_hospedaje") === "Si",
    solicito_anticipo: formData.get("solicito_anticipo") === "Si",
    monto_anticipo: parseFloat(formData.get("monto_anticipo") as string || "0"),
    aprobador: formData.get("aprobador") as string,
    centro_costos: formData.get("centro_costos") as string,
    observaciones: formData.get("observaciones") as string,
  };

  // Only attach user_id if the user is logged in
  if (session?.user?.id) {
    data.user_id = session.user.id;
  }

  const { error } = await supabase
    .from('solicitudes_viaje')
    .insert([data]);

  if (error) {
    console.error("Error inserting travel request:", error);
    return { error: error.message };
  }

  revalidatePath("/viajes");
  redirect("/viajes");
}

export async function updateRequestStatus(id: string, status: string) {
  const supabase = await createClient();
  
  console.log(`Updating request ${id} to status: ${status}`);

  const { data, error } = await supabase
    .from('solicitudes_viaje')
    .update({ estado: status })
    .eq('id', id)
    .select();

  if (error) {
    console.error("Error updating status:", error);
    return { error: error.message };
  }

  console.log("Update successful:", data);

  revalidatePath("/viajes");
  return { success: true };
}
