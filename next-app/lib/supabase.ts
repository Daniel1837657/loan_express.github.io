import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabase(): SupabaseClient {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_ANON_KEY;
	if (!url || !key) {
		throw new Error("supabaseUrl is required.");
	}
	return createClient(url, key);
}

export default getSupabase;
