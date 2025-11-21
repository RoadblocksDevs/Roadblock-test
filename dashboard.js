document.addEventListener("DOMContentLoaded", () => {

  const supabaseUrl = 'https://fjgpxuwgouzqccghscjo.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqZ3B4dXdnb3V6cWNjZ2hzY2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MzE0MDUsImV4cCI6MjA3OTIwNzQwNX0.rZil28ozKRRmp3SEOTa2vHNKUH4AhPqEOr9lVrg7avo'; // replace with your anon key
  const { createClient } = supabase;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // ------------------- CHECK LOGGED IN USER -------------------
  async function checkUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) { alert(error.message); return; }

    const user = data.user;
    if (!user) { window.location.href = "login.html"; return; }

    loadProfile(user.id);
  }

  // ------------------- LOAD PROFILE -------------------
  async function loadProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) { alert(error.message); return; }

    document.getElementById('username').textContent = data.username;
    document.getElementById('role').textContent = data.role;
    document.getElementById('roadbux').textContent = data.roadbux;
  }

  // ------------------- LOGOUT -------------------
  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) { alert(error.message); return; }
    window.location.href = "login.html";
  }

  window.logout = logout;

  // ------------------- INIT -------------------
  checkUser();

});
